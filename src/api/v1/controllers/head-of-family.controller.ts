import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
import { GetAllHeadOfFamilyRequest } from "../../../models/head-of-family.model";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";
import { HeadOfFamilyService } from "../../../services/head-of-family/head-of-family.service";

export const HeadOfFamilyUserController = {
	getHeadOfFamilies: async (req: CustomeRequest, res: Response, next: NextFunction) => {
		try {
			const reqQuery = req.query as GetAllHeadOfFamilyRequest;
			const result = await HeadOfFamilyService.getAll(reqQuery);

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
	},

	getHeadOfFamilyById: async (req: CustomeRequest, res: Response, next: NextFunction) => {
		try {
			const params = req.params as { id: string };
			const result = await HeadOfFamilyService.getOne(params);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.read,
				data: result
			});
		} catch (err) {
			next(err)
		}
	},
};
