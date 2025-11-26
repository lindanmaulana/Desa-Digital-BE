import { SocialAssistanceRecipient } from "@prisma/client";
import { GetAllSocialAssistanceRecipientWithRelations, GetAllSocialAssistanceRecipientWithRelationsResponse, SocialAssistanceRecipientResponse } from "../../models/social-assistance-recipient.model";

export const toSocialAssistanceRecipientResponse = {
	response: (socialAssistanceRecipient: SocialAssistanceRecipient): SocialAssistanceRecipientResponse => {
		return {
			id: socialAssistanceRecipient.id,
			social_assistance_id: socialAssistanceRecipient.id,
			head_of_family_id: socialAssistanceRecipient.head_of_family_id,
			amount: socialAssistanceRecipient.amount,
			reason: socialAssistanceRecipient.reason,
			bank: socialAssistanceRecipient.bank,
			account_number: socialAssistanceRecipient.account_number,
			status: socialAssistanceRecipient.status,

			created_at: socialAssistanceRecipient.created_at,
			updated_at: socialAssistanceRecipient.updated_at
		}
	},

	listResponse: (socialAssistanceRecipients: GetAllSocialAssistanceRecipientWithRelations[]): GetAllSocialAssistanceRecipientWithRelationsResponse[] => {
		return socialAssistanceRecipients.map(socialAssistanceRecipient => ({
			id: socialAssistanceRecipient.id,
			social_assistance_id: socialAssistanceRecipient.id,
			head_of_family_id: socialAssistanceRecipient.head_of_family_id,
			amount: socialAssistanceRecipient.amount,
			reason: socialAssistanceRecipient.reason,
			bank: socialAssistanceRecipient.bank,
			account_number: socialAssistanceRecipient.account_number,
			status: socialAssistanceRecipient.status,

			head_of_family: {
				id: socialAssistanceRecipient.head_of_family.id,
				occupation: socialAssistanceRecipient.head_of_family.occupation,

				user: {
					id: socialAssistanceRecipient.head_of_family.user.id,
					name: socialAssistanceRecipient.head_of_family.user.name
				}
			},

			social_assistance: {
				id: socialAssistanceRecipient.social_assistance.id,
				name: socialAssistanceRecipient.social_assistance.name,
				provider: socialAssistanceRecipient.social_assistance.provider,
				amount: socialAssistanceRecipient.social_assistance.amount,
				is_active: socialAssistanceRecipient.social_assistance.is_active
			},

			created_at: socialAssistanceRecipient.created_at,
			updated_at: socialAssistanceRecipient.updated_at
		}))
	}
}
