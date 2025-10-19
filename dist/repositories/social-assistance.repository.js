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
    static findAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            return db_1.prismaClient.socialAssistance.findMany({
                where: (_a = args.where) !== null && _a !== void 0 ? _a : {},
                skip: (_b = args.skip) !== null && _b !== void 0 ? _b : 0,
                take: (_c = args.take) !== null && _c !== void 0 ? _c : 5,
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
                        mode: "insensitive"
                    }
                }
            });
            return count > 0;
        });
    }
}
exports.SocialAssistanceRepository = SocialAssistanceRepository;
//# sourceMappingURL=social-assistance.repository.js.map