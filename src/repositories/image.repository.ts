import { prismaClient } from "../db"
import { TypeImageCreateSchema, TypeImageUpdateSchema } from "../utils/validations/image.validation"

export const ImageRepository = {
	create: async (req: TypeImageCreateSchema) => {
		return prismaClient.images.create({
			data: {
				path: req.path,
				filename: req.filename,
				entity_type: req.entity,
			}
		})
	},

	createBySocialAssistance: async (req: TypeImageCreateSchema) => {
		return prismaClient.images.create({
			data: {
				social_assistance_id: req.social_assistance_id,
				path: req.path,
				filename: req.filename,
				entity_type: req.entity,
			}
		})
	},

	findById: async (id: string) => {
		return prismaClient.images.findUnique({
			where: {
				id: id
			}
		})
	},

	findCountByProfileId: async (profileId: string) => {
		return prismaClient.images.count({
			where: {
				profile_id: profileId
			}
		})
	},

	findByUserId: async (userId: string) => {
		return prismaClient.images.findFirst({
			where: {
				user_id: userId
			}
		})
	},

	findBySocialAssistanceId: async (socialAssistanceId: string) => {
		return prismaClient.images.findFirst({
			where: {
				social_assistance_id: socialAssistanceId
			}
		})
	},

	findByIdSocialAssistanceRecipient: async (id: string) => {
		return prismaClient.images.findFirst({
			where: {
				social_assistance_recipient_id: id
			}
		})
	},

	update: async (req: TypeImageUpdateSchema) => {
		return prismaClient.images.update({
			where: {
				id: req.id
			},

			data: {
				path: req.path,
				filename: req.filename
			}
		})
	}
}
