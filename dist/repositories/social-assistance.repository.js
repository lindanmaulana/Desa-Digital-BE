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
exports.SocialAssistanceRepository = void 0;
const db_1 = require("../db");
class SocialAssistanceRepository {
    static create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.socialAssistance.create(args);
        });
    }
    static update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.socialAssistance.update(args);
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.socialAssistance.findUnique({
                where: { id }
            });
        });
    }
    static findAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            return db_1.prismaClient.socialAssistance.findMany({
                where: (_a = args.where) !== null && _a !== void 0 ? _a : {},
                include: {
                    image: true,
                    _count: {
                        select: {
                            social_assistance_recipient: true,
                        },
                    },
                },
                skip: (_b = args.skip) !== null && _b !== void 0 ? _b : 0,
                take: (_c = args.take) !== null && _c !== void 0 ? _c : 5,
                orderBy: Object.assign({}, args.orderBy),
            });
        });
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.socialAssistance.findFirst({
                where: {
                    id: id,
                },
                include: {
                    image: true,
                    social_assistance_recipient: {
                        take: 3,
                        select: {
                            id: true,
                            amount: true,
                            status: true,
                            head_of_family: {
                                select: {
                                    id: true,
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                        },
                                    },
                                },
                            },
                            created_at: true,
                            updated_at: true,
                        },
                    },
                    _count: {
                        select: {
                            social_assistance_recipient: true,
                        },
                    },
                },
            });
        });
    }
    static findCount(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.socialAssistance.count(args);
        });
    }
    static isNameTaken(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield db_1.prismaClient.socialAssistance.count({
                where: {
                    name: {
                        contains: name,
                        mode: "insensitive",
                    },
                },
            });
            return count > 0;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.socialAssistance.delete({
                where: { id }
            });
        });
    }
}
exports.SocialAssistanceRepository = SocialAssistanceRepository;
//# sourceMappingURL=social-assistance.repository.js.map