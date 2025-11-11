import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
export declare class ProfileUserController {
    static getProfile(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static changePassword(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=profile-user.controller.d.ts.map