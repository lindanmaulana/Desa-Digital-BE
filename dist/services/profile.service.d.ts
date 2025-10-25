import { ChangePasswordProfileRequest } from "../models/profile.model";
import { UserResponse } from "../models/user.model";
import { Token } from "../types/token.type";
export declare class UserProfileService {
    static get(user: Token): Promise<import("../models/user.model").UserResponseWithRelation>;
    static changePassword(req: ChangePasswordProfileRequest, user: Token): Promise<UserResponse>;
}
//# sourceMappingURL=profile.service.d.ts.map