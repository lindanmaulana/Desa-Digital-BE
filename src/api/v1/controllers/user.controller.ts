import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
import { UserService } from "../../../services/user.service";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";
import { logger } from "../../../logging";

export class UserController {
	static async signup(
		req: CustomeRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const result = await UserService.signup(req.body);

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

	static async signin(
		req: CustomeRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const result = await UserService.signin(req.body);

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

	static async getUsers(
		req: CustomeRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const result = await UserService.getAll();

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

	static async getUserById(
		req: CustomeRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const params = req.params as { id: string };

			const result = await UserService.getById(params.id);

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

	static async deleteUser(
		req: CustomeRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const params = req.params as { id: string };

			logger.info(req.params);
			const result = await UserService.delete(params.id);

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
