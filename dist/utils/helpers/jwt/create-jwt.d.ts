import { TokenResetPassword, TokenUser, TokenVerifyAccount } from "../../../types/token.type";
export interface CreateJwtParams {
    payload: TokenUser | TokenResetPassword | TokenVerifyAccount;
}
export declare const createJwt: ({ payload }: CreateJwtParams) => string;
export declare const isTokenValid: ({ token }: {
    token: string;
}) => TokenUser | TokenResetPassword | TokenVerifyAccount;
//# sourceMappingURL=create-jwt.d.ts.map