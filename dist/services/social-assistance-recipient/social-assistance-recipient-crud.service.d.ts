import { CreateSocialAssistanceRecipientRequest, GetAllSocialAssistanceRecipientRequest, GetAllSocialAssistanceRecipientResponse } from "../../models/social-assistance-recipient.model";
import { TokenUser } from "../../types/token.type";
export declare const SocialAssistanceRecipientCrudService: {
    create: (req: CreateSocialAssistanceRecipientRequest) => Promise<void>;
    getAll: (req: GetAllSocialAssistanceRecipientRequest, context: TokenUser) => Promise<GetAllSocialAssistanceRecipientResponse>;
};
//# sourceMappingURL=social-assistance-recipient-crud.service.d.ts.map