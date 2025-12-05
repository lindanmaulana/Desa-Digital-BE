import { NextFunction, Response } from "express";
import { CustomeRequest } from "../types/express.type";
import { ImagePath } from "../types/imagePath.type";

export const setDynamicUploadPath = (entityName: ImagePath) => (req: CustomeRequest, res: Response, next: NextFunction) => {
	req.uploadPath = entityName

	next()
}
