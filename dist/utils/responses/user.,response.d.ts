import { User } from "@prisma/client";
import { UserResponse, UserWithRelationResponse, UserWithRelations } from "../../models/user.model";
export declare const toUserResponse: {
    response: (user: User) => UserResponse;
    responses: (users: User[]) => UserResponse[];
    withRelationResponse: (user: UserWithRelations) => UserWithRelationResponse;
    withRelationResponses: (users: UserWithRelations[]) => UserWithRelationResponse[];
};
//# sourceMappingURL=user.,response.d.ts.map