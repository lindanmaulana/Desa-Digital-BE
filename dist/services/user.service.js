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
const _1 = __importDefault(require("."));
const db_1 = require("../db");
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
const unauthorized_1 = require("../utils/errors/unauthorized");
const helpers_1 = __importDefault(require("../utils/helpers"));
const responses_1 = __importDefault(require("../utils/responses"));
const user_validation_1 = require("../utils/validations/user.validation");
const validation_1 = require("../utils/validations/validation");
class UserService {
    static registerStaff(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.REGISTERSTAFF, req);
            const checkEmailTaken = yield user_repository_1.UserRepository.isEmailTaken(validateFields.email);
            if (checkEmailTaken)
                throw new errors_1.BadrequestError("Email telah digunakan");
            const hashPassword = yield helpers_1.default.hashPassword(validateFields.password);
            const otp = helpers_1.default.generateOtp();
            const result = yield db_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g;
                const newUser = yield tx.user.create({
                    data: {
                        email: validateFields.email,
                        name: validateFields.name,
                        password: hashPassword,
                        role: "STAFF",
                        otp_code: otp,
                        otp_last_sen_at: new Date(),
                    }
                });
                const newStaff = yield tx.staff.create({
                    data: {
                        user_id: newUser.id,
                        profile_picture: (_a = validateFields.profile_picture) !== null && _a !== void 0 ? _a : "",
                        identity_number: (_b = validateFields.identity_number) !== null && _b !== void 0 ? _b : "",
                        gender: (_c = validateFields.gender) !== null && _c !== void 0 ? _c : undefined,
                        date_of_birth: (_d = validateFields.date_of_birth) !== null && _d !== void 0 ? _d : null,
                        phone_number: (_e = validateFields.phone_number) !== null && _e !== void 0 ? _e : "",
                        occupation: (_f = validateFields.occupation) !== null && _f !== void 0 ? _f : "",
                        marital_status: (_g = validateFields.marital_status) !== null && _g !== void 0 ? _g : undefined,
                    },
                });
                return { newUser, newStaff };
            }));
            if (!result)
                throw new errors_1.InternalServerError("Pendaftaran gagal, please try again later");
            yield _1.default.EmailService.SendOtpMail(result.newUser.email, result.newUser);
            return responses_1.default.userResponse.toUserResponse(result.newUser);
        });
    }
    static createHeadOfFamily(req) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static createFamilyMember() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static getProfile(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield user_repository_1.UserRepository.findById(user.id);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            return responses_1.default.userResponse.toUserResponse(checkUser);
        });
    }
    static getAll(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.GETALL, req);
            const hiddenRoles = [client_1.UserRole.ADMIN];
            const fullAccess = user.role === client_1.UserRole.ADMIN;
            let whereCondition = {};
            if (!fullAccess) {
                whereCondition = Object.assign(Object.assign({}, whereCondition), { role: {
                        notIn: hiddenRoles,
                    } });
            }
            if (validateFields.keyword) {
                whereCondition = Object.assign(Object.assign({}, whereCondition), { OR: [
                        {
                            name: {
                                contains: validateFields.keyword,
                                mode: "insensitive",
                            },
                        },
                    ] });
            }
            if (validateFields.is_active) {
                const isActive = validateFields.is_active === "true";
                whereCondition = Object.assign(Object.assign({}, whereCondition), { is_active: isActive });
            }
            if (validateFields.role && Object.values(client_1.UserRole).includes(validateFields.role)) {
                const searchRole = validateFields.role;
                whereCondition = Object.assign(Object.assign({}, whereCondition), { role: searchRole });
            }
            let conditionsCount = { where: whereCondition };
            const count = yield user_repository_1.UserRepository.findCount(conditionsCount);
            const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = helpers_1.default.getPagination({
                count,
                pageRequest: validateFields.page,
                limitRequest: validateFields.limit,
            });
            let conditionsFindMany = {
                where: whereCondition,
                skip: limit * (page - 1),
                take: limit,
                include: {
                    staff: true,
                },
            };
            const result = yield user_repository_1.UserRepository.findAll(conditionsFindMany);
            if (!result)
                throw new errors_1.InternalServerError("Gagal mengakses data user, please try again later!");
            return {
                data: responses_1.default.userResponse.toUserResponsesWithRelation(result),
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
            return responses_1.default.userResponse.toUserResponse(result);
        });
    }
    static update() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield user_repository_1.UserRepository.findById(id);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            if (checkUser.role === "ADMIN")
                throw new errors_1.NotfoundError("Pengguna tidak dapat di hapus");
            const result = yield user_repository_1.UserRepository.deleteById(checkUser.id);
            return responses_1.default.userResponse.toUserResponse(result);
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
            return responses_1.default.userResponse.toUserResponse(result);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map