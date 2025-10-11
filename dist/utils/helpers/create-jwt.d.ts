import { Token, TokenVerification } from "../../types/token.type";
export interface CreateJwtParams {
    payload: Token | TokenVerification;
}
export declare const createJwt: ({ payload }: CreateJwtParams) => string;
export declare const isTokenValid: ({ token }: {
    token: string;
}) => Token | TokenVerification;
//# sourceMappingURL=create-jwt.d.ts.map