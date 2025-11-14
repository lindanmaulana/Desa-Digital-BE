import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";

export class SocialAssistanceRepository {
	static async create(args: Prisma.SocialAssistanceCreateArgs) {
		return prismaClient.socialAssistance.create(args);
	}

	static async update(args: Prisma.SocialAssistanceUpdateArgs) {
		return prismaClient.socialAssistance.update(args)
	}

	static async findAll(args: Prisma.SocialAssistanceFindManyArgs) {
		return prismaClient.socialAssistance.findMany({
			where: args.where ?? {},
			include: {
				image: true,
				social_assistance_recipient: true,
				_count: {
					select: {
						social_assistance_recipient: true
					}
				}
			},
			skip: args.skip ?? 0,
			take: args.take ?? 5,
		})
	}

	static async findOne(id: string) {
		return prismaClient.socialAssistance.findFirst({
			where: {
				id: id
			},

			include: {
				image: true,
				social_assistance_recipient: {
					take: 3,
					skip: 0
				},

				_count: {
					select: {
						social_assistance_recipient: true
					}
				}
			},
		})
	}

	static async findCount(args: Prisma.SocialAssistanceCountArgs) {
		return prismaClient.socialAssistance.count(args)
	}

	static async isNameTaken(name: string) {
		const count = await prismaClient.socialAssistance.count({
			where: {
				name: {
					contains:name,
					mode: "insensitive"
				}
			}
		})

		return count > 0
	}
}
