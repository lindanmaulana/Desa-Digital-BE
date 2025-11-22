import { SocialAssistance } from "@prisma/client";
import {
	SocialAssistanceResponse,
	SocialAssistanceWithRelation,
	SocialAssistanceWithRelationFull,
	SocialAssistanceWithRelationResponse,
} from "../../models/social-assistance.model";

export const toSocialAssistanceResponse = {
	response: (socialAssistance: SocialAssistance): SocialAssistanceResponse => {
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

	responses: (socialAssistances: SocialAssistance[]): SocialAssistanceResponse[] => {
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

	withRelationResponse: (socialAssistance: SocialAssistanceWithRelation): SocialAssistanceWithRelationResponse => {
		return {
			id: socialAssistance.id,
			thumbnail: socialAssistance.thumbnail,
			name: socialAssistance.name,
			category: socialAssistance.category,
			amount: socialAssistance.amount,
			provider: socialAssistance.provider,
			description: socialAssistance.description,
			is_active: socialAssistance.is_active,

			image: socialAssistance.image,
			social_assistance_recipient_count: socialAssistance._count.social_assistance_recipient,

			created_at: socialAssistance.created_at,
			updated_at: socialAssistance.updated_at,
		};
	},

	withRelationResponses: (socialAssistances: SocialAssistanceWithRelation[]): SocialAssistanceWithRelationResponse[] => {
		return socialAssistances.map((socialAssistance) => ({
			id: socialAssistance.id,
			thumbnail: socialAssistance.thumbnail,
			name: socialAssistance.name,
			category: socialAssistance.category,
			amount: socialAssistance.amount,
			provider: socialAssistance.provider,
			description: socialAssistance.description,
			is_active: socialAssistance.is_active,

			image: socialAssistance.image,
			social_assistance_recipient_count: socialAssistance._count.social_assistance_recipient,

			created_at: socialAssistance.created_at,
			updated_at: socialAssistance.updated_at,
		}));
	},

	withRelationFullResponse: (socialAssistance: SocialAssistanceWithRelationFull): SocialAssistanceWithRelationResponse => {
		return {
			id: socialAssistance.id,
			thumbnail: socialAssistance.thumbnail,
			name: socialAssistance.name,
			category: socialAssistance.category,
			amount: socialAssistance.amount,
			provider: socialAssistance.provider,
			description: socialAssistance.description,
			is_active: socialAssistance.is_active,

			image: socialAssistance.image,
			social_assistance_recipient: socialAssistance.social_assistance_recipient,
			social_assistance_recipient_count: socialAssistance._count.social_assistance_recipient,

			created_at: socialAssistance.created_at,
			updated_at: socialAssistance.updated_at,
		};
	},

	withRelationFullResponses: (socialAssistances: SocialAssistanceWithRelationFull[]): SocialAssistanceWithRelationResponse[] => {
		return socialAssistances.map((socialAssistance) => ({
			id: socialAssistance.id,
			thumbnail: socialAssistance.thumbnail,
			name: socialAssistance.name,
			category: socialAssistance.category,
			amount: socialAssistance.amount,
			provider: socialAssistance.provider,
			description: socialAssistance.description,
			is_active: socialAssistance.is_active,

			image: socialAssistance.image,
			social_assistance_recipient: socialAssistance.social_assistance_recipient,
			social_assistance_recipient_count: socialAssistance._count.social_assistance_recipient,

			created_at: socialAssistance.created_at,
			updated_at: socialAssistance.updated_at,
		}));
	},
};
