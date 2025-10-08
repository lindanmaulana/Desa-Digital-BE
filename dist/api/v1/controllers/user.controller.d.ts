import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
export declare class UserController {
    static findAll(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static signup(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
    static signin(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map