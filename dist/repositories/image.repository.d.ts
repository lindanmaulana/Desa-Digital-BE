export declare const ImageRepository: {
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