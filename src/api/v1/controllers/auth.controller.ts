import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
	ActivationRequest,
	ForgotPasswordRequest,
	MatchOtpRequest,
	ResendOtpRequest,
	ResetPasswordRequest,
} from "../../../models/auth.model";
import services from "../../../services";
import { CustomeRequest } from "../../../types/express.type";
import { TokenVerification } from "../../../types/token.type";

export class AuthController {
	static async signup(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const result = await services.AuthService.signup(req.body);

			res.status(StatusCodes.CREATED).json({
				status: "success",
				code: StatusCodes.CREATED,
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

			res.cookie("jwt", result.token, {
				httpOnly: true,
				// secure: process.env.NODE_ENV === ""
				// secure: false,
				maxAge: 1 * 24 * 60 * 60 * 1000,
				// sameSite: "lax"
			});

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Login berhasil",
				data: {
					id: result.id,
					name: result.name,
					email: result.email,
					role: result.role,
					is_active: result.is_active,
					is_first_login: result.is_first_login,
					created_at: result.created_at,
					updated_at: result.updated_at,
				},
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

			const result = await services.AuthService.resendOtp(reqBody);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Kode verifikasi telah dikirimkan. Cek email Anda.",
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async forgotPassword(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.body as ForgotPasswordRequest;

			const result = await services.AuthService.forgotPassword(reqBody);

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

			const result = await services.AuthService.matchOtp(reqBody);

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

			const result = await services.AuthService.resetPassword(reqBody, token);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Password berhasil di ubah, harap login kembali",
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}
}
