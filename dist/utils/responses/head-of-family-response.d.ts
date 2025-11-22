import { HeadOfFamily } from "@prisma/client";
import { HeadOfFamilyResponse, HeadOfFamilyWithRelations, HeadOfFamilyWithRelationsResponse } from "../../models/head-of-family.model";
export declare const toHeadOfFamilyResponse: {
    response: (headOfFamily: HeadOfFamily) => HeadOfFamilyResponse;
    responses: (headOfFamilies: HeadOfFamily[]) => HeadOfFamilyResponse[];
    withRelationResponse: (headOfFamily: HeadOfFamilyWithRelations) => HeadOfFamilyWithRelationsResponse;
    withRelationesponses: (headOfFamilies: HeadOfFamilyWithRelations[]) => HeadOfFamilyWithRelationsResponse[];
};
//# sourceMappingURL=head-of-family-response.d.ts.map