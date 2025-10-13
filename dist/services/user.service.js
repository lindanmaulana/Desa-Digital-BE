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
const unauthorized_1 = require("../utils/errors/unauthorized");
const helpers_1 = __importDefault(require("../utils/helpers"));
const responses_1 = __importDefault(require("../utils/responses"));
const user_validation_1 = require("../utils/validations/user.validation");
const validation_1 = require("../utils/validations/validation");
const get_pagination_1 = require("../utils/helpers/get-pagination");
class UserService {
    static getProfile(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield user_repository_1.UserRepository.findById(user.id);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            return responses_1.default.toUserResponse(checkUser);
        });
    }
    static getAll(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.GETALL, req);
            const hiddenRoles = [client_1.UserRole.ADMIN];
            const fullAccess = user.role === client_1.UserRole.ADMIN;
            let whereCondition = {};
            if (!fullAccess)
                whereCondition = Object.assign(Object.assign({}, whereCondition), { role: {
                        notIn: hiddenRoles,
                    } });
            if (validateFields.keyword)
                whereCondition = Object.assign(Object.assign({}, whereCondition), { name: {
                        contains: validateFields.keyword,
                        mode: "insensitive",
                    } });
            if (validateFields.is_active) {
                const isActive = validateFields.is_active === "true";
                whereCondition = Object.assign(Object.assign({}, whereCondition), { is_active: isActive });
            }
            console.log({ Cek: validateFields.role });
            if (validateFields.role && Object.values(client_1.UserRole).includes(validateFields.role)) {
                const searchRole = validateFields.role;
                whereCondition = Object.assign(Object.assign({}, whereCondition), { role: searchRole });
            }
            let conditionsCount = { where: whereCondition };
            const count = yield user_repository_1.UserRepository.findCount(conditionsCount);
            const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = (0, get_pagination_1.getPagination)({
                count,
                pageRequest: validateFields.page,
                limitRequest: validateFields.limit,
            });
            let conditionsFindMany = {
                where: whereCondition,
                skip: limit * (page - 1),
                take: limit,
            };
            const result = yield user_repository_1.UserRepository.findAll(conditionsFindMany);
            if (!result)
                throw new errors_1.InternalServerError("Gagal mengakses data user, please try again later!");
            return {
                data: responses_1.default.toUserResponses(result),
                pagination: {
                    total_page: totalPage,
                    limit,
                    current_page: currentPage,
                    links,
                    next_page: nextPage,
                    prev_page: prevPage,
                },
            };
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
    static changePassword(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.CHANGEPASSWORD, req);
            if (validateFields.password !== validateFields.confirm_password)
                throw new errors_1.BadrequestError("Password dan Konfirm password tidak sama");
            const checkUser = yield user_repository_1.UserRepository.findById(user.id);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak di temukan");
            if (!checkUser.is_active)
                throw new unauthorized_1.UnauthorizedError("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun");
            const newHasPassword = yield helpers_1.default.hashPassword(validateFields.password);
            const result = yield user_repository_1.UserRepository.updatePassword(checkUser.id, newHasPassword);
            if (checkUser.is_first_login)
                yield user_repository_1.UserRepository.updateIsFirstLogin(checkUser.id);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            return responses_1.default.toUserResponse(result);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map