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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
const unauthorized_1 = require("../utils/errors/unauthorized");
const compare_password_1 = require("../utils/helpers/compare-password");
const create_token_1 = require("../utils/helpers/create-token");
const generate_otp_1 = require("../utils/helpers/generate-otp");
const user__response_1 = require("../utils/helpers/responses/user.,response");
const user_validation_1 = require("../utils/validations/user.validation");
const validation_1 = require("../utils/validations/validation");
const email_service_1 = require("./email.service");
const logging_1 = require("../logging");
class UserService {
    static signup(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.SIGNUP, req);
            const checkEmailUser = yield user_repository_1.UserRepository.isEmailTaken(validateFields.email);
            if (checkEmailUser)
                throw new errors_1.BadrequestError("Email telah di gunakan");
            const hashPassword = yield bcrypt_1.default.hash(validateFields.password, 10);
            const otp = (0, generate_otp_1.generateOtp)();
            const result = yield user_repository_1.UserRepository.create(Object.assign(Object.assign({}, validateFields), { password: hashPassword, otp_code: otp }));
            if (!result)
                throw new errors_1.InternalServerError("Pendaftaran gagal, please try again later!");
            const checkEmail = yield email_service_1.EmailService.SendOtpMail(result.email, result);
            logging_1.logger.info({ checkEmail });
            return (0, user__response_1.toUserResponse)(result);
        });
    }
    static signin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.SIGNIN, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(validateFields.email);
            if (!checkUser)
                throw new unauthorized_1.UnauthorizedError("Invalid credentials");
            yield (0, compare_password_1.comparePassword)(validateFields.password, checkUser.password);
            const token = (0, create_token_1.createToken)(checkUser);
            return Object.assign(Object.assign({}, checkUser), { token });
        });
    }
    static changePassword(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.CHANGEPASSWORD, req);
            if (validateFields.password !== validateFields.confirmPassword)
                throw new errors_1.BadrequestError("Password dan Konfirm password tidak sama");
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_repository_1.UserRepository.findAll();
            if (!result)
                throw new errors_1.InternalServerError("Gagal mengakses data user, please try again later!");
            return (0, user__response_1.toUserResponses)(result);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_repository_1.UserRepository.findById(id);
            if (!result)
                throw new errors_1.NotfoundError(`Pengguna tidak ditemukan`);
            return (0, user__response_1.toUserResponse)(result);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield user_repository_1.UserRepository.findById(id);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            const result = yield user_repository_1.UserRepository.deleteById(checkUser.id);
            return (0, user__response_1.toUserResponse)(result);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map