import { HeadOfFamily } from "@prisma/client";
import { HeadOfFamilyGetAllDTO, HeadOfFamilyGetAllPayload, HeadOfFamilyGetOnePayload, HeadOfFamilyGetOneResponse, HeadOfFamilyResponse } from "../../models/head-of-family.model";
export declare const toHeadOfFamilyResponse: {
    response: (headOfFamily: HeadOfFamily) => HeadOfFamilyResponse;
    listResponse: (headOfFamilies: HeadOfFamilyGetAllPayload[]) => HeadOfFamilyGetAllDTO[];
    detailResponse: (headOfFamily: HeadOfFamilyGetOnePayload) => HeadOfFamilyGetOneResponse;
};
//# sourceMappingURL=head-of-family-response.d.ts.map