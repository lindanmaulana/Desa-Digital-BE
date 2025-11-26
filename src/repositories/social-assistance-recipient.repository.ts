import { Prisma } from "@prisma/client"
import { prismaClient } from "../db"

export const SocialAssistanceRecipientRepository = {
	findAll: async (args: Prisma.SocialAssistanceRecipientFindManyArgs) => {
		return prismaClient.socialAssistanceRecipient.findMany({
			where: args.where ?? {},
			skip: args.skip ?? 0,
			take: args.take ?? 5,
			orderBy: {...args.orderBy},
			include: {
				head_of_family: {
					select: {
						id: true,
						user: {
							select: {
								id: true,
								name: true,
							}
						},
						occupation: true,
					}
				},
				
				social_assistance: {
					select: {
						id: true,
						name: true,
						provider: true,
						amount: true,
						is_active: true,
					}
				},
			}
		})
	},

	findCountBySocialAssistanceId: async (id: string) => {
		return prismaClient.socialAssistanceRecipient.count({
			where: {
				social_assistance_id: id
			}
		})
	},

	findCount: async (args: Prisma.SocialAssistanceRecipientCountArgs) => {
		return prismaClient.socialAssistanceRecipient.count(args)
	}
}
