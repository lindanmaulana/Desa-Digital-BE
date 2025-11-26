import { SocialAssistanceCreateRequest, SocialAssistanceDeleteRequest, SocialAssistanceGetAllRequest, SocialAssistanceGetAllResponse, SocialAssistanceGetOneRequest, SocialAssistanceGetOneResponse, SocialAssistanceResponse, SocialAssistanceUpdateRequest } from "../../models/social-assistance.model";
export declare const SocialAssistanceCrudService: {
    create: (req: SocialAssistanceCreateRequest) => Promise<SocialAssistanceResponse>;
    getAll: (req: SocialAssistanceGetAllRequest) => Promise<SocialAssistanceGetAllResponse>;
    getOne: (req: SocialAssistanceGetOneRequest) => Promise<SocialAssistanceGetOneResponse>;
    update: (id: string, req: SocialAssistanceUpdateRequest) => Promise<SocialAssistanceResponse>;
    delete: (req: SocialAssistanceDeleteRequest) => Promise<SocialAssistanceResponse>;
};
//# sourceMappingURL=social-assistance-crud.service.d.ts.map