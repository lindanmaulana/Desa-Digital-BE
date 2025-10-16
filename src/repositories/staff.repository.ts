import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";

export class StaffRepository {
	static async create(args: Prisma.StaffCreateArgs) {
		return prismaClient.staff.create(args)
	}
}
