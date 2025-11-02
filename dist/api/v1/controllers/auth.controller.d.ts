import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
export declare class AuthController {
    static signup(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static signin(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static verifyAccount(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static resendTokenVerifyAccount(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static resendOtpVerifyAccount(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static forgotPassword(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static resendOtpForgotPassword(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static matchOtp(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static resetPassword(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map