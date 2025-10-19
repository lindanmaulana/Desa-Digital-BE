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
const helpers_1 = __importDefault(require("../utils/helpers"));
const responses_1 = __importDefault(require("../utils/responses"));
const user_validation_1 = require("../utils/validations/user.validation");
const validation_1 = require("../utils/validations/validation");
class UserService {
    static registerStaffAccount(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.REGISTERSTAFF, req);
            const checkEmailTaken = yield user_repository_1.UserRepository.isEmailTaken(validateFields.email);
            if (checkEmailTaken)
                throw new errors_1.BadrequestError("Email telah digunakan");
            const hashPassword = yield helpers_1.default.hashPassword(validateFields.password);
            const otp = helpers_1.default.generateOtp();
            const result = yield db_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const newUser = yield tx.user.create({
                    data: {
                        email: validateFields.email,
                        name: validateFields.name,
                        password: hashPassword,
                        role: "STAFF",
                        otp_code: otp,
                        otp_last_sen_at: new Date(),
                    },
                });
                const newStaff = yield tx.staff.create({
                    data: {
                        user_id: newUser.id,
                        profile_picture: validateFields.profile_picture,
                        identity_number: validateFields.identity_number,
                        gender: validateFields.gender,
                        date_of_birth: validateFields.date_of_birth,
                        phone_number: validateFields.phone_number,
                        occupation: validateFields.occupation,
                        marital_status: validateFields.marital_status,
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
    static registerHeadOfFamilyAccount(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.REGISTERHEADOFFAMILY, req);
            const checkEmailTaken = yield user_repository_1.UserRepository.isEmailTaken(validateFields.email);
            if (checkEmailTaken)
                throw new errors_1.BadrequestError("Email telah digunakan");
            const hashPassword = yield helpers_1.default.hashPassword(validateFields.password);
            const otp = helpers_1.default.generateOtp();
            const result = yield db_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const newUser = yield tx.user.create({
                    data: {
                        email: validateFields.email,
                        name: validateFields.name,
                        password: hashPassword,
                        role: "HEAD_OF_FAMILY",
                        otp_code: otp,
                        otp_last_sen_at: new Date(),
                    },
                });
                const newHeadOfFamily = yield tx.headOfFamily.create({
                    data: {
                        user_id: newUser.id,
                        profile_picture: validateFields.profile_picture,
                        identity_number: validateFields.identity_number,
                        gender: validateFields.gender,
                        date_of_birth: validateFields.date_of_birth,
                        phone_number: validateFields.phone_number,
                        occupation: validateFields.occupation,
                        marital_status: validateFields.marital_status,
                    },
                });
                return { newUser, newHeadOfFamily };
            }));
            if (!result)
                throw new errors_1.InternalServerError("Pendaftaran gagal, please try again later");
            yield _1.default.EmailService.SendOtpMail(result.newUser.email, result.newUser);
            return responses_1.default.userResponse.toUserResponse(result.newUser);
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
                        {
                            staff: {
                                identity_number: {
                                    contains: validateFields.keyword,
                                    mode: "insensitive",
                                },
                            },
                        },
                        {
                            head_of_family: {
                                identity_number: {
                                    contains: validateFields.keyword,
                                    mode: "insensitive",
                                },
                            },
                        },
                    ] });
            }
            if (validateFields.is_active) {
                whereCondition = Object.assign(Object.assign({}, whereCondition), { is_active: validateFields.is_active });
            }
            if (validateFields.role) {
                whereCondition = Object.assign(Object.assign({}, whereCondition), { role: validateFields.role });
            }
            let conditionsCount = { where: whereCondition };
            const count = yield user_repository_1.UserRepository.findCount(conditionsCount);
            const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = helpers_1.default.getPagination({
                count,
                pageRequest: validateFields.page,
                limitRequest: validateFields.limit,
            });
            let conditionsFindAll = {
                where: whereCondition,
                skip: limit * (page - 1),
                take: limit,
                include: {
                    staff: true,
                    head_of_family: true,
                },
                orderBy: {
                    created_at: "desc"
                }
            };
            const result = yield user_repository_1.UserRepository.findAll(conditionsFindAll);
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
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_repository_1.UserRepository.findById(id);
            if (!result)
                throw new errors_1.NotfoundError(`Pengguna tidak ditemukan`);
            if (result.role === "ADMIN")
                throw new errors_1.BadrequestError("Pengguna tidak ditemukan");
            return responses_1.default.userResponse.toUserResponseWithRelation(result);
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
            return responses_1.default.userResponse.toUserResponse(result);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map