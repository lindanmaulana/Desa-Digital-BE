import { server } from "../src"
import { prismaClient } from "../src/db"
import { logger } from "../src/logging"

export default async () => {

	if (server) {
		await new Promise<void>((resolve) => {
			logger.info("Closing HTTP server")
			server.close(() => {
				resolve()
			})
		})
	}

	logger.info("Connection prisma disconnect")
	await prismaClient.$disconnect()

	if (typeof logger.close === "function") logger.close()
}
