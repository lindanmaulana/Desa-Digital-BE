"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffRepository = void 0;
const db_1 = require("../db");
const user_repository_1 = require("./user.repository");
exports.StaffRepository = {
    findAll: (args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        return db_1.prismaClient.staff.findMany({
            where: (_a = args.where) !== null && _a !== void 0 ? _a : {},
            skip: (_b = args.skip) !== null && _b !== void 0 ? _b : 0,
            take: (_c = args.take) !== null && _c !== void 0 ? _c : 5,
            orderBy: Object.assign({}, args.orderBy),
            include: {
                user: {
                    omit: user_repository_1.USER_OMIT,
                    include: {
                        image: {
                            select: {
                                id: true,
                                filename: true,
                                path: true,
                                entity_type: true,
                                user_id: true,
                                created_at: true,
                                updated_at: true,
                            },
                        },
                    },
                },
            },
        });
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.staff.findUnique({
            where: {
                id: id
            }
        });
    }),
    findDetailById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.staff.findFirst({
            where: {
                id: id,
            },
            include: {
                user: {
                    omit: user_repository_1.USER_OMIT,
                    include: {
                        image: {
                            select: {
                                id: true,
                                filename: true,
                                path: true,
                                entity_type: true,
                                user_id: true,
                                created_at: true,
                                updated_at: true,
                            },
                        },
                    },
                },
            },
        });
    }),
    findByUserId: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.staff.findFirst({
            where: { user_id: userId }
        });
    }),
    findCount: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.staff.count(args);
    }),
    create: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.staff.create(args);
    }),
    update: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.staff.update(args);
    }),
};
//# sourceMappingURL=staff.repository.js.map