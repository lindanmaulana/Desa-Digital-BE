declare const _default: {
    userResponse: {
        toUserResponse: (user: import("@prisma/client").User) => import("../../models/user.model").UserResponse;
        toUserResponses: (users: import("@prisma/client").User[]) => import("../../models/user.model").UserResponse[];
        toUserResponseWithRelation: (user: import("../../models/user.model").UserWithRelations) => import("../../models/user.model").UserResponseWithRelation;
        toUserResponsesWithRelation: (users: import("../../models/user.model").UserWithRelations[]) => import("../../models/user.model").UserResponseWithRelation[];
    };
    staffResponse: {
        toStaffResponse: (staff: import("@prisma/client").Staff) => import("../../models/staff.model").StaffResponse;
        toStaffResponses: (staff: import("@prisma/client").Staff[]) => import("../../models/staff.model").StaffResponse[];
    };
    socialAssistanceResponse: {
        toSocialAssistanceResponse: (socialAssistance: import("@prisma/client").SocialAssistance) => import("../../models/social-assistance.model").SocialAssistanceResponse;
        toSocialAssistanceResponses: (socialAssistances: import("@prisma/client").SocialAssistance[]) => import("../../models/social-assistance.model").SocialAssistanceResponse[];
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map