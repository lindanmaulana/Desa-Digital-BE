import { SocialAssistanceRecipient } from "@prisma/client";
import { SocialAssistanceRecipientGetAllDto, SocialAssistanceRecipientGetAllPayload, SocialAssistanceRecipientResponse } from "../../models/social-assistance-recipient.model";
export declare const toSocialAssistanceRecipientResponse: {
    response: (socialAssistanceRecipient: SocialAssistanceRecipient) => SocialAssistanceRecipientResponse;
    listResponse: (socialAssistanceRecipients: SocialAssistanceRecipientGetAllPayload[]) => SocialAssistanceRecipientGetAllDto[];
};
//# sourceMappingURL=social-assistance-recipient.response.d.ts.map