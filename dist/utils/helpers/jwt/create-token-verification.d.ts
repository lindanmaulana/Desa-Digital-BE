import { UserRole } from "@prisma/client";
interface TokenVerification {
    id: string;
    email: string;
    role: UserRole;
}
export declare const createTokenVerification: (payload: TokenVerification) => string;
export {};
//# sourceMappingURL=create-token-verification.d.ts.map