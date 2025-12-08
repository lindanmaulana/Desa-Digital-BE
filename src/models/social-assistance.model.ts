import { CategorySocialAssistance, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";
import { ImageResponse } from "./image.model";
import { PaginationResponse } from "./pagination.model";

// Model Main
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

// Request
export interface SocialAssistanceCreateRequest {
	thumbnail?: string;
	name: string;
	category: string;
	amount: string;
	provider: string;
	description?: string;
	is_active: string;
}

export interface SocialAssistanceUpdateRequest {
	thumbnail?: string;
	name: string;
	category: string;
	amount: string;
	provider: string;
	description?: string;
	is_active: string;
}

export interface SocialAssistanceDeleteRequest {
	id: string
}

export interface SocialAssistanceGetAllRequest {
	keyword?: string;
	category?: CategorySocialAssistance;
	is_active?: string;
	sort?: string;
	page?: string;
	limit?: string;
}

export interface SocialAssistanceGetOneRequest {
	id: string;
}

// Raw Prisma
export type SocialAssistanceGetAllPayload = Prisma.SocialAssistanceGetPayload<{
	include: {
		image: true;
		_count: {
			select: {
				social_assistance_recipient: true;
			};
		};
	};
}>;

export type SocialAssistanceGetOnePayload = Prisma.SocialAssistanceGetPayload<{
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

// DTO
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

export interface SocialAssistanceGetAllDTO extends SocialAssistanceResponse {
	social_assistance_recipient?: SocialAssistanceRecipientDTO[] | [];
	social_assistance_recipient_count?: string | number;
	image?: ImageResponse | null;
}

// Response API
export interface SocialAssistanceGetAllResponse {
	data: SocialAssistanceGetAllDTO[];
	pagination: PaginationResponse;
}

export interface SocialAssistanceGetOneResponse extends SocialAssistanceResponse {
	social_assistance_recipient?: SocialAssistanceRecipientDTO[] | [];
	social_assistance_recipient_count?: string | number;
	image?: ImageResponse | null;
};
