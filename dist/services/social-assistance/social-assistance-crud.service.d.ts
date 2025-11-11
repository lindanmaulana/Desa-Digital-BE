import { CreateSocialAssistanceRequest, GetAllSocialAssistanceRequest, GetAllSocialAssistanceUserResponse, SocialAssistanceResponse, UpdateSocialAssistanceRequest } from "../../models/social-assistance.model";
export declare const SocialAssistanceCrudService: {
    create: (req: CreateSocialAssistanceRequest) => Promise<SocialAssistanceResponse>;
    getAll: (req: GetAllSocialAssistanceRequest) => Promise<GetAllSocialAssistanceUserResponse>;
    update: (id: string, req: UpdateSocialAssistanceRequest) => Promise<SocialAssistanceResponse>;
};
//# sourceMappingURL=social-assistance-crud.service.d.ts.map