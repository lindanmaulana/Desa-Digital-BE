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
exports.VillageProfileRepository = void 0;
const db_1 = require("../db");
class VillageProfileRepository {
    static create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.profile.create(args);
        });
    }
    static findOne() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.profile.findFirst({
                take: 1,
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.profile.findUnique({
                where: { id }
            });
        });
    }
    static update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.profile.update(args);
        });
    }
    static checkCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield db_1.prismaClient.profile.count();
            return count > 0;
        });
    }
    static isTakenProfileName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.prismaClient.profile.count({
                where: {
                    name: {
                        contains: name,
                        mode: "insensitive"
                    }
                }
            });
            return result > 0;
        });
    }
}
exports.VillageProfileRepository = VillageProfileRepository;
//# sourceMappingURL=village-profile.repository.js.map