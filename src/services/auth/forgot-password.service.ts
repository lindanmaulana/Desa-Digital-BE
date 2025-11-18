import { RESEND_COOLDOWN_SECONDS } from ".";
import { logger } from "../../logging";
import {
	ForgotPasswordRequest,
	ForgotPasswordResponse,
	ResetPasswordRequest,
	VerifyOtpForgotPasswordRequest,
	verifyOtpForgotPasswordResponse,
} from "../../models/auth.model";
import { UserResponse } from "../../models/user.model";
import { UserRepository } from "../../repositories";
import { BadrequestError, InternalServerError, NotfoundError } from "../../utils/errors";
import { ManyRequestError } from "../../utils/errors/many-request";
import { generateOtp } from "../../utils/helpers/generate-otp";
import { generateUUID } from "../../utils/helpers/generate-uuid";
import { isTokenValid } from "../../utils/helpers/jwt/create-jwt";
import { createTokenResetPassword } from "../../utils/helpers/jwt/create-token-reset-password";
import { toUserResponse } from "../../utils/responses";
import { AuthValidation } from "../../utils/validations/auth.validation";
import { validation } from "../../utils/validations/validation";
import { EmailService } from "../utilities/email.service";

export const ForgotPasswordAuthService = {
	forgotPassword: async (req: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
		const validateFields = validation.validate(AuthValidation.FORGOTPASSWORD, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);
		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");
		if (!checkUser.is_active) throw new BadrequestError("Akun anda belum aktif haraf aktivasi terlebih dahulu");

		const otp = generateOtp();
		const valueOTP = { ...checkUser, otp: otp };

		const result = await UserRepository.updateOtp(checkUser.id, otp, "RESET_PASSWORD");
		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		await EmailService.SendOtpForgotPasswordMail(validateFields.email, valueOTP);

		return {
			email: result.email,
			otp_last_sent_at: new Date(),
		};
	},

	resendOtpForgotPassword: async (req: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
		const validateFields = validation.validate(AuthValidation.FORGOTPASSWORD, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);
		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		if (checkUser.otp_purpose === "RESET_PASSWORD" && checkUser.otp_last_sen_at) {
			const lastSentTime = checkUser.otp_last_sen_at.getTime();
			const currentTime = new Date().getTime();
			const timeElapsed = (currentTime - lastSentTime) / 1000;

			if (timeElapsed < RESEND_COOLDOWN_SECONDS) {
				const remainingTime = Math.ceil(RESEND_COOLDOWN_SECONDS - timeElapsed);

				throw new ManyRequestError(`Mohon tunggu ${remainingTime} detik sebelum meminta link verifikasi baru`);
			}
		}

		const otp = generateOtp();
		const valueOTP = { ...checkUser, otp: otp };

		const result = await UserRepository.updateOtp(checkUser.id, otp, "RESET_PASSWORD");
		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		await EmailService.ReSendOtpForgotPasswordMail(validateFields.email, valueOTP);

		return {
			email: result.email,
			otp_last_sent_at: new Date(),
			otp_expiry_seconds: RESEND_COOLDOWN_SECONDS,
		};
	},

	verifyOtpForgotPassword: async (req: VerifyOtpForgotPasswordRequest): Promise<verifyOtpForgotPasswordResponse> => {
		const validateFields = validation.validate(AuthValidation.MATCHOTP, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);
		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");
		if (validateFields.otp_code !== checkUser.otp) throw new BadrequestError("Kode OTP yang anda masukan salah");

		const jti = generateUUID();
		const result = await UserRepository.updateResetToken(checkUser.id, jti);
		if (!result) throw new InternalServerError("Terjadi kesalahan saat verifikasi otp anda, please try again later");

		const token = createTokenResetPassword({
			user_id: checkUser.id,
			type: "RESET_PASSWORD",
			jti,
			email: checkUser.email,
			role: checkUser.role,
		});
		await UserRepository.deleteOtp(checkUser.id);
		await EmailService.SendTokenForgotPasswordMail(result.email, token, result);

		return {
			verify_token_last_sen_at: new Date(),
		};
	},

	resetPassword: async (req: ResetPasswordRequest): Promise<UserResponse> => {
		const validateFields = validation.validate(AuthValidation.RESETPASSWORD, req);

		if (validateFields.password !== validateFields.confirm_password) throw new BadrequestError("Password dan Konfirm Password tidak sama");
		const token = isTokenValid({ token: validateFields.token });

		const checkUser = await UserRepository.findByEmail(token.email);
		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		const result = await UserRepository.updatePassword(checkUser.id, validateFields.password);
		if (!result) throw new InternalServerError("Terjadi kesalahan saat mengubah password anda, please try again later");

		const resultDeleteToken = await UserRepository.deleteResetToken(result.id);
		if (!resultDeleteToken) {
			logger.error("Gagal menghapus reset_token, dan reset_token_last_sen_at");
			throw new InternalServerError("Terjadi kesalahan system, please try again later");
		}

		return toUserResponse.response(result);
	},
};
