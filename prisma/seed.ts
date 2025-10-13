import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prismaClient } from "../src/db";
import { logger } from "../src/logging";
import { generateFakeUser } from "../src/utils/factories/user.factory";

const prisma = new PrismaClient();

const NUMBERS_OF_USERS = 100;

async function main() {
	await prismaClient.user.deleteMany();

	// const hashPassword = await bcrypt.hash("admin123", 10)

	// await prismaClient.user.create({
	// 	data: {
	// 		name: "Admin Indonesia",
	// 		email: "admin@gmail.com",
	// 		password: hashPassword,
	// 		role: UserRole.ADMIN,
	// 		is_active: true,
	// 		is_first_login: false
	// 	}
	// })

	const userData = Array.from({ length: NUMBERS_OF_USERS }).map(() => {
		const user = generateFakeUser()

		return user
	});

	const result = await prisma.user.createMany({
		data: userData,
		skipDuplicates: true
	})

	logger.info(`Seeding selesai. Berhasil membuat ${result.count} user.`)
}

main()
	.catch((e) => {
		logger.error(e);
		console.error("Seeding Gagal");
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
		console.log("Seeding Selesai");
	});
