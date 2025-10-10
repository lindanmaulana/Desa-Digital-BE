import { UserRole } from "@prisma/client";
export interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    otp_code?: string | null;
    is_active: boolean;
    is_first_login: boolean;
    created_at: Date;
    updated_at: Date;
}
export interface UserSignupRequest {
    name: string;
    email: string;
    password: string;
    otp_code?: string;
}
export interface UserSigninRequest {
    email: string;
    password: string;
}
export interface UserSigninResponse extends UserResponse {
    token: string;
}
export interface ChangePasswordRequest {
    password: string;
    confirm_password: string;
}
export interface ActivationRequest {
    email: string;
    otp_code: string;
}
//# sourceMappingURL=user.model.d.ts.map