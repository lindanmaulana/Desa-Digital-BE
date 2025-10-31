import { ForgotPasswordRequest, ForgotPasswordResponse, MatchOtpRequest, MathOtpResponse, ResendOtpRequest, ResendOtpResponse, ResendVerifyAccountTokenRequest, ResendVerifyAccountTokenResponse, ResetPasswordRequest, SigninRequest, SigninResponse, SignupRequest, VerifyAccountRequest } from "../models/auth.model";
import { UserResponse } from "../models/user.model";
import { TokenResetPassword } from "../types/token.type";
export declare class AuthService {
    static signup(req: SignupRequest): Promise<UserResponse>;
    static signin(req: SigninRequest): Promise<SigninResponse>;
    static verifyAccount(req: VerifyAccountRequest): Promise<UserResponse>;
    static resendOtp(req: ResendOtpRequest): Promise<ResendOtpResponse>;
    static resendVerifyAccountToken(req: ResendVerifyAccountTokenRequest): Promise<ResendVerifyAccountTokenResponse>;
    static forgotPassword(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;
    static matchOtp(req: MatchOtpRequest): Promise<MathOtpResponse>;
    static resetPassword(req: ResetPasswordRequest, user: TokenResetPassword): Promise<UserResponse>;
}
//# sourceMappingURL=auth.service.d.ts.map