import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";

export const StaffRepository = {
	findAll: async (args: Prisma.StaffFindManyArgs) => {
		return prismaClient.staff.findMany({
			where: args.where ?? {},
			skip: args.skip ?? 0,
			take: args.take ?? 5,
			orderBy: {
				...args.orderBy,
			},

			include: {
				user: {
					omit: {
						password: true,
						otp: true,
						otp_last_sen_at: true,
						otp_purpose: true,
						reset_token: true,
						reset_token_last_sen_at: true,
						verify_token: true,
						verify_token_last_sen_at: true,
					},

					include: {
						image: {
							select: {
								id: true,
								filename: true,
								path: true,
								entity_type: true,
								user_id: true,
								created_at: true,
								updated_at: true,
							},
						},
					},
				},
			},
		});
	},

	findByUserId: async (userId: string) => {
		return prismaClient.staff.findFirst({
			where: {user_id: userId}
		})
	},

	findCount: async (args: Prisma.StaffCountArgs) => {
		return prismaClient.staff.count(args)
	},

	create: async (args: Prisma.StaffCreateArgs) => {
		return prismaClient.staff.create(args)
	},

	update: async (args: Prisma.StaffUpdateArgs) => {
		return prismaClient.staff.update(args)
	},


}
