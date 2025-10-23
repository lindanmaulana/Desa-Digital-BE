import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";

export class VillageProfileRepository {
	static async create(args: Prisma.ProfileCreateArgs) {
		return prismaClient.profile.create(args)
	}

	static async findOne() {
		return prismaClient.profile.findFirst({
			take: 1,
		})
	}

	static async findById(id: string) {
		return prismaClient.profile.findUnique({
			where: {id}
		})
	}

	static async update(args: Prisma.ProfileUpdateArgs) {
		return prismaClient.profile.update(args)
	}

	static async checkCount() {
		const count = await prismaClient.profile.count()

		return count > 0
	}

	static async isTakenProfileName(name: string) {
		const result = await prismaClient.profile.count({
			where: {
				name: {
					contains: name,
					mode: "insensitive"
				}
			}
		})

		return result > 0
	}
}
