import { ChangePasswordRequest, GetAllRequest, GetAllUserResponse, RegisterHeadOfFamilyRequest, RegisterStaffRequest, UserResponse } from "../models/user.model";
import { Token } from "../types/token.type";
export declare class UserService {
    static registerStaff(req: RegisterStaffRequest): Promise<UserResponse>;
    static createHeadOfFamily(req: RegisterHeadOfFamilyRequest): Promise<void>;
    static createFamilyMember(): Promise<void>;
    static getProfile(user: Token): Promise<UserResponse>;
    static getAll(req: GetAllRequest, user: Token): Promise<GetAllUserResponse>;
    static getById(id: string, user: Token): Promise<UserResponse>;
    static update(): Promise<void>;
    static delete(id: string): Promise<UserResponse>;
    static changePassword(req: ChangePasswordRequest, user: Token): Promise<UserResponse>;
}
//# sourceMappingURL=user.service.d.ts.map