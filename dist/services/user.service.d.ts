import { GetAllUserRequest, GetAllUserResponse, RegisterHeadOfFamilyRequest, RegisterStaffRequest, UserResponse } from "../models/user.model";
import { Token } from "../types/token.type";
export declare class UserService {
    static registerStaffAccount(req: RegisterStaffRequest): Promise<UserResponse>;
    static registerHeadOfFamilyAccount(req: RegisterHeadOfFamilyRequest): Promise<UserResponse>;
    static getAll(req: GetAllUserRequest, user: Token): Promise<GetAllUserResponse>;
    static getById(id: string): Promise<UserResponse>;
    static delete(id: string): Promise<UserResponse>;
}
//# sourceMappingURL=user.service.d.ts.map