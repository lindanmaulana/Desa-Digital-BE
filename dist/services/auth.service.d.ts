import { Token } from "../types/token.type";
import { ActivationRequest, ChangePasswordRequest, UserResponse, UserSigninRequest, UserSigninResponse, UserSignupRequest } from "../models/user.model";
export declare class AuthService {
    static signup(req: UserSignupRequest): Promise<UserResponse>;
    static signin(req: UserSigninRequest): Promise<UserSigninResponse>;
    static changePassword(req: ChangePasswordRequest, user: Token): Promise<UserResponse>;
    static activation(req: ActivationRequest): Promise<UserResponse>;
}
//# sourceMappingURL=auth.service.d.ts.map