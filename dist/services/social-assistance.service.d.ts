import { CreateSocialAssistanceRequest, GetAllSocialAssistanceRequest, GetAllSocialAssistanceUserResponse, SocialAssistanceResponse } from "../models/social-assistance.model";
export declare class SocialAssistanceService {
    static create(req: CreateSocialAssistanceRequest): Promise<SocialAssistanceResponse>;
    static getAll(req: GetAllSocialAssistanceRequest): Promise<GetAllSocialAssistanceUserResponse>;
}
//# sourceMappingURL=social-assistance.service.d.ts.map