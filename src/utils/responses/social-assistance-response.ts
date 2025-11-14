import { SocialAssistance } from "@prisma/client";
import {
	SocialAssistanceResponse,
	SocialAssistanceResponseWithRelation,
	SocialAssistanceWithRelations,
} from "../../models/social-assistance.model";

export const socialAssistanceResponse = {
	toSocialAssistanceResponse: (socialAssistance: SocialAssistance): SocialAssistanceResponse => {
		return {
			id: socialAssistance.id,
			thumbnail: socialAssistance.thumbnail,
			name: socialAssistance.name,
			category: socialAssistance.category,
			amount: socialAssistance.amount,
			provider: socialAssistance.provider,
			description: socialAssistance.description,
			is_active: socialAssistance.is_active,
			created_at: socialAssistance.created_at,
			updated_at: socialAssistance.updated_at,
		};
	},

	toSocialAssistanceResponses: (socialAssistances: SocialAssistance[]): SocialAssistanceResponse[] => {
		return socialAssistances.map((socialAssistance) => ({
			id: socialAssistance.id,
			thumbnail: socialAssistance.thumbnail,
			name: socialAssistance.name,
			category: socialAssistance.category,
			amount: socialAssistance.amount,
			provider: socialAssistance.provider,
			description: socialAssistance.description,
			is_active: socialAssistance.is_active,
			created_at: socialAssistance.created_at,
			updated_at: socialAssistance.updated_at,
		}));
	},

	toSocialAssistanceResponseWithRelation: (socialAssistance: SocialAssistanceWithRelations): SocialAssistanceResponseWithRelation => {
		return {
			id: socialAssistance.id,
			thumbnail: socialAssistance.thumbnail,
			name: socialAssistance.name,
			category: socialAssistance.category,
			amount: socialAssistance.amount,
			provider: socialAssistance.provider,
			description: socialAssistance.description,
			is_active: socialAssistance.is_active,
			image: socialAssistance.image && socialAssistance.image,
			social_assistance_recipient: socialAssistance.social_assistance_recipient,
			social_assistance_recipient_count: socialAssistance._count.social_assistance_recipient,

			created_at: socialAssistance.created_at,
			updated_at: socialAssistance.updated_at,
		};
	},

	toSocialAssistanceResponsesWithRelation: (socialAssistances: SocialAssistanceWithRelations[]): SocialAssistanceResponseWithRelation[] => {
		return socialAssistances.map((socialAssistance) => ({
			id: socialAssistance.id,
			thumbnail: socialAssistance.thumbnail,
			name: socialAssistance.name,
			category: socialAssistance.category,
			amount: socialAssistance.amount,
			provider: socialAssistance.provider,
			description: socialAssistance.description,
			is_active: socialAssistance.is_active,

			image: socialAssistance.image && socialAssistance.image,
			social_assistance_recipient: socialAssistance.social_assistance_recipient && socialAssistance._count.social_assistance_recipient,

			created_at: socialAssistance.created_at,
			updated_at: socialAssistance.updated_at,
		}));
	},
};
