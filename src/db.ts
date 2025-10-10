import {PrismaClient} from "@prisma/client"
import { logger } from "./logging"

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        },
    ]
})

const formatError = (e: any) => {
	return typeof e === "object" ? JSON.stringify(e, null, 2) : String(e)
}

prismaClient.$on("error", (e) => {
    logger.error(formatError(e))
})

prismaClient.$on("warn", (e) => {
    logger.warn(formatError(e))
})

prismaClient.$on("info", (e) => {
    logger.info(formatError(e))
})

prismaClient.$on("query", (e) => {
	logger.info(formatError(e))
})
