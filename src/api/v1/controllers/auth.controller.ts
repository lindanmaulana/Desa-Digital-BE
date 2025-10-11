import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import services from "../../../services";
import { CustomeRequest } from "../../../types/express.type";
import { Token, TokenVerification } from "../../../types/token.type";
import {
	ActivationRequest,
	ChangePasswordRequest,
	ForgotPasswordRequest,
	MatchOtpRequest,
	ResendOtpRequest,
	ResetPasswordRequest,
} from "../../../models/user.model";
import { AuthService } from "../../../services/auth.service";

export class AuthController {
	static async signup(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const result = await services.AuthService.signup(req.body);

			res.status(StatusCodes.CREATED).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Pendaftaran berhasil",
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async signin(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const result = await services.AuthService.signin(req.body);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Login berhasil",
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async changePassword(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const token = req.user as Token;
			const reqBody = req.body as ChangePasswordRequest;

			const result = await services.AuthService.changePassword(reqBody, token!);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Kata sandi berhasil di ubah",
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async activation(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.body as ActivationRequest;

			const result = await services.AuthService.activation(reqBody);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Aktivasi akun berhasil",
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async resendOtp(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.body as ResendOtpRequest;

			const result = await AuthService.resendOtp(reqBody);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "kode OTP berhasil di kirim",
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async forgotPassword(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.body as ForgotPasswordRequest;

			const result = await AuthService.forgotPassword(reqBody);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Pengguna ditemukan, kode verifikasi anda terkirim",
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async matchOtp(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.body as MatchOtpRequest;

			const result = await AuthService.matchOtp(reqBody);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Verifikasi berhasil, kode OTP anda benar",
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async resetPassword(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const token = req.user as TokenVerification;
			const reqBody = req.body as ResetPasswordRequest;

			const result = await AuthService.resetPassword(reqBody, token);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Password berhasil di ubah, harap login kembali",
				data: result,
			});
		} catch (err) {
			next(err)
		}
	}
}
