import { SocialAssistance } from "@prisma/client";
import { SocialAssistanceGetAllDTO, SocialAssistanceGetAllPayload, SocialAssistanceGetOnePayload, SocialAssistanceGetOneResponse, SocialAssistanceResponse } from "../../models/social-assistance.model";
export declare const toSocialAssistanceResponse: {
    response: (socialAssistance: SocialAssistance) => SocialAssistanceResponse;
    listResponse: (socialAssistances: SocialAssistanceGetAllPayload[]) => SocialAssistanceGetAllDTO[];
    detailResponse: (socialAssistance: SocialAssistanceGetOnePayload) => SocialAssistanceGetOneResponse;
};
//# sourceMappingURL=social-assistance-response.d.ts.map