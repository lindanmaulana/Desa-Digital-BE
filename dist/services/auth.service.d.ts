import { ActivationRequest, ChangePasswordRequest, ForgotPasswordRequest, MatchOtpRequest, MathOtpResponse, ResendOtpRequest, ResetPasswordRequest, UserResponse, UserSigninRequest, UserSigninResponse, UserSignupRequest } from "../models/user.model";
import { Token, TokenVerification } from "../types/token.type";
export declare class AuthService {
    static signup(req: UserSignupRequest): Promise<UserResponse>;
    static signin(req: UserSigninRequest): Promise<UserSigninResponse>;
    static changePassword(req: ChangePasswordRequest, user: Token): Promise<UserResponse>;
    static activation(req: ActivationRequest): Promise<UserResponse>;
    static resendOtp(req: ResendOtpRequest): Promise<UserResponse>;
    static forgotPassword(req: ForgotPasswordRequest): Promise<UserResponse>;
    static matchOtp(req: MatchOtpRequest): Promise<MathOtpResponse>;
    static resetPassword(req: ResetPasswordRequest, user: TokenVerification): Promise<UserResponse>;
}
//# sourceMappingURL=auth.service.d.ts.map