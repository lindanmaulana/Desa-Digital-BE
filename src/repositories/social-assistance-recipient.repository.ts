import { Prisma } from "@prisma/client"
import { prismaClient } from "../db"
import { TypeSocialAssistanceRecipientCreateSchema, TypeSocialAssistanceRecipientUpdateSchema } from "../utils/validations"

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

	findById: async (id: string) => {
		return prismaClient.socialAssistanceRecipient.findUnique({
			where: {id: id}
		})
	},

	findDetailById: async (id: string) => {
		return prismaClient.socialAssistanceRecipient.findUnique({
			where: {id: id},
			include: {
				image: {
					select: {
						id: true,
						path: true,
						filename: true,
						social_assistance_recipient_id: true,
						entity_type: true
					}
				},

				social_assistance: {
					select: {
						id: true,
						thumbnail: true,
						name: true,
						category: true,
						amount: true,
						provider: true,
						is_active: true,
						description: true,
						image: {
							select: {
								id: true,
								path: true,
								filename: true,
								social_assistance_id: true,
								entity_type: true,
							}
						},
					}
				},

				head_of_family: {
					select: {
						id: true,
						identity_number: true,
						occupation: true,
						user: {
							select: {
								id: true,
								name: true,
								image: {
									select: {
										id: true,
										path: true,
										filename: true,
										user_id: true,
										entity_type: true
									}
								},
							}
						},

						_count: {
							select: {
								family_member: true
							}
						}
					}
				}
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
	},

	create: async (headOfFamilyId: string, req: TypeSocialAssistanceRecipientCreateSchema) => {
		return prismaClient.socialAssistanceRecipient.create({
			data: {
				social_assistance_id: req.social_assistance_id,
				head_of_family_id: headOfFamilyId,
				amount: req.amount,
				reason: req.reason,
				bank: req.bank,
				account_number: req.account_number,
				account_name: req.account_name
			}
		})
	},

	updateStatus: async (id: string, req: TypeSocialAssistanceRecipientUpdateSchema) => {
		return prismaClient.socialAssistanceRecipient.update({
			where: {
				id: id
			},

			data: {
				status: req.status
			}
		})
	}
}
