import { TypeImageCreateSchema } from "../utils/validations/image.validation";
export declare const ImageRepository: {
    create: (req: TypeImageCreateSchema) => Promise<{
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
    }>;
    createBySocialAssistance: (req: TypeImageCreateSchema) => Promise<{
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
    }>;
    findById: (id: string) => Promise<{
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
    } | null>;
    findCountByProfileId: (profileId: string) => Promise<number>;
    findByUserId: (userId: string) => Promise<{
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
    } | null>;
    findBySocialAssistanceId: (socialAssistanceId: string) => Promise<{
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
    } | null>;
    findByIdSocialAssistanceRecipient: (id: string) => Promise<{
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
    } | null>;
};
//# sourceMappingURL=image.repository.d.ts.map