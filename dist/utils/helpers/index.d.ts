declare const _default: {
    createJwt: ({ payload }: import("./create-jwt").CreateJwtParams) => string;
    isTokenValid: ({ token }: {
        token: string;
    }) => import("../../types/token.type").Token | import("../../types/token.type").TokenVerification;
    createToken: (user: import("@prisma/client").User) => string;
    generateOtp: () => string;
    toUserRole: (role: string) => import("@prisma/client").UserRole;
    hashPassword: (password: string, salt?: number) => Promise<string>;
    comparePassword: (requestPassword: string, hashPassword: string) => Promise<boolean>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map