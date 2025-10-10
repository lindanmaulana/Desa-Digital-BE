import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api-error";

export class NeedActivation extends CustomAPIError {
	constructor(message: string, email?: string) {
		super(message, StatusCodes.FORBIDDEN, email)
	}
}
