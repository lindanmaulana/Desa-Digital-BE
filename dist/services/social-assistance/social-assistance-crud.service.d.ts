import { CreateSocialAssistanceRequest, DeleteSocialAsistanceRequest, GetAllSocialAssistanceRequest, GetAllSocialAssistanceResponse, GetOneSocialAssistanceRequest, GetOneSocialAssistanceResponse, SocialAssistanceResponse, UpdateSocialAssistanceRequest } from "../../models/social-assistance.model";
export declare const SocialAssistanceCrudService: {
    create: (req: CreateSocialAssistanceRequest) => Promise<SocialAssistanceResponse>;
    getAll: (req: GetAllSocialAssistanceRequest) => Promise<GetAllSocialAssistanceResponse>;
    getOne: (req: GetOneSocialAssistanceRequest) => Promise<GetOneSocialAssistanceResponse>;
    update: (id: string, req: UpdateSocialAssistanceRequest) => Promise<SocialAssistanceResponse>;
    delete: (req: DeleteSocialAsistanceRequest) => Promise<SocialAssistanceResponse>;
};
//# sourceMappingURL=social-assistance-crud.service.d.ts.map