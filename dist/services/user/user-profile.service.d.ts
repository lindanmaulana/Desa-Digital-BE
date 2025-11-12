import { ChangePasswordUserProfileRequest, UpdateUserProfileRequest, UserResponse, UserResponseWithRelation } from "../../models/user.model";
import { TokenUser } from "../../types/token.type";
export declare const UserProfileService: {
    getProfile: (user: TokenUser) => Promise<UserResponseWithRelation>;
    updateProfile: (user: TokenUser, req: UpdateUserProfileRequest) => Promise<UserResponse>;
    changePassword: (req: ChangePasswordUserProfileRequest, user: TokenUser) => Promise<UserResponse>;
};
//# sourceMappingURL=user-profile.service.d.ts.map