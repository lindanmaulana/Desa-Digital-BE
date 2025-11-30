import { Bank, Entity, Prisma, Status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { PaginationResponse } from "./pagination.model";

// Model main
export interface SocialAssistanceRecipientResponse {
	id: string;
	social_assistance_id: string;
	head_of_family_id: string;
	amount: Decimal;
	reason: string;
	bank: Bank;
	account_number: string;
	account_name: string
	status: Status;

	created_at: Date;
	updated_at: Date;
}

// Request
export interface SocialAssistanceRecipientCreateRequest {
	social_assistance_id: string;
	head_of_family_id: string;
	amount: Decimal;
	reason: string;
	bank: Bank;
	acount_number: number;
	account_name: string;
}

export interface SocialAssistanceRecipientGetAllRequest {
	keyword?: string;
	page?: string;
	limit?: string;
	sort?: string;
}

export interface SocialAssistanceRecipientGetOneRequest {
	id: string;
}

export interface SocialAssistanceRecipientUpdateRequest {
	status: Status
}

// Raw Prisma
type HeadOfFamilyDTO = Prisma.HeadOfFamilyGetPayload<{
	select: {
		id: true;
		user: {
			select: {
				id: true;
				name: true;
			};
		};
		occupation: true;
	};
}>;

type SocialAssistanceGetAllDTO = Prisma.SocialAssistanceGetPayload<{
	select: {
		id: true;
		name: true;
		provider: true;
		amount: true;
		is_active: true;
	};
}>;

export type SocialAssistanceRecipientGetAllPayload = Prisma.SocialAssistanceRecipientGetPayload<{
	include: {
		head_of_family: {
			select: {
				id: true;
				user: {
					select: {
						id: true;
						name: true;
					};
				};
				occupation: true;
			};
		};

		social_assistance: {
			select: {
				id: true;
				name: true;
				provider: true;
				amount: true;
				is_active: true;
			};
		};
	};
}>;

export type SocialAssistanceRecipientGetOnePayload = Prisma.SocialAssistanceRecipientGetPayload<{
	include: {
		image: {
			select: {
				id: true;
				path: true;
				filename: true;
				social_assistance_recipient_id: true;
				entity_type: true;
			};
		};

		social_assistance: {
			select: {
				id: true;
				thumbnail: true;
				name: true;
				category: true;
				amount: true;
				provider: true;
				is_active: true;
				description: true;
				image: {
					select: {
						id: true;
						path: true;
						filename: true;
						social_assistance_id: true;
						entity_type: true;
					};
				};
			};
		};

		head_of_family: {
			select: {
				id: true;
				identity_number: true;
				occupation: true;
				user: {
					select: {
						id: true;
						name: true;
						image: {
							select: {
								id: true;
								path: true;
								filename: true;
								user_id: true;
								entity_type: true;
							};
						};
					};
				};

				_count: {
					select: {
						family_member: true;
					};
				};
			};
		};
	};
}>;

// DTO
export interface SocialAssistanceRecipientGetAllDto extends SocialAssistanceRecipientResponse {
	head_of_family: HeadOfFamilyDTO;
	social_assistance: SocialAssistanceGetAllDTO;
}

// Response API
export interface SocialAssistanceRecipientGetAllResponse {
	data: SocialAssistanceRecipientGetAllDto[];
	pagination: PaginationResponse;
}

export interface SocialAssistanceRecipientGetOneResponse extends SocialAssistanceRecipientResponse {
	image?: {
		id: string;
		path: string;
		filename: string;
		social_assistance_recipient_id: string;
		entity_type: Entity;
	} | null;

	social_assistance: {
		id: string;
		thumbnail: string | null;
		name: string;
		category: string;
		amount: Decimal;
		provider: string;
		is_active: boolean;
		description: string | null;
		image: {
			id: string;
			path: string;
			filename: string;
			social_assistance_id?: string | null;
			entity_type: Entity;
		} | null;
	};

	head_of_family: {
		id: string;
		identity_number?: string | null;
		occupation?: string | null;
		user: {
			id: string;
			name: string;
			image: {
				id: string;
				path: string;
				filename: string;
				user_id?: string | null;
				entity_type: Entity;
			} | null;

			family_member_count: number;
		};
	};
}
