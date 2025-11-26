import { SocialAssistanceRecipientCreateRequest, SocialAssistanceRecipientGetAllRequest, SocialAssistanceRecipientGetAllResponse } from "../../models/social-assistance-recipient.model";
import { TokenUser } from "../../types/token.type";
export declare const SocialAssistanceRecipientCrudService: {
    create: (req: SocialAssistanceRecipientCreateRequest) => Promise<void>;
    getAll: (req: SocialAssistanceRecipientGetAllRequest, context: TokenUser) => Promise<SocialAssistanceRecipientGetAllResponse>;
};
//# sourceMappingURL=social-assistance-recipient-crud.service.d.ts.map