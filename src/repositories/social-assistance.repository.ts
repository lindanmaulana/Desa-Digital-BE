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
			skip: args.skip ?? 0,
			take: args.take ?? 5,
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
