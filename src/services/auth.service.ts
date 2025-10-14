import services from ".";
import {
	ActivationRequest,
	ForgotPasswordRequest,
	MatchOtpRequest,
	MathOtpResponse,
	ResendOtpRequest,
	ResetPasswordRequest,
	SigninRequest,
	SigninResponse,
	SignupRequest,
} from "../models/auth.model";
import { UserResponse } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { TokenVerification } from "../types/token.type";
import { BadrequestError, InternalServerError, NeedActivation, NotfoundError } from "../utils/errors";
import { ManyRequestError } from "../utils/errors/many-request";
import { UnauthenticatedError } from "../utils/errors/unauthenticated";
import { UnauthorizedError } from "../utils/errors/unauthorized";
import helpers from "../utils/helpers";
import { createToken } from "../utils/helpers/create-token";
import { createTokenVerification } from "../utils/helpers/create-token-verification";
import { generateOtp } from "../utils/helpers/generate-otp";
import responses from "../utils/responses";
import { AuthValidation } from "../utils/validations/auth.validation";
import { validation } from "../utils/validations/validation";

const RESEND_COOLDOWN_SECONDS = 60;

export class AuthService {
	static async signup(req: SignupRequest): Promise<UserResponse> {
		const validateFields = validation.validate(AuthValidation.SIGNUP, req);

		const checkEmailUser = await UserRepository.isEmailTaken(validateFields.email);

		if (checkEmailUser) throw new BadrequestError("Email telah di gunakan");

		const hashPassword = await helpers.hashPassword(validateFields.password);
		const otp = helpers.generateOtp();

		const result = await UserRepository.create({
			data: {
				...validateFields,
				password: hashPassword,
				otp_code: otp,
				otp_last_sen_at: new Date(),
			},
		});

		if (!result) throw new InternalServerError("Pendaftaran gagal, please try again later!");

		await services.EmailService.SendOtpMail(result.email, result);

		return responses.userResponse.toUserResponse(result);
	}

	static async signin(req: SigninRequest): Promise<SigninResponse> {
		const validateFields = validation.validate(AuthValidation.SIGNIN, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);

		if (!checkUser) throw new UnauthorizedError("Invalid credentialssssss");

		if (!checkUser.is_active)
			throw new NeedActivation("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun", checkUser.email);

		const isPasswordValid = await helpers.comparePassword(validateFields.password, checkUser.password);

		if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");

		const token = createToken(checkUser);

		return {
			...responses.userResponse.toUserResponse(checkUser),
			token,
		};
	}

	static async activation(req: ActivationRequest): Promise<UserResponse> {
		const validateFields = validation.validate(AuthValidation.ACTIVATION, req);

		const checkUser = await UserRepository.findByEmail(req.email);

		if (!checkUser) throw new UnauthenticatedError("Email tidak valid atau pengguna telah terhapus");

		const checkUserActivation = await UserRepository.findUserForActivation(checkUser.id);

		if (!checkUserActivation) throw new UnauthenticatedError("Pengguna tidak di temukan");

		if (checkUserActivation.is_active) throw new BadrequestError("Akun anda sudah aktif");

		if (checkUserActivation.otp_code !== validateFields.otp_code) throw new BadrequestError("Kode OTP yang Anda masukan salah");

		const result = await UserRepository.updateIsActive(checkUserActivation.id);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return responses.userResponse.toUserResponse(result);
	}

	static async resendOtp(req: ResendOtpRequest): Promise<UserResponse> {
		const validateFields = validation.validate(AuthValidation.RESENDOTP, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

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

		await services.EmailService.SendOtpMail(validateFields.email, valueOTP);

		return responses.userResponse.toUserResponse(result);
	}

	static async forgotPassword(req: ForgotPasswordRequest): Promise<UserResponse> {
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

		return responses.userResponse.toUserResponse(result);
	}

	static async matchOtp(req: MatchOtpRequest): Promise<MathOtpResponse> {
		const validateFields = validation.validate(AuthValidation.MATCHOTP, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		if (validateFields.otp_code !== checkUser.otp_code) throw new BadrequestError("Kode OTP yang anda masukan salah");

		const token = createTokenVerification({ id: checkUser.id, email: checkUser.email, role: checkUser.role });

		await UserRepository.deleteOtp(checkUser.id, checkUser.is_active);

		return {
			verify_token: token,
		};
	}

	static async resetPassword(req: ResetPasswordRequest, user: TokenVerification): Promise<UserResponse> {
		const validateFields = validation.validate(AuthValidation.RESETPASSWORD, req);

		if (validateFields.password !== validateFields.confirm_password) throw new BadrequestError("Password dan Konfirm Password tidak sama");

		const checkUser = await UserRepository.findByEmail(user.email);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		const result = await UserRepository.updatePassword(checkUser.id, validateFields.password);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return responses.userResponse.toUserResponse(result);
	}
}
