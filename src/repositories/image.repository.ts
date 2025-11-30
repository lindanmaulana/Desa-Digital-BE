import { prismaClient } from "../db"

export const ImageRepository = {
	findById: async (id: string) => {
		return prismaClient.images.findUnique({
			where: {
				id: id
			}
		})
	},

	findByIdSocialAssistanceRecipient: async (id: string) => {
		return prismaClient.images.findFirst({
			where: {
				social_assistance_recipient_id: id
			}
		})
	}
}
