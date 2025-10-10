import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
export declare class UserController {
    static getUsers(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static getUserById(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static deleteUser(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map