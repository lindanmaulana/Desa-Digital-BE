"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const logging_1 = require("./logging");
const config_1 = require("./config");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
if (!config_1.DATABASE_URL)
    throw new Error("DATABASE_URL is not set");
const pool = new pg_1.Pool({ connectionString: config_1.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
exports.prismaClient = new client_1.PrismaClient({
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
const formatError = (e) => {
    return typeof e === "object" ? JSON.stringify(e, null, 2) : String(e);
};
exports.prismaClient.$on("error", (e) => {
    logging_1.logger.error(formatError(e));
});
exports.prismaClient.$on("warn", (e) => {
    logging_1.logger.warn(formatError(e));
});
exports.prismaClient.$on("info", (e) => {
    logging_1.logger.info(formatError(e));
});
exports.prismaClient.$on("query", (e) => {
    logging_1.logger.info(formatError(e));
});
//# sourceMappingURL=db.js.map