import { prismaClient } from "../db"

export const SocialAssistanceRecipientRepository = {
	findCountBySocialAssistanceId: async (id: string) => {
		return prismaClient.socialAssistanceRecipient.count({
			where: {
				social_assistance_id: id
			}
		})
	}
}
