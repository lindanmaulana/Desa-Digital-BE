import { SocialAssistance } from "@prisma/client";
import { SocialAssistanceResponse } from "../../models/social-assistance.model";

const toSocialAssistanceResponse = (socialAssistance: SocialAssistance): SocialAssistanceResponse => {
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
};

const toSocialAssistanceResponses = (socialAssistances: SocialAssistance[]): SocialAssistanceResponse[] => {
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
};

export default {toSocialAssistanceResponse, toSocialAssistanceResponses}
