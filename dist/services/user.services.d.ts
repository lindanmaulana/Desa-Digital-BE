import { UserResponse, UserSigninRequest, UserSigninResponse, UserSignupRequest } from "../types/user.type";
export declare class UserService {
    static signup(req: UserSignupRequest): Promise<UserResponse>;
    static signin(req: UserSigninRequest): Promise<UserSigninResponse>;
    static getAll(): Promise<UserResponse[]>;
}
//# sourceMappingURL=user.services.d.ts.map