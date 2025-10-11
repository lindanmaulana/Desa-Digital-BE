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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
const responses_1 = __importDefault(require("../utils/responses"));
class UserService {
    static getAll(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let whereCondition = {};
            const hiddenRoles = [client_1.UserRole.ADMIN];
            const fullAccess = user.role === client_1.UserRole.ADMIN;
            if (!fullAccess)
                whereCondition = {
                    role: {
                        notIn: hiddenRoles
                    }
                };
            const result = yield user_repository_1.UserRepository.findAll(whereCondition);
            if (!result)
                throw new errors_1.InternalServerError("Gagal mengakses data user, please try again later!");
            return responses_1.default.toUserResponses(result);
        });
    }
    static getById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_repository_1.UserRepository.findById(id);
            if (!result)
                throw new errors_1.NotfoundError(`Pengguna tidak ditemukan`);
            if (user.role !== "ADMIN" && user.role !== "STAFF")
                if (result.role === "ADMIN" || result.role === "STAFF")
                    throw new errors_1.BadrequestError("Pengguna tidak ditemukan");
            return responses_1.default.toUserResponse(result);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield user_repository_1.UserRepository.findById(id);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            if (checkUser.role === "ADMIN")
                throw new errors_1.NotfoundError("Pengguna tidak dapat di hapus");
            const result = yield user_repository_1.UserRepository.deleteById(checkUser.id);
            return responses_1.default.toUserResponse(result);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map