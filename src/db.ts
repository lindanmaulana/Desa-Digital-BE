import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";
import { DATABASE_URL } from "./config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const pool = new Pool({connectionString: DATABASE_URL});
const adapter = new PrismaPg(pool)

export const prismaClient = new PrismaClient({
	adapter: adapter,
	log: [
		{
			emit: "event",
			level: "query",
		},
		{
			emit: "event",
			level: "error",
		},
		{
			emit: "event",
			level: "info",
		},
		{
			emit: "event",
			level: "warn",
		},
	],
});

const formatError = (e: any) => {
	return typeof e === "object" ? JSON.stringify(e, null, 2) : String(e);
};

prismaClient.$on("error", (e) => {
	logger.error(formatError(e));
});

prismaClient.$on("warn", (e) => {
	logger.warn(formatError(e));
});

prismaClient.$on("info", (e) => {
	logger.info(formatError(e));
});

prismaClient.$on("query", (e) => {
	logger.info(formatError(e));
});
