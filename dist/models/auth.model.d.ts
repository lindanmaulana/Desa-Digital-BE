import { UserResponse } from "./user.model";
export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    otp_code?: string;
    otp_last_sen_at?: Date;
}
export interface SigninRequest {
    email: string;
    password: string;
}
export interface SigninResponse extends UserResponse {
    token: string;
}
export interface VerifyAccountRequest {
    token: string;
    otp_code: string;
}
export interface ResendOtpRequest {
    token: string;
}
export interface ResendOtpResponse {
    email: string;
    otp_last_sent_at: Date;
    otp_expiry_seconds: number;
}
export interface ResendVerifyAccountTokenRequest {
    email: string;
}
export interface ResendVerifyAccountTokenResponse {
    verify_token_last_sen_at: Date | null;
}
export interface ForgotPasswordRequest {
    email: string;
}
export interface ForgotPasswordResponse {
    email: string;
    otp_last_sent_at: Date;
    otp_expiry_seconds?: number;
}
export interface VerifyOtpForgotPasswordRequest {
    email: string;
    otp_code: string;
}
export interface verifyOtpForgotPasswordResponse {
    verify_token_last_sen_at: Date | null;
}
export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirm_password: string;
}
//# sourceMappingURL=auth.model.d.ts.map