import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ImageService } from "../../../services/image/image.service";
import { CustomeRequest } from "../../../types/express.type";

export const ImageController = {
	uploadImageSocialAssistance: async (req: CustomeRequest, res: Response, next: NextFunction) => {
		try {
			const reqParams = req.params as {id: string};
			const reqFile = req.file;

			const result = await ImageService.uploadImageSocialAssistance(reqParams, reqFile);
			res.status(StatusCodes.CREATED).json({
				status: "success",
				code: StatusCodes.CREATED,
				message: "Upload gambar berhasil.",
				data: result,
			});
		} catch (err) {
			next(err)
		}
	},

	updateSocialAssistance: async (req: CustomeRequest, res: Response, next: NextFunction) => {
		try {
			const reqParams = req.params as {id: string};
			const reqFile = req.file

			const result = await ImageService.updateImageSocialAssistance(reqParams, reqFile);
			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: "Update gambar berhasil.",
				data: result,
			});
		} catch (err) {
			next(err)
		}
	}
};
