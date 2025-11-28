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

// 	  id String @id @default(uuid())
//   thumbnail String? @db.VarChar()
//   name String @db.VarChar()
//   category CategorySocialAssistance
//   amount Decimal @db.Decimal(10, 2)
//   provider String @db.VarChar()
//   description String? @db.Text
//   is_active Boolean @db.Boolean @default(false)

//   created_at DateTime @default(now())
//   updated_at DateTime @updatedAt

//   social_assistance_recipient SocialAssistanceRecipient[]
//   image Images?

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
