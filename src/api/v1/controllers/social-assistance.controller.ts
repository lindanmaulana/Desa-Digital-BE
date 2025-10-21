import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
	CreateSocialAssistanceRequest,
	GetAllSocialAssistanceRequest,
	UpdateSocialAssistanceRequest,
} from "../../../models/social-assistance.model";
import services from "../../../services";
import { CustomeRequest } from "../../../types/express.type";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";

export class SocialAssistanceController {
	static async create(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.body as CreateSocialAssistanceRequest;

			const result = await services.SocialAssistanceService.create(reqBody);

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

	static async update(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqParams = req.params as { id: string };
			const reqBody = req.body as UpdateSocialAssistanceRequest;

			const result = await services.SocialAssistanceService.update(reqParams.id, reqBody);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.update,
				data: result,
			});
		} catch (err) {
			next(err)
		}
	}

	static async getSocialAssistances(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.query as GetAllSocialAssistanceRequest;

			const result = await services.SocialAssistanceService.getAll(reqBody);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.CREATED,
				message: RESPONSE_MESSAGE.success.create,
				data: result.data,
				pagination: result.pagination,
			});
		} catch (err) {
			next(err);
		}
	}
}
