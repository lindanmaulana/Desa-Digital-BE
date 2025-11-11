import { ChangePasswordUserProfileRequest, UpdateUserProfileRequest } from "../../models/users/user-profile.model";
import { UserResponse, UserResponseWithRelation } from "../../models/users/user.model";
import { TokenUser } from "../../types/token.type";
export declare class ProfileUserService {
    static get(user: TokenUser): Promise<UserResponseWithRelation>;
    static update(user: TokenUser, req: UpdateUserProfileRequest): Promise<UserResponse>;
    static changePassword(req: ChangePasswordUserProfileRequest, user: TokenUser): Promise<UserResponse>;
}
//# sourceMappingURL=profile-user.service.d.ts.map