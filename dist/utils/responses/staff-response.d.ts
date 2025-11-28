import { HeadOfFamily } from "@prisma/client";
import { HeadOfFamilyResponse } from "../../models/head-of-family.model";
import { StaffGetAllDto, StaffGetAllPayload } from "../../models/staff.model";
export declare const toStaffResponse: {
    response: (headOfFamily: HeadOfFamily) => HeadOfFamilyResponse;
    listResponse: (staff: StaffGetAllPayload[]) => StaffGetAllDto[];
};
//# sourceMappingURL=staff-response.d.ts.map