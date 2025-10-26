import { Entity } from "@prisma/client";
export interface ImageResponse {
    id: string;
    filename: string;
    path: string;
    profile_id?: string;
    user_id?: string;
    social_assistance_id?: string;
    event_id?: string;
    development_id?: string;
    entity_type: Entity;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=image.model.d.ts.map