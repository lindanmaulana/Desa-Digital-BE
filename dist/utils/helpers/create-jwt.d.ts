import { Token } from "../../types/token.type";
export interface CreateJwtParams {
    payload: Token;
}
export declare const createJwt: ({ payload }: CreateJwtParams) => string;
export declare const isTokenValid: ({ token }: {
    token: string;
}) => Token;
//# sourceMappingURL=create-jwt.d.ts.map