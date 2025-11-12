import { GetAllUserRequest, GetAllUserResponse, RegisterHeadOfFamilyRequest, RegisterStaffRequest, UserResponse } from "../../models/user.model";
import { TokenUser } from "../../types/token.type";
export declare const UserCrudService: {
    registerStaffAccount: (req: RegisterStaffRequest) => Promise<UserResponse>;
    registerHeadOfFamilyAccount: (req: RegisterHeadOfFamilyRequest) => Promise<UserResponse>;
    getAll: (req: GetAllUserRequest, user: TokenUser) => Promise<GetAllUserResponse>;
    getById: (id: string) => Promise<UserResponse>;
    delete: (id: string) => Promise<UserResponse>;
};
//# sourceMappingURL=user-crud.service.d.ts.map