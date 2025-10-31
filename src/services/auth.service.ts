import services from ".";
import {
	ForgotPasswordRequest,
	ForgotPasswordResponse,
	MatchOtpRequest,
	MathOtpResponse,
	ResendOtpRequest,
	ResendOtpResponse,
	ResendVerifyAccountTokenRequest,
	ResendVerifyAccountTokenResponse,
	ResetPasswordRequest,
	SigninRequest,
	SigninResponse,
	SignupRequest,
	VerifyAccountRequest,
} from "../models/auth.model";
import { UserResponse } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { TokenResetPassword, TokenVerifyAccount } from "../types/token.type";
import { BadrequestError, ForbiddenError, InternalServerError, NeedActivation, NotfoundError } from "../utils/errors";
import { ManyRequestError } from "../utils/errors/many-request";
import { UnauthenticatedError } from "../utils/errors/unauthenticated";
import { UnauthorizedError } from "../utils/errors/unauthorized";
import helpers from "../utils/helpers";
import { generateOtp } from "../utils/helpers/generate-otp";
import { generateUUID } from "../utils/helpers/generate-uuid";
import { createTokenResetPassword } from "../utils/helpers/jwt/create-token-reset-password";
import { createTokenUser } from "../utils/helpers/jwt/create-token-user";
import { createTokenVerifyAccount } from "../utils/helpers/jwt/create-token-verify-account";
import responses from "../utils/responses";
import { AuthValidation } from "../utils/validations/auth.validation";
import { validation } from "../utils/validations/validation";
import { EmailService } from "./email.service";

const RESEND_COOLDOWN_SECONDS = 60;

export class AuthService {
	static async signup(req: SignupRequest): Promise<UserResponse> {
		const validateFields = validation.validate(AuthValidation.SIGNUP, req);

		const checkEmailUser = await UserRepository.isEmailTaken(validateFields.email);

		if (checkEmailUser) throw new BadrequestError("Email telah di gunakan");

		const hashPassword = await helpers.hashPassword(validateFields.password);
		const otp = helpers.generateOtp();
		const jti = generateUUID()

		const result = await UserRepository.create({
			data: {
				...validateFields,
				password: hashPassword,
				otp_code: otp,
				otp_last_sen_at: new Date(),
				verify_token: jti
			},
		});

		if (!result) throw new InternalServerError("Pendaftaran gagal, please try again later!");

		const verify_token = createTokenVerifyAccount({user_id: result.id, jti, email: result.email, role: result.role, type: "VERIFY_ACCOUNT"})

		await services.EmailService.SendVerifyAccountMail(result.email, verify_token, result);

		return responses.userResponse.toUserResponse(result);
	}

	static async signin(req: SigninRequest): Promise<SigninResponse> {
		const validateFields = validation.validate(AuthValidation.SIGNIN, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);

		if (!checkUser) throw new UnauthorizedError("Invalid credentials");

		if (!checkUser.is_active)
			throw new NeedActivation("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun", checkUser.email);

		const isPasswordValid = await helpers.comparePassword(validateFields.password, checkUser.password);

		if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");

		const token = createTokenUser(checkUser);

		return {
			...responses.userResponse.toUserResponse(checkUser),
			token,
		};
	}

	static async verifyAccount(req: VerifyAccountRequest): Promise<UserResponse> {
		const validateFields = validation.validate(AuthValidation.VERIFYACCOUNT, req);

		const payload = helpers.isTokenValid({token: validateFields.token}) as TokenVerifyAccount
		if (payload.type !== "VERIFY_ACCOUNT") throw new ForbiddenError("Token is valid but not authorized for verify account")

		const checkUser = await UserRepository.findByEmail(payload.email);
		if (!checkUser) throw new UnauthenticatedError("Email tidak valid atau pengguna telah terhapus");

		if (checkUser.is_active) throw new BadrequestError("Akun anda sudah aktif");

		if (payload.jti !== checkUser.verify_token) throw new BadrequestError("Token tidak valid")

		if (checkUser.otp_code !== validateFields.otp_code) throw new BadrequestError("Kode OTP yang Anda masukan salah");

		const result = await UserRepository.updateIsActive(checkUser.id);
		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return responses.userResponse.toUserResponse(result);
	}

	static async resendOtp(req: ResendOtpRequest): Promise<ResendOtpResponse> {
		const validateFields = validation.validate(AuthValidation.RESENDOTP, req);

		const payloadToken = helpers.isTokenValid({token: validateFields.token}) as TokenVerifyAccount

		const checkUser = await UserRepository.findByEmail(payloadToken.email);

		if (!checkUser) throw new BadrequestError("Pengguna tidak ditemukan");

		if (checkUser.is_active) throw new BadrequestError("Akun Anda sudah aktif, Tidak dapat mengirim kode OTP");

		if (checkUser.otp_last_sen_at) {
			const lastSentTime = checkUser.otp_last_sen_at.getTime();
			const currentTime = new Date().getTime();
			const timeElapsed = (currentTime - lastSentTime) / 1000;

			if (timeElapsed < RESEND_COOLDOWN_SECONDS) {
				const remainingTime = Math.ceil(RESEND_COOLDOWN_SECONDS - timeElapsed);

				throw new ManyRequestError(`Mohon tunggu ${remainingTime} detik sebelum meminta kode baru`);
			}
		}

		const newOtp = generateOtp();

		const valueOTP = {
			...checkUser,
			otp_code: newOtp,
		};

		const result = await UserRepository.updateOtp(checkUser.id, newOtp);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		await services.EmailService.ResendOtpMail(checkUser.email, valueOTP);

		return {
			email: result.email,
			otp_last_sent_at: new Date(),
			otp_expiry_seconds: RESEND_COOLDOWN_SECONDS,
		};
	}

	static async resendVerifyAccountToken(req: ResendVerifyAccountTokenRequest): Promise<ResendVerifyAccountTokenResponse> {
		const validateFields = validation.validate(AuthValidation.RESENDVERIFYACCOUNTTOKEN, req)

		const checkUser = await UserRepository.findByEmail(validateFields.email)
		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan")

		if (checkUser.is_active) throw new BadrequestError("Akun anda sudah aktif")

		if (checkUser.verify_token_last_sen_at) {
			const lastSentTime = checkUser.verify_token_last_sen_at.getTime()
			const currentTime = new Date().getTime()
			const timeElapsed = (currentTime - lastSentTime) / 1000

			if (timeElapsed < RESEND_COOLDOWN_SECONDS) {
				const remainingTime = Math.ceil(RESEND_COOLDOWN_SECONDS - timeElapsed)

				throw new ManyRequestError(`Mohon tunggu ${remainingTime} detik sebelum meminta link verifikasi baru`)
			}
		}

		const jti = generateUUID()
		const verify_token = createTokenVerifyAccount({user_id: checkUser.id, jti, email: checkUser.email, role: checkUser.role, type: "VERIFY_ACCOUNT"})

		const result = await UserRepository.updateVerifyToken(checkUser.id, jti)

		if (!result) throw new InternalServerError("Gagal memperbarui token verifikasi, pleaset try again later")
		await EmailService.ResendVerifyAccountMail(result.email, verify_token, result)

		return {
			verify_token_last_sen_at: result.verify_token_last_sen_at
		}
	}

	static async forgotPassword(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
		const validateFields = validation.validate(AuthValidation.FORGOTPASSWORD, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		const newOtp = generateOtp();

		const valueOTP = {
			...checkUser,
			otp_code: newOtp,
		};

		const result = await UserRepository.updateOtp(checkUser.id, newOtp);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		await services.EmailService.SendOtpMail(validateFields.email, valueOTP);

		return {
			email: result.email,
			otp_last_sent_at: new Date(),
		};
	}

	static async matchOtp(req: MatchOtpRequest): Promise<MathOtpResponse> {
		const validateFields = validation.validate(AuthValidation.MATCHOTP, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		if (validateFields.otp_code !== checkUser.otp_code) throw new BadrequestError("Kode OTP yang anda masukan salah");

		const token = createTokenResetPassword({ user_id: checkUser.id, type: "RESET_PASSWORD" , email: checkUser.email, role: checkUser.role });

		await UserRepository.deleteOtp(checkUser.id, checkUser.is_active);

		return {
			verify_token: token,
		};
	}

	static async resetPassword(req: ResetPasswordRequest, user: TokenResetPassword): Promise<UserResponse> {
		const validateFields = validation.validate(AuthValidation.RESETPASSWORD, req);

		if (validateFields.password !== validateFields.confirm_password) throw new BadrequestError("Password dan Konfirm Password tidak sama");

		const checkUser = await UserRepository.findByEmail(user.email);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		const result = await UserRepository.updatePassword(checkUser.id, validateFields.password);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return responses.userResponse.toUserResponse(result);
	}
}
