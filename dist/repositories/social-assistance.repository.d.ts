import { Prisma } from "@prisma/client";
export declare class SocialAssistanceRepository {
    static create(args: Prisma.SocialAssistanceCreateArgs): Promise<{
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        provider: string;
        description: string | null;
    }>;
    static update(args: Prisma.SocialAssistanceUpdateArgs): Promise<{
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        provider: string;
        description: string | null;
    }>;
    static findById(id: string): Promise<{
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        provider: string;
        description: string | null;
    } | null>;
    static findAll(args: Prisma.SocialAssistanceFindManyArgs): Promise<({
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
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        provider: string;
        description: string | null;
    })[]>;
    static findOne(id: string): Promise<({
        social_assistance_recipient: {
            id: string;
            created_at: Date;
            updated_at: Date;
            amount: Prisma.Decimal;
            status: import("@prisma/client").$Enums.Status;
            head_of_family: {
                user: {
                    name: string;
                    id: string;
                };
                id: string;
            };
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
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        provider: string;
        description: string | null;
    }) | null>;
    static findCount(args: Prisma.SocialAssistanceCountArgs): Promise<number>;
    static isNameTaken(name: string): Promise<boolean>;
    static delete(id: string): Promise<{
        name: string;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        amount: Prisma.Decimal;
        thumbnail: string | null;
        category: import("@prisma/client").$Enums.CategorySocialAssistance;
        provider: string;
        description: string | null;
    }>;
}
//# sourceMappingURL=social-assistance.repository.d.ts.map