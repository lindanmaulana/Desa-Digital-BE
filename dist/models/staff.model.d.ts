import { Gender, Marital, Prisma } from "@prisma/client";
import { PaginationResponse } from "./pagination.model";
import { UserResponse } from "./user.model";
export interface StaffResponse {
    id: string;
    user_id: string;
    identity_number: string | null;
    gender: Gender;
    date_of_birth: Date | null;
    phone_number: string | null;
    occupation: string | null;
    marital_status: Marital;
    created_at: Date;
    updated_at: Date;
}
export type StaffWithRelations = Prisma.StaffGetPayload<{
    include: {
        user: {
            omit: {
                password: true;
                otp: true;
                otp_last_sen_at: true;
                otp_purpose: true;
                reset_token: true;
                reset_token_last_sen_at: true;
                verify_token: true;
                verify_token_last_sen_at: true;
            };
        };
    };
}>;
export interface StaffWithRelationsResponse extends StaffResponse {
    user: UserResponse;
}
export interface CreateStaffRequest {
    user_id: string;
    identity_number?: string;
    gender: string;
    date_of_birth?: string;
    phone_number?: string;
    occupation?: string;
    marital_status: string;
}
export interface UpdateStaffRequest {
    identity_number?: string;
    gender?: string;
    date_of_birth?: string;
    phone_number?: string;
    occupation?: string;
    marital_status?: string;
}
export interface GetAllStaffRequest {
    keyword?: string;
    page?: string;
    limit?: string;
    sort?: string;
}
export interface GetAllStaffResponse {
    data: StaffWithRelationsResponse[];
    pagination: PaginationResponse;
}
export interface GetOneStaffRequest {
    id: string;
}
export type GetOneStaffResponse = StaffWithRelationsResponse;
export interface DeleteStaffRequest {
    id: string;
}
export type DeleteStaffResponse = StaffResponse;
//# sourceMappingURL=staff.model.d.ts.map