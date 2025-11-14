import { CategorySocialAssistance, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { PaginationResponse } from "./pagination.model";
import { SocialAssistanceRecipientResponse } from "./social-assistance-recipient.model";
import { ImageResponse } from "./image.model";

export type SocialAssistanceWithRelations = Prisma.SocialAssistanceGetPayload<{
	include: {
		image: true
		social_assistance_recipient: true
		_count: {
			select: {
				social_assistance_recipient: true
			}
		}
	}
}>

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

export interface SocialAssistanceResponseWithRelation extends SocialAssistanceResponse {
	social_assistance_recipient?: SocialAssistanceRecipientResponse[] | null | number,
	social_assistance_recipient_count?: string | number
	image?: ImageResponse | null
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
	data: SocialAssistanceResponseWithRelation[];
	pagination: PaginationResponse;
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
