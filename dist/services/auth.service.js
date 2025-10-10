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
exports.AuthService = void 0;
const _1 = __importDefault(require("."));
const logging_1 = require("../logging");
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
const unauthenticated_1 = require("../utils/errors/unauthenticated");
const unauthorized_1 = require("../utils/errors/unauthorized");
const helpers_1 = __importDefault(require("../utils/helpers"));
const create_token_1 = require("../utils/helpers/create-token");
const responses_1 = __importDefault(require("../utils/responses"));
const user__response_1 = require("../utils/responses/user.,response");
const user_validation_1 = require("../utils/validations/user.validation");
const validation_1 = require("../utils/validations/validation");
class AuthService {
    static signup(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.SIGNUP, req);
            const checkEmailUser = yield user_repository_1.UserRepository.isEmailTaken(validateFields.email);
            if (checkEmailUser)
                throw new errors_1.BadrequestError("Email telah di gunakan");
            const hashPassword = yield helpers_1.default.hashPassword(validateFields.password);
            const otp = helpers_1.default.generateOtp();
            const result = yield user_repository_1.UserRepository.create(Object.assign(Object.assign({}, validateFields), { password: hashPassword, otp_code: otp }));
            if (!result)
                throw new errors_1.InternalServerError("Pendaftaran gagal, please try again later!");
            const checkEmail = yield _1.default.EmailService.SendOtpMail(result.email, result);
            logging_1.logger.info({ checkEmail });
            return responses_1.default.toUserResponse(result);
        });
    }
    static signin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.SIGNIN, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(validateFields.email);
            if (!checkUser)
                throw new unauthorized_1.UnauthorizedError("Invalid credentialssssss");
            if (!checkUser.is_active)
                throw new errors_1.NeedActivation("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun", checkUser.email);
            const isPasswordValid = yield helpers_1.default.comparePassword(validateFields.password, checkUser.password);
            if (!isPasswordValid)
                throw new unauthorized_1.UnauthorizedError("Invalid credentials");
            const token = (0, create_token_1.createToken)(checkUser);
            return Object.assign(Object.assign({}, (0, user__response_1.toUserResponse)(checkUser)), { token });
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
    static activation(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_validation_1.UserValidation.ACTIVATION, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(req.email);
            if (!checkUser)
                throw new unauthenticated_1.UnauthenticatedError("Email tidak valid atau pengguna telah terhapus");
            const checkUserActivation = yield user_repository_1.UserRepository.findUserForActivation(checkUser.id);
            if (!checkUserActivation)
                throw new unauthenticated_1.UnauthenticatedError("Pengguna tidak di temukan");
            if (checkUserActivation.is_active)
                throw new errors_1.BadrequestError("Akun anda sudah aktif");
            if (checkUserActivation.otp_code !== validateFields.otp_code)
                throw new errors_1.BadrequestError("Kode OTP yang anda masukan salah");
            const result = yield user_repository_1.UserRepository.updateIsActive(checkUserActivation.id);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            return (0, user__response_1.toUserResponse)(result);
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map