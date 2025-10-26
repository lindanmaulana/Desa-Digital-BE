import { ChangePasswordUserProfileRequest, UpdateUserProfileRequest } from "../models/user-profile.model";
import { UserResponse } from "../models/user.model";
import { Token } from "../types/token.type";
export declare class UserProfileService {
    static get(user: Token): Promise<import("../models/user.model").UserResponseWithRelation>;
    static update(user: Token, req: UpdateUserProfileRequest): Promise<UserResponse>;
    static changePassword(req: ChangePasswordUserProfileRequest, user: Token): Promise<UserResponse>;
}
//# sourceMappingURL=user-profile.service.d.ts.map