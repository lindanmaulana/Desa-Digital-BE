import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../../logging";
import {
	ChangePasswordUserProfileRequest,
	GetAllUserRequest,
	RegisterHeadOfFamilyRequest,
	RegisterStaffRequest,
} from "../../../models/user.model";
import { CustomeRequest } from "../../../types/express.type";
import { TokenUser } from "../../../types/token.type";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";
import { UserCrudService, UserProfileService } from "../../../services";

export class UserController {
	static async registerStaff(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.body as RegisterStaffRequest;

			const result = await UserCrudService.registerStaffAccount(reqBody);

			res.status(StatusCodes.CREATED).json({
				status: "success",
				code: StatusCodes.CREATED,
				message: RESPONSE_MESSAGE.success.create,
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async registerHeadOfFamily(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.body as RegisterHeadOfFamilyRequest;
			const result = await UserCrudService.registerHeadOfFamilyAccount(reqBody);

			res.status(StatusCodes.CREATED).json({
				status: "success",
				code: StatusCodes.CREATED,
				message: RESPONSE_MESSAGE.success.create,
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getUsers(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const token = req.user as TokenUser;
			const reqQuery = req.query as GetAllUserRequest;
			const result = await UserCrudService.getAll(reqQuery, token);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.read,
				data: result.data,
				pagination: result.pagination,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getUserById(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const params = req.params as { id: string };

			const result = await UserCrudService.getById(params.id);

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
			const result = await UserCrudService.delete(params.id);

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
			const token = req.user as TokenUser;
			const result = await UserProfileService.getProfile(token);

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
			const token = req.user as TokenUser;
			const reqBody = req.body as ChangePasswordUserProfileRequest;
			const result = await UserProfileService.changePassword(reqBody, token!);

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
