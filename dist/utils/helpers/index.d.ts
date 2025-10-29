declare const _default: {
    createJwt: ({ payload }: import("./jwt/create-jwt").CreateJwtParams) => string;
    isTokenValid: ({ token }: {
        token: string;
    }) => import("../../types/token.type").Token | import("../../types/token.type").TokenVerification;
    createTokenUser: (user: import("@prisma/client").User) => string;
    generateOtp: () => string;
    toUserRole: (role: string) => import("@prisma/client").UserRole;
    hashPassword: (password: string, salt?: number) => Promise<string>;
    comparePassword: (requestPassword: string, hashPassword: string) => Promise<boolean>;
    getPagination: ({ count, pageRequest, limitRequest }: import("./get-pagination").getPaginationParams) => {
        totalPage: number;
        links: number[];
        nextPage: number | null;
        prevPage: number | null;
        page: number;
        limit: number;
        currentPage: number;
    };
    fileHelpers: {
        checkImage: (pathImage: string) => boolean;
        deleteImage: (pathImage: string) => void;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map