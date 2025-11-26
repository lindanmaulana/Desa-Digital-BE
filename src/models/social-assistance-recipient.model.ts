import { Bank, Prisma, Status } from "@prisma/client";
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
}

export interface SocialAssistanceRecipientGetAllRequest {
	keyword?: string;
	page?: string;
	limit?: string;
	sort?: string;
}

// Raw Prisma
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

// DTO
type HeadOfFamilyDTO = Prisma.HeadOfFamilyGetPayload<{
	select: {
		id: true,
		user: {
			select: {
				id: true,
				name: true
			}
		},
		occupation: true
	}
}>

type SocialAssistanceDTO = Prisma.SocialAssistanceGetPayload<{
	select: {
		id: true,
		name: true,
		provider: true,
		amount: true,
		is_active: true
	}
}>

export interface SocialAssistanceRecipientGetAllDto extends SocialAssistanceRecipientResponse {
	head_of_family: HeadOfFamilyDTO;
	social_assistance: SocialAssistanceDTO;
}

// Response API
export interface SocialAssistanceRecipientGetAllResponse {
	data: SocialAssistanceRecipientGetAllDto[];
	pagination: PaginationResponse;
}


