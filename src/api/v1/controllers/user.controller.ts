import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../../logging";
import services from "../../../services";
import { CustomeRequest } from "../../../types/express.type";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";
import { Token } from "../../../types/token.type";
import { ChangePasswordRequest, GetAllRequest } from "../../../models/user.model";

export class UserController {
	static async getUsers(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const token = req.user as Token;
			const reqParams = req.query as GetAllRequest
			const result = await services.UserService.getAll(reqParams, token);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.read,
				data: result.data,
				pagination: result.pagination
			});
		} catch (err) {
			next(err);
		}
	}

	static async getUserById(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const params = req.params as { id: string };
			const token = req.user as Token;

			const result = await services.UserService.getById(params.id, token!);

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

	static async deleteUser(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const params = req.params as { id: string };

			logger.info(req.params);
			const result = await services.UserService.delete(params.id);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.delete,
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getProfile(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const token = req.user as Token;

			const result = await services.UserService.getProfile(token);

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
			const reqBody = req.body as ChangePasswordRequest;

			const result = await services.UserService.changePassword(reqBody, token!);

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
