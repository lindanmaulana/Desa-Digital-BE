import { SocialAssistance } from "@prisma/client";
import { SocialAssistanceResponse, SocialAssistanceResponseWithRelation, SocialAssistanceWithRelations } from "../../models/social-assistance.model";
export declare const socialAssistanceResponse: {
    toSocialAssistanceResponse: (socialAssistance: SocialAssistance) => SocialAssistanceResponse;
    toSocialAssistanceResponses: (socialAssistances: SocialAssistance[]) => SocialAssistanceResponse[];
    toSocialAssistanceResponseWithRelation: (socialAssistance: SocialAssistanceWithRelations) => SocialAssistanceResponseWithRelation;
    toSocialAssistanceResponsesWithRelation: (socialAssistances: SocialAssistanceWithRelations[]) => SocialAssistanceResponseWithRelation[];
};
//# sourceMappingURL=social-assistance-response.d.ts.map