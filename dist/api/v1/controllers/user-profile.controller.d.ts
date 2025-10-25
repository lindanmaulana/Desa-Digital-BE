import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
export declare class UserProfileController {
    static getProfile(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static changePassword(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=user-profile.controller.d.ts.map