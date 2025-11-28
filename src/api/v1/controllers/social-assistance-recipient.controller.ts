import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SocialAssistanceRecipientGetAllRequest } from "../../../models/social-assistance-recipient.model";
import { SocialAssistanceRecipientCrudService } from "../../../services/social-assistance-recipient/social-assistance-recipient-crud.service";
import { CustomeRequest } from "../../../types/express.type";
import { TokenUser } from "../../../types/token.type";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";

export const SocialAssistanceRecipientController = {
	getSocialAssistanceRecipients: async (req: CustomeRequest, res: Response, next: NextFunction) => {
		try {
			const reqToken = req.cookies as TokenUser;
			const reqQuery = req.query as SocialAssistanceRecipientGetAllRequest;

			const result = await SocialAssistanceRecipientCrudService.getAll(reqQuery, reqToken);
			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.CREATED,
				message: RESPONSE_MESSAGE.success.read,
				data: result.data,
				pagination: result.pagination,
			});
		} catch (err) {
			next(err)
		}
	},

	getByIdSocialAssistanceRecipient: async (req: CustomeRequest, res: Response, next: NextFunction) => {
		try {
			const reqParams = req.params as {id: string}
			const reqToken = req.cookies as TokenUser

			const result = await SocialAssistanceRecipientCrudService.getOne(reqParams, reqToken)
			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.CREATED,
				message: RESPONSE_MESSAGE.success.read,
				data: result,
			});
		} catch (err) {
			next(err)
		}
	}
};
