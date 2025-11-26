import { Bank, Prisma, Status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { HeadOfFamilyResponse } from "./head-of-family.model";
import { PaginationResponse } from "./pagination.model";
import { SocialAssistanceResponse } from "./social-assistance.model";

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

// Model DTO
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


export interface CreateSocialAssistanceRecipientRequest {
	social_assistance_id: string;
	head_of_family_id: string;
	amount: Decimal;
	reason: string;
	bank: Bank;
	acount_number: number;
}

export interface GetAllSocialAssistanceRecipientRequest {
	keyword?: string;
	page?: string;
	limit?: string;
	sort?: string;
}

export type GetAllSocialAssistanceRecipientWithRelations = Prisma.SocialAssistanceRecipientGetPayload<{
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

export interface GetAllSocialAssistanceRecipientWithRelationsResponse extends SocialAssistanceRecipientResponse {
	head_of_family: HeadOfFamilyDTO;
	social_assistance: SocialAssistanceDTO;
}

export interface GetAllSocialAssistanceRecipientResponse {
	data: GetAllSocialAssistanceRecipientWithRelationsResponse[];
	pagination: PaginationResponse;
}
