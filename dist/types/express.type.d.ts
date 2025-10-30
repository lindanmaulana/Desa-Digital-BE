import { Request } from "express";
import { TokenResetPassword, TokenUser, TokenVerifyAccount } from "./token.type";
export interface CustomeRequest extends Request {
    user?: TokenUser | TokenResetPassword | TokenVerifyAccount;
}
export interface ResponseSuccess<T> {
    status: string;
    code: number;
    message: string;
    data: T | T[];
}
//# sourceMappingURL=express.type.d.ts.map