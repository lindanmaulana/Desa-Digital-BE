import { CreateSocialAssistanceRequest, GetAllSocialAssistanceRequest, GetAllSocialAssistanceUserResponse, SocialAssistanceResponse, UpdateSocialAssistanceRequest } from "../models/social-assistance.model";
export declare class SocialAssistanceService {
    static create(req: CreateSocialAssistanceRequest): Promise<SocialAssistanceResponse>;
    static getAll(req: GetAllSocialAssistanceRequest): Promise<GetAllSocialAssistanceUserResponse>;
    static update(id: string, req: UpdateSocialAssistanceRequest): Promise<SocialAssistanceResponse>;
}
//# sourceMappingURL=social-assistance.service.d.ts.map