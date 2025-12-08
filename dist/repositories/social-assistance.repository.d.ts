import { Prisma } from "@prisma/client";
export declare const SocialAssistanceRepository: {
    create: (args: Prisma.SocialAssistanceCreateArgs) => Promise<{
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        provider: string;
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        description: string | null;
    }>;
    update: (args: Prisma.SocialAssistanceUpdateArgs) => Promise<{
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        provider: string;
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        description: string | null;
    }>;
    findById: (id: string) => Promise<{
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        provider: string;
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        description: string | null;
    } | null>;
    findAll: (args: Prisma.SocialAssistanceFindManyArgs) => Promise<({
        _count: {
            social_assistance_recipient: number;
        };
        image: {
            id: string;
            created_at: Date;
            updated_at: Date;
            user_id: string | null;
            social_assistance_id: string | null;
            filename: string;
            path: string;
            profile_id: string | null;
            social_assistance_recipient_id: string | null;
            event_id: string | null;
            development_id: string | null;
            entity_type: import("@prisma/client").$Enums.Entity;
        } | null;
    } & {
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        provider: string;
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        description: string | null;
    })[]>;
    findOne: (id: string) => Promise<({
        social_assistance_recipient: {
            id: string;
            created_at: Date;
            updated_at: Date;
            head_of_family: {
                user: {
                    name: string;
                    id: string;
                };
                id: string;
            };
            amount: Prisma.Decimal;
            status: import("@prisma/client").$Enums.Status;
        }[];
        _count: {
            social_assistance_recipient: number;
        };
        image: {
            id: string;
            created_at: Date;
            updated_at: Date;
            user_id: string | null;
            social_assistance_id: string | null;
            filename: string;
            path: string;
            profile_id: string | null;
            social_assistance_recipient_id: string | null;
            event_id: string | null;
            development_id: string | null;
            entity_type: import("@prisma/client").$Enums.Entity;
        } | null;
    } & {
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        provider: string;
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        description: string | null;
    }) | null>;
    findCount: (args: Prisma.SocialAssistanceCountArgs) => Promise<number>;
    isNameTaken: (name: string) => Promise<boolean>;
    delete: (id: string) => Promise<{
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        provider: string;
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        description: string | null;
    }>;
};
//# sourceMappingURL=social-assistance.repository.d.ts.map