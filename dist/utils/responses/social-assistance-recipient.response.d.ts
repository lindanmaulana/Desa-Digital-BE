import { SocialAssistanceRecipient } from "@prisma/client";
import { GetAllSocialAssistanceRecipientWithRelations, GetAllSocialAssistanceRecipientWithRelationsResponse, SocialAssistanceRecipientResponse } from "../../models/social-assistance-recipient.model";
export declare const toSocialAssistanceRecipientResponse: {
    response: (socialAssistanceRecipient: SocialAssistanceRecipient) => SocialAssistanceRecipientResponse;
    listResponse: (socialAssistanceRecipients: GetAllSocialAssistanceRecipientWithRelations[]) => GetAllSocialAssistanceRecipientWithRelationsResponse[];
};
//# sourceMappingURL=social-assistance-recipient.response.d.ts.map