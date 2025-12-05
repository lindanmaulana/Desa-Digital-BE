import { Request } from "express";
import { ImagePath } from "./imagePath.type";
import { TokenResetPassword, TokenUser, TokenVerifyAccount } from "./token.type";

export interface CustomeRequest extends Request {
	user?: TokenUser | TokenResetPassword | TokenVerifyAccount,
	uploadPath?: ImagePath,
	file?: Express.Multer.File
}


export interface ResponseSuccess<T> {
	status: string
	code: number
	message: string
	data: T | T[]
}
