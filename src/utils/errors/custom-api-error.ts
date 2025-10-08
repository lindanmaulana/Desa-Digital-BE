export class CustomAPIError extends Error {
    public StatusCodes: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.StatusCodes = statusCode
    }
}