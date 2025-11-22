import { HeadOfFamily } from "@prisma/client";
import { HeadOfFamilyResponse } from "../../models/head-of-family.model";
import { StaffWithRelations, StaffWithRelationsResponse } from "../../models/staff.model";
export declare const toStaffResponse: {
    response: (headOfFamily: HeadOfFamily) => HeadOfFamilyResponse;
    responses: (headOfFamilies: HeadOfFamily[]) => HeadOfFamilyResponse[];
    withRelationResponse: (headOfFamily: StaffWithRelations) => StaffWithRelationsResponse;
    withRelationesponses: (headOfFamilies: StaffWithRelations[]) => StaffWithRelationsResponse[];
};
//# sourceMappingURL=staff-response.d.ts.map