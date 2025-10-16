import { CategorySocialAssistance } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
export interface SocialAssistanceResponse {
    id: string;
    thumbnail?: string | null;
    name: string;
    category: CategorySocialAssistance;
    amount: Decimal;
    provider: string;
    description?: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
export interface CreateSocialAssistanceRequest {
    thumbnail?: string;
    name: string;
    category: string;
    amount: string;
    provider: string;
    description?: string;
    is_active: string;
}
//# sourceMappingURL=social-assistance.model.d.ts.map