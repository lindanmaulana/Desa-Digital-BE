import { Gender, Marital } from "@prisma/client";
export interface HeadOfFamilyResponse {
    user_id: string;
    profile_picture?: string;
    identity_number?: string;
    gender: Gender;
    date_of_birth?: Date;
    phone_number?: string;
    occupation?: string;
    marital_status: Marital;
    created_at: Date;
    updated_at: Date;
}
export interface CreateHeadOfFamilyRequest {
    user_id: string;
    profile_picture?: string;
    identity_number?: string;
    gender: Gender;
    date_of_birth?: string;
    phone_number?: string;
    occupation?: string;
    marital_status: Marital;
}
//# sourceMappingURL=head-of-family.d.ts.map