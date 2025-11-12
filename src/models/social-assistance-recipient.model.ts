import { Bank, Status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

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

export interface CreateSocialAssistanceRecipientRequest {
	social_assistance_id: string;
	head_of_family_id: string;
	amount: Decimal;
	reason: string;
	bank: Bank;
	acount_number: number;
}
