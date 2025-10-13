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
exports.UserRepository = void 0;
const db_1 = require("../db");
class UserRepository {
    static findCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.count();
        });
    }
    static findAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.findMany(args);
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.findUnique({
                where: {
                    id,
                },
            });
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.prismaClient.user.findFirst({
                where: {
                    email: email,
                },
            });
            return user;
        });
    }
    static findUserForActivation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.findUnique({
                where: { id, is_active: false },
                select: { id: true, is_active: true, otp_code: true },
            });
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.create({
                data,
            });
        });
    }
    static updatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.update({
                where: {
                    id,
                },
                data: {
                    password,
                },
            });
        });
    }
    static updateIsFirstLogin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.update({
                where: { id, is_first_login: true },
                data: { is_first_login: false },
            });
        });
    }
    static updateIsActive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.update({
                where: { id, is_active: false },
                data: {
                    is_active: true,
                    otp_code: null,
                },
            });
        });
    }
    static updateOtp(id, otp_code) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.update({
                where: { id },
                data: {
                    otp_code,
                    otp_last_sen_at: new Date()
                }
            });
        });
    }
    static deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.deleteMany();
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.delete({
                where: {
                    id,
                },
            });
        });
    }
    static deleteOtp(id, is_active) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.user.update({
                where: { id },
                data: {
                    otp_code: null
                }
            });
        });
    }
    static isEmailTaken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield db_1.prismaClient.user.count({
                where: {
                    email,
                },
            });
            return count > 0;
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map