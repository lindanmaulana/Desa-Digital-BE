import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { prismaClient } from "../src/db";
import { logger } from "../src/logging";

const prisma = new PrismaClient()

async function main() {
	await prismaClient.user.deleteMany()

	const hashPassword = await bcrypt.hash("admin123", 10)

	await prismaClient.user.create({
		data: {
			name: "Admin Indonesia",
			email: "admin@gmail.com",
			password: hashPassword,
			is_active: true
		}
	})
}

main().catch((e) => {
	logger.error(e)
	console.error("Seeding Gagal")
	process.exit(1)
}).finally(async () => {
	await prisma.$disconnect()
	console.log("Seeding Selesai")
})
