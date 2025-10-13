import { ChangePasswordRequest, GetAllRequest, GetAllUserResponse, UserResponse } from "../models/user.model";
import { Token } from "../types/token.type";
export declare class UserService {
    static getProfile(user: Token): Promise<UserResponse>;
    static getAll(req: GetAllRequest, user: Token): Promise<GetAllUserResponse>;
    static getById(id: string, user: Token): Promise<UserResponse>;
    static delete(id: string): Promise<UserResponse>;
    static changePassword(req: ChangePasswordRequest, user: Token): Promise<UserResponse>;
}
//# sourceMappingURL=user.service.d.ts.map