import { Token } from "../../types/token.type";
interface CreateJwtParams {
    payload: Token;
}
declare const createJwt: ({ payload }: CreateJwtParams) => string;
declare const isTokenValid: ({ token }: {
    token: string;
}) => Token;
export { createJwt, isTokenValid };
//# sourceMappingURL=create-jwt.d.ts.map