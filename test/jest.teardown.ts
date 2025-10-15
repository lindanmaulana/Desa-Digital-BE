import { prismaClient } from "../src/db"
import { logger } from "../src/logging"

export default async () => {
	logger.info("Connection prisma disconnect")
	await prismaClient.$disconnect()
}
