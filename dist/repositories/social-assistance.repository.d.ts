import { Prisma } from "@prisma/client";
export declare class SocialAssistanceRepository {
    static create(args: Prisma.SocialAssistanceCreateArgs): Promise<{
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        amount: Prisma.Decimal;
        provider: string;
        description: string | null;
    }>;
    static isNameTaken(name: string): Promise<boolean>;
}
//# sourceMappingURL=social-assistance.repository.d.ts.map