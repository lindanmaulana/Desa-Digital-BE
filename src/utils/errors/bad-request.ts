import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api-error";

export class BadrequestError extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST)

    }
}