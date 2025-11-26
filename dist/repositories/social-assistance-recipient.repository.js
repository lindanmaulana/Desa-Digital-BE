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
exports.SocialAssistanceRecipientRepository = void 0;
const db_1 = require("../db");
exports.SocialAssistanceRecipientRepository = {
    findAll: (args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        return db_1.prismaClient.socialAssistanceRecipient.findMany({
            where: (_a = args.where) !== null && _a !== void 0 ? _a : {},
            skip: (_b = args.skip) !== null && _b !== void 0 ? _b : 0,
            take: (_c = args.take) !== null && _c !== void 0 ? _c : 5,
            orderBy: Object.assign({}, args.orderBy),
            include: {
                head_of_family: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                            }
                        },
                        occupation: true,
                    }
                },
                social_assistance: {
                    select: {
                        id: true,
                        name: true,
                        provider: true,
                        amount: true,
                        is_active: true,
                    }
                },
            }
        });
    }),
    findCountBySocialAssistanceId: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.socialAssistanceRecipient.count({
            where: {
                social_assistance_id: id
            }
        });
    }),
    findCount: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.socialAssistanceRecipient.count(args);
    })
};
//# sourceMappingURL=social-assistance-recipient.repository.js.map