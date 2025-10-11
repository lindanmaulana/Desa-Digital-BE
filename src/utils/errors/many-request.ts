import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api-error";

export class ManyRequestError extends CustomAPIError {
	constructor(message: string) {
		super(message, StatusCodes.TOO_MANY_REQUESTS)
	}
}
