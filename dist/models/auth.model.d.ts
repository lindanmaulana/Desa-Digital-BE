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
export interface ActivationRequest {
    email: string;
    otp_code: string;
}
export interface ResendOtpRequest {
    email: string;
}
export interface ForgotPasswordRequest {
    email: string;
}
export interface MatchOtpRequest {
    email: string;
    otp_code: string;
}
export interface MathOtpResponse {
    verify_token: string;
}
export interface ResetPasswordRequest {
    password: string;
    confirm_password: string;
}
//# sourceMappingURL=auth.model.d.ts.map