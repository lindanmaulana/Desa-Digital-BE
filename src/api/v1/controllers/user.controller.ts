import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../../logging";
import services from "../../../services";
import { CustomeRequest } from "../../../types/express.type";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";
import { Token } from "../../../types/token.type";

export class UserController {
	static async getUsers(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const token = req.user as Token
			const result = await services.UserService.getAll(token);

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

	static async getUserById(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const params = req.params as { id: string };
			const token = req.user as Token

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
}
