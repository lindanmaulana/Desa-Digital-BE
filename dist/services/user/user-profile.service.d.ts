import { ChangePasswordUserProfileRequest, UpdateUserProfileRequest, UserResponse, UserWithRelationResponse } from "../../models/user.model";
import { TokenUser } from "../../types/token.type";
export declare const UserProfileService: {
    getProfile: (user: TokenUser) => Promise<UserWithRelationResponse>;
    updateProfile: (user: TokenUser, req: UpdateUserProfileRequest) => Promise<UserResponse>;
    changePassword: (req: ChangePasswordUserProfileRequest, user: TokenUser) => Promise<UserResponse>;
};
//# sourceMappingURL=user-profile.service.d.ts.map