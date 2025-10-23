import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
import { CreateVillageProfileRequest, UpdateVillageProfileRequest } from "../../../models/village-profile";
import services from "../../../services";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";

export class VillageProfileController {
	static async create(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const reqBody = req.body as CreateVillageProfileRequest;

			const result = await services.VillageProfileService.create(reqBody);

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
			const reqBody = req.body as UpdateVillageProfileRequest;

			const result = await services.VillageProfileService.update(reqParams.id, reqBody);

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

	static async get(req: CustomeRequest, res: Response, next: NextFunction) {
		try {
			const result = await services.VillageProfileService.get();

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
}
