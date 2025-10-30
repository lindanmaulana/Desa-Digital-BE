import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api-error";

export class ExpiredError extends CustomAPIError {
	constructor(message: string) {
		super(message, StatusCodes.UNAUTHORIZED, "", "TOKEN_EXPIRED")
	}
}
