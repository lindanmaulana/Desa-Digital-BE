import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
import { CreateSocialAssistanceRequest } from "../../../models/social-assistance.model";
import services from "../../../services";
import { StatusCodes } from "http-status-codes";
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
}
