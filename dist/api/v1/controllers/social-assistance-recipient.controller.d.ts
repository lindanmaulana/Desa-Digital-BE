import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../../types/express.type";
export declare const SocialAssistanceRecipientController: {
    create: (req: CustomeRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: CustomeRequest, res: Response, next: NextFunction) => Promise<void>;
    getSocialAssistanceRecipients: (req: CustomeRequest, res: Response, next: NextFunction) => Promise<void>;
    getSocialAssistanceRecipientById: (req: CustomeRequest, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=social-assistance-recipient.controller.d.ts.map