import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";
import { CreateStaffRequest } from "../models/staff.model";

export class StaffRepository {
	static async create(args: Prisma.StaffCreateArgs) {
		return prismaClient.staff.create(args)
	}
}
