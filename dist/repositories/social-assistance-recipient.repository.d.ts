import { Prisma } from "@prisma/client";
export declare const SocialAssistanceRecipientRepository: {
    findAll: (args: Prisma.SocialAssistanceRecipientFindManyArgs) => Promise<({
        head_of_family: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            occupation: string | null;
        };
        social_assistance: {
            name: string;
            id: string;
            is_active: boolean;
            amount: Prisma.Decimal;
            provider: string;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        status: import("@prisma/client").$Enums.Status;
        social_assistance_id: string;
        head_of_family_id: string;
        reason: string;
        bank: import("@prisma/client").$Enums.Bank;
        account_number: string;
    })[]>;
    findCountBySocialAssistanceId: (id: string) => Promise<number>;
    findCount: (args: Prisma.SocialAssistanceRecipientCountArgs) => Promise<number>;
};
//# sourceMappingURL=social-assistance-recipient.repository.d.ts.map