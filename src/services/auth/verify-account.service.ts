import { RESEND_COOLDOWN_SECONDS } from ".";
import {
	ResendOtpRequest,
	ResendOtpResponse,
	ResendVerifyAccountTokenRequest,
	ResendVerifyAccountTokenResponse,
	VerifyAccountRequest,
} from "../../models/auth.model";
import { UserResponse } from "../../models/user.model";
import { UserRepository } from "../../repositories";
import { TokenVerifyAccount } from "../../types/token.type";
import { BadrequestError, ForbiddenError, InternalServerError, NotfoundError } from "../../utils/errors";
import { ManyRequestError } from "../../utils/errors/many-request";
import { UnauthenticatedError } from "../../utils/errors/unauthenticated";
import { generateOtp } from "../../utils/helpers/generate-otp";
import { generateUUID } from "../../utils/helpers/generate-uuid";
import { isTokenValid } from "../../utils/helpers/jwt/create-jwt";
import { createTokenVerifyAccount } from "../../utils/helpers/jwt/create-token-verify-account";
import userResponse from "../../utils/responses/user.,response";
import { AuthValidation } from "../../utils/validations/auth.validation";
import { validation } from "../../utils/validations/validation";
import { EmailService } from "../utilities/email.service";

export const VerifyAccountAuthService = {
	verifyAccount: async (req: VerifyAccountRequest): Promise<UserResponse> => {
		const validateFields = validation.validate(AuthValidation.VERIFYACCOUNT, req);

		const payload = isTokenValid({ token: validateFields.token }) as TokenVerifyAccount;
		if (payload.type !== "VERIFY_ACCOUNT") throw new ForbiddenError("Token is valid but not authorized for verify account");

		const checkUser = await UserRepository.findByEmail(payload.email);
		if (!checkUser) throw new UnauthenticatedError("Email tidak valid atau pengguna telah terhapus");
		if (checkUser.is_active) throw new BadrequestError("Akun anda sudah aktif");
		if (payload.jti !== checkUser.verify_token) throw new BadrequestError("Token tidak valid");
		if (checkUser.otp !== validateFields.otp_code) throw new BadrequestError("Kode OTP yang Anda masukan salah");

		const result = await UserRepository.updateIsActive(checkUser.id);
		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return userResponse.toUserResponse(result);
	},

	resendOtpVerifyAccount: async (req: ResendOtpRequest): Promise<ResendOtpResponse> => {
		const validateFields = validation.validate(AuthValidation.RESENDOTP, req);
		const payloadToken = isTokenValid({ token: validateFields.token }) as TokenVerifyAccount;

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
			otp: newOtp,
		};

		const result = await UserRepository.updateOtp(checkUser.id, newOtp, "ACTIVATION");
		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		await EmailService.ResendOtpVerifyAccountMail(checkUser.email, valueOTP);

		return {
			email: result.email,
			otp_last_sent_at: new Date(),
			otp_expiry_seconds: RESEND_COOLDOWN_SECONDS,
		};
	},

	resendTokenVerifyAccount: async (req: ResendVerifyAccountTokenRequest): Promise<ResendVerifyAccountTokenResponse> => {
		const validateFields = validation.validate(AuthValidation.RESENDVERIFYACCOUNTTOKEN, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);
		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");
		if (checkUser.is_active) throw new BadrequestError("Akun anda sudah aktif");
		if (checkUser.verify_token_last_sen_at) {
			const lastSentTime = checkUser.verify_token_last_sen_at.getTime();
			const currentTime = new Date().getTime();
			const timeElapsed = (currentTime - lastSentTime) / 1000;

			if (timeElapsed < RESEND_COOLDOWN_SECONDS) {
				const remainingTime = Math.ceil(RESEND_COOLDOWN_SECONDS - timeElapsed);

				throw new ManyRequestError(`Mohon tunggu ${remainingTime} detik sebelum meminta link verifikasi baru`);
			}
		}

		const jti = generateUUID();
		const verify_token = createTokenVerifyAccount({
			user_id: checkUser.id,
			jti,
			email: checkUser.email,
			role: checkUser.role,
			type: "VERIFY_ACCOUNT",
		});

		const result = await UserRepository.updateVerifyToken(checkUser.id, jti);
		if (!result) throw new InternalServerError("Gagal memperbarui token verifikasi, pleaset try again later");

		await EmailService.ResendTokenVerifyAccountMail(result.email, verify_token, result);

		return {
			verify_token_last_sen_at: result.verify_token_last_sen_at,
		};
	},
};
