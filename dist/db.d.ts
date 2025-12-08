import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
export declare const prismaClient: PrismaClient<{
    adapter: PrismaPg;
    log: ({
        emit: "event";
        level: "query";
    } | {
        emit: "event";
        level: "error";
    } | {
        emit: "event";
        level: "info";
    } | {
        emit: "event";
        level: "warn";
    })[];
}, "error" | "info" | "query" | "warn", $Extensions.DefaultArgs>;
//# sourceMappingURL=db.d.ts.map