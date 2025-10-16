import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
export declare class UserController {
    static registerStaff(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static registerHeadOfFamily(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static getUsers(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static getUserById(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static deleteUser(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static getProfile(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static changePassword(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map