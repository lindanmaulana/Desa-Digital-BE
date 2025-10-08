import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
import { UserService } from "../../../services/user.services";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";

export class UserController {
	static async findAll(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const result = await UserService.getAll()

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.read,
				data: result
			})
		} catch (err) {
			next(err)
		}
	}

	static async signup(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const result = await UserService.signup(req.body)

			res.status(StatusCodes.CREATED).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Pendaftaran berhasil",
				data: result
			})
		} catch (err) {
			next(err)
		}
	}

	static async signin(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const result = await UserService.signin(req.body)

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Login berhasil",
				data: result
			})
		} catch (err) {
			next(err)
		}
	}
}
