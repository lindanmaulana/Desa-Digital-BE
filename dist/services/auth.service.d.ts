import { ActivationRequest, ForgotPasswordRequest, MatchOtpRequest, MathOtpResponse, ResendOtpRequest, ResetPasswordRequest, SigninRequest, SigninResponse, SignupRequest } from "../models/auth.model";
import { UserResponse } from "../models/user.model";
import { TokenVerification } from "../types/token.type";
export declare class AuthService {
    static signup(req: SignupRequest): Promise<UserResponse>;
    static signin(req: SigninRequest): Promise<SigninResponse>;
    static activation(req: ActivationRequest): Promise<UserResponse>;
    static resendOtp(req: ResendOtpRequest): Promise<UserResponse>;
    static forgotPassword(req: ForgotPasswordRequest): Promise<UserResponse>;
    static matchOtp(req: MatchOtpRequest): Promise<MathOtpResponse>;
    static resetPassword(req: ResetPasswordRequest, user: TokenVerification): Promise<UserResponse>;
}
//# sourceMappingURL=auth.service.d.ts.map