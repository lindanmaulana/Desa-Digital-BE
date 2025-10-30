import { CustomTypeError } from "../../types/error.type"

export class CustomAPIError extends Error {
    public StatusCodes: number
	public email?: string
	public type_error?: CustomTypeError

    constructor(message: string, statusCode: number, email?: string, type_error?: CustomTypeError) {
        super(message)
        this.StatusCodes = statusCode
		this.email = email as string ?? undefined
		this.type_error = type_error ?? "UNKNOWN"
    }
}
