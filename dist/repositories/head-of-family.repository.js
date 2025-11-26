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
exports.HeadOfFamilyRepository = void 0;
const db_1 = require("../db");
class HeadOfFamilyRepository {
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.headOfFamily.findUnique({
                where: { id },
            });
        });
    }
    static findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.headOfFamily.findFirst({
                where: { user_id: userId },
            });
        });
    }
    static findAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            return db_1.prismaClient.headOfFamily.findMany({
                where: (_a = args.where) !== null && _a !== void 0 ? _a : {},
                skip: (_b = args.skip) !== null && _b !== void 0 ? _b : 0,
                take: (_c = args.take) !== null && _c !== void 0 ? _c : 5,
                orderBy: Object.assign({}, args.orderBy),
                include: {
                    user: {
                        omit: {
                            password: true,
                            otp: true,
                            otp_last_sen_at: true,
                            otp_purpose: true,
                            reset_token: true,
                            reset_token_last_sen_at: true,
                            verify_token: true,
                            verify_token_last_sen_at: true,
                        },
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
                    social_assistance_recipient: true,
                },
            });
        });
    }
    static findByIdDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.headOfFamily.findFirst({
                where: {
                    id: id,
                },
                include: {
                    user: {
                        omit: {
                            password: true,
                            otp: true,
                            otp_last_sen_at: true,
                            otp_purpose: true,
                            reset_token: true,
                            reset_token_last_sen_at: true,
                            verify_token: true,
                            verify_token_last_sen_at: true,
                        },
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
                    social_assistance_recipient: {
                        take: 3,
                        orderBy: {
                            created_at: "asc",
                        },
                    },
                },
            });
        });
    }
    static findCount(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.headOfFamily.count(args);
        });
    }
    static update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.headOfFamily.update(args);
        });
    }
    static deleteByIdUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.delete({
                where: { id },
            });
        });
    }
}
exports.HeadOfFamilyRepository = HeadOfFamilyRepository;
//# sourceMappingURL=head-of-family.repository.js.map