import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HeadOfFamilyGetAllRequest } from "../../../models/head-of-family.model";
import { HeadOfFamilyService } from "../../../services/head-of-family/head-of-family.service";
import { CustomeRequest } from "../../../types/express.type";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";

export const HeadOfFamilyUserController = {
	getHeadOfFamilies: async (req: CustomeRequest, res: Response, next: NextFunction) => {
		try {
			const reqQuery = req.query as HeadOfFamilyGetAllRequest;
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
			const params = req.params as {id: string};
			const result = await HeadOfFamilyService.getOne(params);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.read,
				data: result,
			});
		} catch (err) {
			next(err);
		}
	},
};
