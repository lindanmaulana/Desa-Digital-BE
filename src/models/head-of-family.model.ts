import { Gender, Marital, Prisma, SocialAssistanceRecipient } from "@prisma/client";
import { PaginationResponse } from "./pagination.model";
import { UserResponse } from "./user.model";
import { SocialAssistanceRecipientResponse } from "./social-assistance-recipient.model";

export interface HeadOfFamilyResponse {
	id: string
	user_id: string;
	identity_number?: string;
	gender: Gender;
	date_of_birth?: string;
	phone_number?: string;
	occupation?: string;
	marital_status: Marital;
	created_at: Date;
	updated_at: Date;
}

export type HeadOfFamilyWithRelations = Prisma.HeadOfFamilyGetPayload<{
	include: {
		// family_member: true;
		// event_participant: true;
		sosial_assistance_recipient: true;
		user: {
			omit: {
				password: true;
				otp: true;
				otp_last_sen_at: true;
				otp_purpose: true;
				reset_token: true;
				reset_token_last_sen_at: true;
				verify_token: true;
				verify_token_last_sen_at: true;
			};
		};
	};
}>;

export interface HeadOfFamilyWithRelationsResponse extends HeadOfFamilyResponse {
	social_assistance_recipient: SocialAssistanceRecipientResponse[];
	user: UserResponse;
}

export interface CreateHeadOfFamilyRequest {
	user_id: string;
	identity_number?: string;
	gender: Gender;
	date_of_birth?: string;
	phone_number?: string;
	occupation?: string;
	marital_status: Marital;
}

export interface GetAllHeadOfFamilyRequest {
	keyword?: string;
	page?: string;
	limit?: string;
	sort?: string;
}

export interface GetAllHeadOfFamilyResponse {
	data: HeadOfFamilyWithRelationsResponse[];
	pagination: PaginationResponse;
}

export interface GetOneHeadOfFamilyRequest {
	id: string;
}

export type GetOneHeadOfFamilyResponse = HeadOfFamilyWithRelationsResponse
