import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SocialAssistanceCreateRequest, SocialAssistanceGetAllRequest, SocialAssistanceUpdateRequest } from "../../../models/social-assistance.model";
import { SocialAssistanceCrudService } from "../../../services";
import { CustomeRequest } from "../../../types/express.type";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";

export class SocialAssistanceController {
	static async create(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.body as SocialAssistanceCreateRequest;

			const result = await SocialAssistanceCrudService.create(reqBody);

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
			const reqBody = req.body as SocialAssistanceUpdateRequest;

			const result = await SocialAssistanceCrudService.update(reqParams.id, reqBody);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.update,
				data: result,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getSocialAssistances(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqQuery = req.query as SocialAssistanceGetAllRequest;
			const result = await SocialAssistanceCrudService.getAll(reqQuery);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.CREATED,
				message: RESPONSE_MESSAGE.success.read,
				data: result.data,
				pagination: result.pagination,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getSocialAssistanceById(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const params = req.params as { id: string };
			const result = await SocialAssistanceCrudService.getOne(params);

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

	static async delete(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const params = req.params as { id: string };
			const result = await SocialAssistanceCrudService.delete(params);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.delete,
				data: result,
			});
		} catch (err) {
			next(err)
		}
	}
}
