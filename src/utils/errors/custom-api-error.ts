export class CustomAPIError extends Error {
    public StatusCodes: number
	public email?: string

    constructor(message: string, statusCode: number, email?: string) {
        super(message)
        this.StatusCodes = statusCode
		this.email = email as string ?? undefined
    }
}
