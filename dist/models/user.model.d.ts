import { Prisma, UserRole } from "@prisma/client";
import { SignupRequest } from "./auth.model";
import { PaginationResponse } from "./pagination.model";
import { StaffResponse } from "./staff.model";
export type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        staff: true;
    };
}>;
export interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    otp_code?: string | null;
    otp_last_sen_at?: Date;
    is_active: boolean;
    is_first_login: boolean;
    created_at: Date;
    updated_at: Date;
}
export interface UserResponseWithRelation extends UserResponse {
    staff?: StaffResponse | null;
}
export interface GetAllUserResponse {
    data: UserResponse[];
    pagination: PaginationResponse;
}
export interface ChangePasswordRequest {
    password: string;
    confirm_password: string;
}
export interface PaginationRequest {
}
export interface GetAllRequest {
    keyword?: string;
    role?: UserRole;
    is_active?: string;
    page?: string;
    limit?: string;
}
export interface RegisterHeadOfFamilyRequest extends SignupRequest {
    profile_picture?: string;
    identity_number?: string;
    gender?: string;
    date_of_birth?: string;
    phone_number?: string;
    occupation?: string;
    marital_status?: string;
}
export interface RegisterStaffRequest extends SignupRequest {
    profile_picture?: string;
    identity_number?: string;
    gender?: string;
    date_of_birth?: string;
    phone_number?: string;
    occupation?: string;
    marital_status?: string;
}
//# sourceMappingURL=user.model.d.ts.map