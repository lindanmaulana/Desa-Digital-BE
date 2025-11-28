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
            provider: string;
            amount: Prisma.Decimal;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        social_assistance_id: string;
        head_of_family_id: string;
        reason: string;
        bank: import("@prisma/client").$Enums.Bank;
        account_number: string;
        status: import("@prisma/client").$Enums.Status;
    })[]>;
    findById: (id: string) => Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        social_assistance_id: string;
        head_of_family_id: string;
        reason: string;
        bank: import("@prisma/client").$Enums.Bank;
        account_number: string;
        status: import("@prisma/client").$Enums.Status;
    } | null>;
    findDetailById: (id: string) => Promise<({
        head_of_family: {
            user: {
                name: string;
                id: string;
                image: {
                    id: string;
                    user_id: string | null;
                    filename: string;
                    path: string;
                    entity_type: import("@prisma/client").$Enums.Entity;
                } | null;
            };
            id: string;
            identity_number: string | null;
            occupation: string | null;
            _count: {
                family_member: number;
            };
        };
        image: {
            id: string;
            filename: string;
            path: string;
            social_assistance_recipient_id: string | null;
            entity_type: import("@prisma/client").$Enums.Entity;
        } | null;
        social_assistance: {
            name: string;
            id: string;
            is_active: boolean;
            image: {
                id: string;
                social_assistance_id: string | null;
                filename: string;
                path: string;
                entity_type: import("@prisma/client").$Enums.Entity;
            } | null;
            provider: string;
            amount: Prisma.Decimal;
            thumbnail: string | null;
            category: import("@prisma/client").$Enums.CategorySocialAssistance;
            description: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        social_assistance_id: string;
        head_of_family_id: string;
        reason: string;
        bank: import("@prisma/client").$Enums.Bank;
        account_number: string;
        status: import("@prisma/client").$Enums.Status;
    }) | null>;
    findCountBySocialAssistanceId: (id: string) => Promise<number>;
    findCount: (args: Prisma.SocialAssistanceRecipientCountArgs) => Promise<number>;
};
//# sourceMappingURL=social-assistance-recipient.repository.d.ts.map