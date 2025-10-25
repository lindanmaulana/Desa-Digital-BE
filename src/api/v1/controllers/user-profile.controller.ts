import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import services from "../../../services";
import { CustomeRequest } from "../../../types/express.type";
import { Token } from "../../../types/token.type";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";
import { ChangePasswordUserProfileRequest } from "../../../models/user-profile.model";

export class UserProfileController {
	static async getProfile(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const token = req.user as Token;

			const result = await services.UserProfileService.get(token);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.read,
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async changePassword(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const token = req.user as Token;
			const reqBody = req.body as ChangePasswordUserProfileRequest;

			const result = await services.UserProfileService.changePassword(reqBody, token!);

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
}
