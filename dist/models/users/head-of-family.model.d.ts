import { Gender, Marital, Prisma } from "@prisma/client";
import { PaginationResponse } from "../pagination.model";
import { UserResponse } from "./user.model";
export interface HeadOfFamilyResponse {
    user_id: string;
    identity_number?: string;
    gender: Gender;
    date_of_birth?: string;
    phone_number?: string;
    occupation?: string;
    marital_status: Marital;
    created_at: Date;
    updated_at: Date;
}
export type HeadOfFamilyWithRelations = Prisma.HeadOfFamilyGetPayload<{
    include: {
        family_member: true;
        event_participant: true;
        sosial_assistance_recipient: true;
    };
}>;
export interface CreateHeadOfFamilyRequest {
    user_id: string;
    identity_number?: string;
    gender: Gender;
    date_of_birth?: string;
    phone_number?: string;
    occupation?: string;
    marital_status: Marital;
}
export interface GetAllHeadOfFamilyRequest {
    keyword?: string;
    page?: string;
    limit?: string;
}
export interface GetAllHeadOfFamilyResponse {
    data: UserResponse[];
    pagination: PaginationResponse;
}
//# sourceMappingURL=head-of-family.model.d.ts.map