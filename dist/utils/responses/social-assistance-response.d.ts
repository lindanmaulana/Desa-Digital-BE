import { SocialAssistance } from "@prisma/client";
import { SocialAssistanceResponse, SocialAssistanceWithRelation, SocialAssistanceWithRelationFull, SocialAssistanceWithRelationResponse } from "../../models/social-assistance.model";
export declare const toSocialAssistanceResponse: {
    response: (socialAssistance: SocialAssistance) => SocialAssistanceResponse;
    responses: (socialAssistances: SocialAssistance[]) => SocialAssistanceResponse[];
    withRelationResponse: (socialAssistance: SocialAssistanceWithRelation) => SocialAssistanceWithRelationResponse;
    withRelationResponses: (socialAssistances: SocialAssistanceWithRelation[]) => SocialAssistanceWithRelationResponse[];
    withRelationFullResponse: (socialAssistance: SocialAssistanceWithRelationFull) => SocialAssistanceWithRelationResponse;
    withRelationFullResponses: (socialAssistances: SocialAssistanceWithRelationFull[]) => SocialAssistanceWithRelationResponse[];
};
//# sourceMappingURL=social-assistance-response.d.ts.map