import { Entity } from "@prisma/client";
export interface ImageResponse {
    id: string;
    filename: string;
    path: string;
    profile_id?: string | null;
    user_id?: string | null;
    social_assistance_id?: string | null;
    social_assistance_recipient_id?: string | null;
    event_id?: string | null;
    development_id?: string | null;
    entity_type: Entity;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=image.model.d.ts.map