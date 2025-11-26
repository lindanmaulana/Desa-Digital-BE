import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";

export const SocialAssistanceRepository = {
	create: async (args: Prisma.SocialAssistanceCreateArgs) => {
		return prismaClient.socialAssistance.create(args);
	},

	update: async (args: Prisma.SocialAssistanceUpdateArgs) => {
		return prismaClient.socialAssistance.update(args);
	},

	findById: async (id: string) => {
		return prismaClient.socialAssistance.findUnique({
			where: { id },
		});
	},

	findAll: async (args: Prisma.SocialAssistanceFindManyArgs) => {
		return prismaClient.socialAssistance.findMany({
			where: args.where ?? {},
			include: {
				image: true,
				_count: {
					select: {
						social_assistance_recipient: true,
					},
				},
			},
			skip: args.skip ?? 0,
			take: args.take ?? 5,
			orderBy: {
				...args.orderBy,
			},
		});
	},

	findOne: async (id: string) => {
		return prismaClient.socialAssistance.findFirst({
			where: {
				id: id,
			},

			include: {
				image: true,
				social_assistance_recipient: {
					take: 3,
					select: {
						id: true,
						amount: true,
						status: true,
						head_of_family: {
							select: {
								id: true,
								user: {
									select: {
										id: true,
										name: true,
									},
								},
							},
						},
						created_at: true,
						updated_at: true,
					},
				},

				_count: {
					select: {
						social_assistance_recipient: true,
					},
				},
			},
		});
	},

	findCount: async (args: Prisma.SocialAssistanceCountArgs) => {
		return prismaClient.socialAssistance.count(args);
	},

	isNameTaken: async (name: string) => {
		const count = await prismaClient.socialAssistance.count({
			where: {
				name: {
					contains: name,
					mode: "insensitive",
				},
			},
		});

		return count > 0;
	},

	delete: async (id: string) => {
		return prismaClient.socialAssistance.delete({
			where: { id },
		});
	},
};
