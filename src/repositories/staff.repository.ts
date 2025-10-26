import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";

export class StaffRepository {
	static async create(args: Prisma.StaffCreateArgs) {
		return prismaClient.staff.create(args)
	}

	static async update(args: Prisma.StaffUpdateArgs) {
		return prismaClient.staff.update(args)
	}

	static async findByUserId(userId: string) {
		return prismaClient.staff.findFirst({
			where: {user_id: userId}
		})
	}
}
