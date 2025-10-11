import { Request } from "express";
import { Token, TokenVerification } from "./token.type";

export interface CustomeRequest extends Request {
	user?: Token | TokenVerification
}


export interface ResponseSuccess<T> {
	status: string
	code: number
	message: string
	data: T | T[]
}
