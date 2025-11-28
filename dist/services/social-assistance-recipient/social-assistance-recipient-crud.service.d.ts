import { SocialAssistanceRecipientCreateRequest, SocialAssistanceRecipientGetAllRequest, SocialAssistanceRecipientGetAllResponse, SocialAssistanceRecipientGetOneRequest, SocialAssistanceRecipientGetOneResponse } from "../../models/social-assistance-recipient.model";
import { TokenUser } from "../../types/token.type";
export declare const SocialAssistanceRecipientCrudService: {
    create: (req: SocialAssistanceRecipientCreateRequest) => Promise<void>;
    getAll: (req: SocialAssistanceRecipientGetAllRequest, context: TokenUser) => Promise<SocialAssistanceRecipientGetAllResponse>;
    getOne: (req: SocialAssistanceRecipientGetOneRequest, context: TokenUser) => Promise<SocialAssistanceRecipientGetOneResponse>;
};
//# sourceMappingURL=social-assistance-recipient-crud.service.d.ts.map