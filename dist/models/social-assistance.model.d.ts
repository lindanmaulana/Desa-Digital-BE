import { CategorySocialAssistance, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { ImageResponse } from "./image.model";
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
type SocialAssistanceRecipientDTO = Prisma.SocialAssistanceRecipientGetPayload<{
    select: {
        id: true;
        amount: true;
        status: true;
        head_of_family: {
            select: {
                id: true;
                user: {
                    select: {
                        id: true;
                        name: true;
                    };
                };
            };
        };
        created_at: true;
        updated_at: true;
    };
}>;
export type SocialAssistanceWithRelation = Prisma.SocialAssistanceGetPayload<{
    include: {
        image: true;
        _count: {
            select: {
                social_assistance_recipient: true;
            };
        };
    };
}>;
export type SocialAssistanceWithRelationFull = Prisma.SocialAssistanceGetPayload<{
    include: {
        image: true;
        social_assistance_recipient: {
            select: {
                id: true;
                amount: true;
                status: true;
                head_of_family: {
                    select: {
                        id: true;
                        user: {
                            select: {
                                id: true;
                                name: true;
                            };
                        };
                    };
                };
                created_at: true;
                updated_at: true;
            };
        };
        _count: {
            select: {
                social_assistance_recipient: true;
            };
        };
    };
}>;
export interface SocialAssistanceWithRelationResponse extends SocialAssistanceResponse {
    social_assistance_recipient?: SocialAssistanceRecipientDTO[] | [];
    social_assistance_recipient_count?: string | number;
    image?: ImageResponse | null;
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
    sort?: string;
    page?: string;
    limit?: string;
}
export interface GetAllSocialAssistanceResponse {
    data: SocialAssistanceWithRelationResponse[];
    pagination: PaginationResponse;
}
export interface GetOneSocialAssistanceRequest {
    id: string;
}
export interface GetOneSocialAssistanceResponse extends SocialAssistanceResponse {
    social_assistance_recipient?: SocialAssistanceRecipientDTO[] | [];
    social_assistance_recipient_count?: string | number;
    image?: ImageResponse | null;
}
export interface UpdateSocialAssistanceRequest {
    thumbnail?: string;
    name: string;
    category: string;
    amount: string;
    provider: string;
    description?: string;
    is_active: string;
}
export interface UpdateSocialAssistanceSchema {
    thumbnail?: string;
    name: string;
    category: CategorySocialAssistance;
    amount: number;
    provider: string;
    description?: string;
    is_active: boolean;
}
export interface DeleteSocialAsistanceRequest {
    id: string;
}
export {};
//# sourceMappingURL=social-assistance.model.d.ts.map