import { ForgotPasswordRequest, ForgotPasswordResponse, ResendOtpRequest, ResendOtpResponse, ResendVerifyAccountTokenRequest, ResendVerifyAccountTokenResponse, ResetPasswordRequest, SigninRequest, SigninResponse, SignupRequest, VerifyAccountRequest, VerifyOtpForgotPasswordRequest, verifyOtpForgotPasswordResponse } from "../models/auth.model";
import { UserResponse } from "../models/user.model";
import { TokenResetPassword } from "../types/token.type";
export declare class AuthService {
    static signup(req: SignupRequest): Promise<UserResponse>;
    static signin(req: SigninRequest): Promise<SigninResponse>;
    static verifyAccount(req: VerifyAccountRequest): Promise<UserResponse>;
    static resendOtpVerifyAccount(req: ResendOtpRequest): Promise<ResendOtpResponse>;
    static resendTokenVerifyAccount(req: ResendVerifyAccountTokenRequest): Promise<ResendVerifyAccountTokenResponse>;
    static forgotPassword(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;
    static resendOtpForgotPassword(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;
    static verifyOtpForgotPassword(req: VerifyOtpForgotPasswordRequest): Promise<verifyOtpForgotPasswordResponse>;
    static resetPassword(req: ResetPasswordRequest, user: TokenResetPassword): Promise<UserResponse>;
}
//# sourceMappingURL=auth.service.d.ts.map