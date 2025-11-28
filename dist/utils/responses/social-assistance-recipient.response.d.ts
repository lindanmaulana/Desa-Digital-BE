import { SocialAssistanceRecipient } from "@prisma/client";
import { SocialAssistanceRecipientGetAllDto, SocialAssistanceRecipientGetAllPayload, SocialAssistanceRecipientGetOnePayload, SocialAssistanceRecipientGetOneResponse, SocialAssistanceRecipientResponse } from "../../models/social-assistance-recipient.model";
export declare const toSocialAssistanceRecipientResponse: {
    response: (socialAssistanceRecipient: SocialAssistanceRecipient) => SocialAssistanceRecipientResponse;
    listResponse: (socialAssistanceRecipients: SocialAssistanceRecipientGetAllPayload[]) => SocialAssistanceRecipientGetAllDto[];
    detailResponse: (socialAssistanceRecipient: SocialAssistanceRecipientGetOnePayload) => SocialAssistanceRecipientGetOneResponse;
};
//# sourceMappingURL=social-assistance-recipient.response.d.ts.map