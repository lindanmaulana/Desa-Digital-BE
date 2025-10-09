import { Request } from "express";
import { Token } from "./token.type";
export interface CustomeRequest extends Request {
    user?: Token;
}
export interface ResponseSuccess<T> {
    status: string;
    code: number;
    message: string;
    data: T | T[];
}
//# sourceMappingURL=express.type.d.ts.map