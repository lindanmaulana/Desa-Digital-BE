import { TokenResetPassword, TokenUser, TokenVerifyAccount } from "../../../types/token.type";
export interface CreateJwtParams {
    payload: TokenUser | TokenResetPassword | TokenVerifyAccount;
    expired?: number | "7d" | "24h" | "1h" | "15m" | "60s";
}
export declare const createJwt: ({ payload, expired }: CreateJwtParams) => string;
export declare const isTokenValid: ({ token }: {
    token: string;
}) => TokenUser | TokenResetPassword | TokenVerifyAccount;
//# sourceMappingURL=create-jwt.d.ts.map