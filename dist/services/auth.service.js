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
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
const many_request_1 = require("../utils/errors/many-request");
const unauthenticated_1 = require("../utils/errors/unauthenticated");
const unauthorized_1 = require("../utils/errors/unauthorized");
const helpers_1 = __importDefault(require("../utils/helpers"));
const create_token_1 = require("../utils/helpers/create-token");
const create_token_verification_1 = require("../utils/helpers/create-token-verification");
const generate_otp_1 = require("../utils/helpers/generate-otp");
const responses_1 = __importDefault(require("../utils/responses"));
const auth_validation_1 = require("../utils/validations/auth.validation");
const validation_1 = require("../utils/validations/validation");
const RESEND_COOLDOWN_SECONDS = 60;
class AuthService {
    static signup(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.SIGNUP, req);
            const checkEmailUser = yield user_repository_1.UserRepository.isEmailTaken(validateFields.email);
            if (checkEmailUser)
                throw new errors_1.BadrequestError("Email telah di gunakan");
            const hashPassword = yield helpers_1.default.hashPassword(validateFields.password);
            const otp = helpers_1.default.generateOtp();
            const result = yield user_repository_1.UserRepository.create({
                data: Object.assign(Object.assign({}, validateFields), { password: hashPassword, otp_code: otp, otp_last_sen_at: new Date() }),
            });
            if (!result)
                throw new errors_1.InternalServerError("Pendaftaran gagal, please try again later!");
            yield _1.default.EmailService.SendOtpMail(result.email, result);
            return responses_1.default.userResponse.toUserResponse(result);
        });
    }
    static signin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.SIGNIN, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(validateFields.email);
            if (!checkUser)
                throw new unauthorized_1.UnauthorizedError("Invalid credentials");
            if (!checkUser.is_active)
                throw new errors_1.NeedActivation("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun", checkUser.email);
            const isPasswordValid = yield helpers_1.default.comparePassword(validateFields.password, checkUser.password);
            if (!isPasswordValid)
                throw new unauthorized_1.UnauthorizedError("Invalid credentials");
            const token = (0, create_token_1.createToken)(checkUser);
            return Object.assign(Object.assign({}, responses_1.default.userResponse.toUserResponse(checkUser)), { token });
        });
    }
    static activation(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.ACTIVATION, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(req.email);
            if (!checkUser)
                throw new unauthenticated_1.UnauthenticatedError("Email tidak valid atau pengguna telah terhapus");
            if (checkUser.is_active)
                throw new errors_1.BadrequestError("Akun anda sudah aktif");
            if (checkUser.otp_code !== validateFields.otp_code)
                throw new errors_1.BadrequestError("Kode OTP yang Anda masukan salah");
            const result = yield user_repository_1.UserRepository.updateIsActive(checkUser.id);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            return responses_1.default.userResponse.toUserResponse(result);
        });
    }
    static resendOtp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.RESENDOTP, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(validateFields.email);
            if (!checkUser)
                throw new errors_1.BadrequestError("Pengguna tidak ditemukan");
            if (checkUser.is_active)
                throw new errors_1.BadrequestError("Akun Anda sudah aktif, Tidak dapat mengirim kode OTP");
            if (checkUser.otp_last_sen_at) {
                const lastSentTime = checkUser.otp_last_sen_at.getTime();
                const currentTime = new Date().getTime();
                const timeElapsed = (currentTime - lastSentTime) / 1000;
                if (timeElapsed < RESEND_COOLDOWN_SECONDS) {
                    const remainingTime = Math.ceil(RESEND_COOLDOWN_SECONDS - timeElapsed);
                    throw new many_request_1.ManyRequestError(`Mohon tunggu ${remainingTime} detik sebelum meminta kode baru`);
                }
            }
            const newOtp = (0, generate_otp_1.generateOtp)();
            const valueOTP = Object.assign(Object.assign({}, checkUser), { otp_code: newOtp });
            const result = yield user_repository_1.UserRepository.updateOtp(checkUser.id, newOtp);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            yield _1.default.EmailService.ResendOtpMail(validateFields.email, valueOTP);
            return {
                email: result.email,
                otp_last_sent_at: new Date(),
                otp_expiry_seconds: RESEND_COOLDOWN_SECONDS
            };
        });
    }
    static forgotPassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.FORGOTPASSWORD, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(validateFields.email);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            const newOtp = (0, generate_otp_1.generateOtp)();
            const valueOTP = Object.assign(Object.assign({}, checkUser), { otp_code: newOtp });
            const result = yield user_repository_1.UserRepository.updateOtp(checkUser.id, newOtp);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            yield _1.default.EmailService.SendOtpMail(validateFields.email, valueOTP);
            return {
                email: result.email,
                otp_last_sent_at: new Date()
            };
        });
    }
    static matchOtp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.MATCHOTP, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(validateFields.email);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            if (validateFields.otp_code !== checkUser.otp_code)
                throw new errors_1.BadrequestError("Kode OTP yang anda masukan salah");
            const token = (0, create_token_verification_1.createTokenVerification)({ id: checkUser.id, email: checkUser.email, role: checkUser.role });
            yield user_repository_1.UserRepository.deleteOtp(checkUser.id, checkUser.is_active);
            return {
                verify_token: token,
            };
        });
    }
    static resetPassword(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.RESETPASSWORD, req);
            if (validateFields.password !== validateFields.confirm_password)
                throw new errors_1.BadrequestError("Password dan Konfirm Password tidak sama");
            const checkUser = yield user_repository_1.UserRepository.findByEmail(user.email);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            const result = yield user_repository_1.UserRepository.updatePassword(checkUser.id, validateFields.password);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            return responses_1.default.userResponse.toUserResponse(result);
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map