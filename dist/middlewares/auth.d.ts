import { NextFunction, Response } from "express";
import { CustomeRequest } from "../types/express.type";
declare const authenticatedUser: (req: CustomeRequest, res: Response, next: NextFunction) => Promise<void>;
declare const authenticatedVerifyAccount: (req: CustomeRequest, res: Response, next: NextFunction) => Promise<void>;
declare const authenticatedResetPassword: (req: CustomeRequest, res: Response, next: NextFunction) => Promise<void>;
declare const authorizedRoles: (...roles: string[]) => (req: CustomeRequest, res: Response, next: NextFunction) => void;
export { authenticatedResetPassword, authenticatedUser, authenticatedVerifyAccount, authorizedRoles };
//# sourceMappingURL=auth.d.ts.map