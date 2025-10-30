import { CustomTypeError } from "../../types/error.type";
export declare class CustomAPIError extends Error {
    StatusCodes: number;
    email?: string;
    type_error?: CustomTypeError;
    constructor(message: string, statusCode: number, email?: string, type_error?: CustomTypeError);
}
//# sourceMappingURL=custom-api-error.d.ts.map