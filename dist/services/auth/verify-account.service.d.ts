import { ResendOtpRequest, ResendOtpResponse, ResendVerifyAccountTokenRequest, ResendVerifyAccountTokenResponse, VerifyAccountRequest } from "../../models/auth.model";
import { UserResponse } from "../../models/user.model";
export declare const VerifyAccountAuthService: {
    verifyAccount: (req: VerifyAccountRequest) => Promise<UserResponse>;
    resendOtpVerifyAccount: (req: ResendOtpRequest) => Promise<ResendOtpResponse>;
    resendTokenVerifyAccount: (req: ResendVerifyAccountTokenRequest) => Promise<ResendVerifyAccountTokenResponse>;
};
//# sourceMappingURL=verify-account.service.d.ts.map