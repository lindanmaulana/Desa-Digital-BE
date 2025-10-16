import { ChangePasswordRequest, GetAllRequest, GetAllUserResponse, RegisterHeadOfFamilyRequest, RegisterStaffRequest, UserResponse } from "../models/user.model";
import { Token } from "../types/token.type";
export declare class UserService {
    static registerStaffAccount(req: RegisterStaffRequest): Promise<UserResponse>;
    static registerHeadOfFamilyAccount(req: RegisterHeadOfFamilyRequest): Promise<UserResponse>;
    static getProfile(user: Token): Promise<UserResponse>;
    static getAll(req: GetAllRequest, user: Token): Promise<GetAllUserResponse>;
    static getById(id: string, user: Token): Promise<UserResponse>;
    static update(): Promise<void>;
    static delete(id: string): Promise<UserResponse>;
    static changePassword(req: ChangePasswordRequest, user: Token): Promise<UserResponse>;
}
//# sourceMappingURL=user.service.d.ts.map