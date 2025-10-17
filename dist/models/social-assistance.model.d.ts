import { CategorySocialAssistance } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { PaginationResponse } from "./pagination.model";
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
export interface GetAllSocialAssistanceRequest {
    keyword?: string;
    category?: CategorySocialAssistance;
    is_active?: string;
    page?: string;
    limit?: string;
}
export interface GetAllSocialAssistanceUserResponse {
    data: SocialAssistanceResponse[];
    pagination: PaginationResponse;
}
//# sourceMappingURL=social-assistance.model.d.ts.map