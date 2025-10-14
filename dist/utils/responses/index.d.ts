declare const _default: {
    userResponse: {
        toUserResponse: (user: import("@prisma/client").User) => import("../../models/user.model").UserResponse;
        toUserResponses: (users: import("@prisma/client").User[]) => import("../../models/user.model").UserResponse[];
    };
    staffResponse: {
        toStaffResponse: (staff: import("@prisma/client").Staff) => import("../../models/staff.model").StaffResponse;
        toStaffResponses: (staff: import("@prisma/client").Staff[]) => import("../../models/staff.model").StaffResponse[];
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map