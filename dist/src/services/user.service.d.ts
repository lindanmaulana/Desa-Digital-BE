import { Token } from "../types/token.type";
import { ChangePasswordRequest, UserResponse, UserSigninRequest, UserSigninResponse, UserSignupRequest } from "../types/user.type";
export declare class UserService {
    static signup(req: UserSignupRequest): Promise<UserResponse>;
    static signin(req: UserSigninRequest): Promise<UserSigninResponse>;
    static changePassword(req: ChangePasswordRequest, user: Token): Promise<void>;
    static getAll(): Promise<UserResponse[]>;
    static getById(id: string): Promise<UserResponse>;
    static delete(id: string): Promise<UserResponse>;
}
//# sourceMappingURL=user.service.d.ts.map