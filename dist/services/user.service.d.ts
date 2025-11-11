import { ChangePasswordUserProfileRequest, GetAllUserRequest, GetAllUserResponse, RegisterHeadOfFamilyRequest, RegisterStaffRequest, UpdateUserProfileRequest, UserResponse, UserResponseWithRelation } from "../models/user.model";
import { TokenUser } from "../types/token.type";
export declare const UserService: {
    registerStaffAccount: (req: RegisterStaffRequest) => Promise<UserResponse>;
    registerHeadOfFamilyAccount: (req: RegisterHeadOfFamilyRequest) => Promise<UserResponse>;
    getAll: (req: GetAllUserRequest, user: TokenUser) => Promise<GetAllUserResponse>;
    getById: (id: string) => Promise<UserResponse>;
    delete: (id: string) => Promise<UserResponse>;
    getProfile: (user: TokenUser) => Promise<UserResponseWithRelation>;
    updateProfile: (user: TokenUser, req: UpdateUserProfileRequest) => Promise<UserResponse>;
    changePassword: (req: ChangePasswordUserProfileRequest, user: TokenUser) => Promise<UserResponse>;
};
//# sourceMappingURL=user.service.d.ts.map