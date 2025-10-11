import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
export declare class AuthController {
    static signup(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static signin(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static changePassword(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static activation(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static resendOtp(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static forgotPassword(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static matchOtp(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static resetPassword(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map