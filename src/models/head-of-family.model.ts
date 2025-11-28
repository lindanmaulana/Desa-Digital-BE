import { Gender, Marital, Prisma } from "@prisma/client";
import { PaginationResponse } from "./pagination.model";
import { SocialAssistanceRecipientResponse } from "./social-assistance-recipient.model";

export interface HeadOfFamilyResponse {
	id: string;
	user_id: string;
	identity_number: string | null;
	gender: Gender;
	date_of_birth: Date | null;
	phone_number: string | null;
	occupation: string | null;
	marital_status: Marital;
	created_at: Date;
	updated_at: Date;
}

// Request
export interface HeadOfFamilyGetAllRequest {
	keyword?: string;
	page?: string;
	limit?: string;
	sort?: string;
}

export interface HeadOfFamilyGetOneRequest {
	id: string;
}

export interface HeadOfFamilyCreateRequest {
	user_id: string;
	identity_number?: string;
	gender: Gender;
	date_of_birth?: string;
	phone_number?: string;
	occupation?: string;
	marital_status: Marital;
}

export interface HeadOfFamilyDeleteRequest {
	id: string;
}

// Raw prisma
type UserPayload = Prisma.UserGetPayload<{
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
}>;

export type HeadOfFamilyGetAllPayload = Prisma.HeadOfFamilyGetPayload<{
	include: {
		// family_member: true;
		// event_participant: true;
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

			include: {
				image: {
					select: {
						id: true;
						filename: true;
						path: true;
						entity_type: true;
						user_id: true;
						created_at: true;
						updated_at: true;
					};
				};
			};
		};

		social_assistance_recipient: {
			take: 3;
			orderBy: {
				created_at: "asc";
			};
		};
	};
}>;

export type HeadOfFamilyGetOnePayload = Prisma.HeadOfFamilyGetPayload<{
	include: {
		// family_member: true;
		// event_participant: true;
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

			include: {
				image: {
					select: {
						id: true;
						filename: true;
						path: true;
						entity_type: true;
						user_id: true;
						created_at: true;
						updated_at: true;
					};
				};
			};
		};

		social_assistance_recipient: {
			take: 3;
			orderBy: {
				created_at: "asc";
			};
		};
	};
}>;

// Dto
export interface HeadOfFamilyGetAllDTO extends HeadOfFamilyResponse {
	social_assistance_recipient: SocialAssistanceRecipientResponse[];
	user: UserPayload;
}

// Response API
export interface HeadOfFamilyGetAllResponse {
	data: HeadOfFamilyGetAllDTO[];
	pagination: PaginationResponse;
}

export interface HeadOfFamilyGetOneResponse extends HeadOfFamilyResponse {
	user: UserPayload;
	social_assistance_recipient: SocialAssistanceRecipientResponse[];
}

export type HeadOfFamilyDeleteResponse = HeadOfFamilyResponse;
