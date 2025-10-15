import { User } from "@prisma/client";
import { UserResponse, UserResponseWithRelation, UserWithRelations } from "../../models/user.model";
declare const _default: {
    toUserResponse: (user: User) => UserResponse;
    toUserResponses: (users: User[]) => UserResponse[];
    toUserResponseWithRelation: (user: UserWithRelations) => UserResponseWithRelation;
    toUserResponsesWithRelation: (users: UserWithRelations[]) => UserResponseWithRelation[];
};
export default _default;
//# sourceMappingURL=user.,response.d.ts.map