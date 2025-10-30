import { ChangePasswordUserProfileRequest, UpdateUserProfileRequest } from "../models/user-profile.model";
import { UserResponse } from "../models/user.model";
import { TokenUser } from "../types/token.type";
export declare class UserProfileService {
    static get(user: TokenUser): Promise<import("../models/user.model").UserResponseWithRelation>;
    static update(user: TokenUser, req: UpdateUserProfileRequest): Promise<UserResponse>;
    static changePassword(req: ChangePasswordUserProfileRequest, user: TokenUser): Promise<UserResponse>;
}
//# sourceMappingURL=user-profile.service.d.ts.map