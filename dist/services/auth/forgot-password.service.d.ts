import { ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, VerifyOtpForgotPasswordRequest, verifyOtpForgotPasswordResponse } from "../../models/auth.model";
import { UserResponse } from "../../models/user.model";
export declare const ForgotPasswordAuthService: {
    forgotPassword: (req: ForgotPasswordRequest) => Promise<ForgotPasswordResponse>;
    resendOtpForgotPassword: (req: ForgotPasswordRequest) => Promise<ForgotPasswordResponse>;
    verifyOtpForgotPassword: (req: VerifyOtpForgotPasswordRequest) => Promise<verifyOtpForgotPasswordResponse>;
    resetPassword: (req: ResetPasswordRequest) => Promise<UserResponse>;
};
//# sourceMappingURL=forgot-password.service.d.ts.map