import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";

export class HeadOfFamilyRepository {
	static async update(args: Prisma.HeadOfFamilyUpdateArgs) {
		return prismaClient.headOfFamily.update(args)
	}

	static async findByUserId(userId: string) {
		return prismaClient.headOfFamily.findFirst({
			where: {user_id: userId}
		})
	}
}
