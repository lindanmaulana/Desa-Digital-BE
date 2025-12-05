import { NextFunction, Request, Response } from "express";
declare const authenticatedUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const authenticatedVerifyAccount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const authenticatedResetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const authorizedRoles: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
export { authenticatedResetPassword, authenticatedUser, authenticatedVerifyAccount, authorizedRoles };
//# sourceMappingURL=auth.d.ts.map