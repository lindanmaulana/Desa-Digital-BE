import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ImageService } from "../../../services/image/image.service";
import { CustomeRequest } from "../../../types/express.type";

export const ImageController = {
	socialAssistanceUpload: async (req: CustomeRequest, res: Response, next: NextFunction) => {
		try {
			const reqFile = req.file;
			const reqParams = req.params as {id: string};

			const result = await ImageService.uploadSocialAssistanceImage(reqParams, reqFile);
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
};
