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
const many_request_1 = require("../utils/errors/many-request");
const unauthenticated_1 = require("../utils/errors/unauthenticated");
const unauthorized_1 = require("../utils/errors/unauthorized");
const helpers_1 = __importDefault(require("../utils/helpers"));
const generate_otp_1 = require("../utils/helpers/generate-otp");
const generate_uuid_1 = require("../utils/helpers/generate-uuid");
const create_token_reset_password_1 = require("../utils/helpers/jwt/create-token-reset-password");
const create_token_user_1 = require("../utils/helpers/jwt/create-token-user");
const create_token_verify_account_1 = require("../utils/helpers/jwt/create-token-verify-account");
const responses_1 = __importDefault(require("../utils/responses"));
const user__response_1 = __importDefault(require("../utils/responses/user.,response"));
const auth_validation_1 = require("../utils/validations/auth.validation");
const validation_1 = require("../utils/validations/validation");
const email_service_1 = require("./email.service");
const RESEND_COOLDOWN_SECONDS = 60;
class AuthService {
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
            const token = (0, create_token_user_1.createTokenUser)(checkUser);
            return Object.assign(Object.assign({}, responses_1.default.userResponse.toUserResponse(checkUser)), { token });
        });
    }
    static verifyAccount(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.VERIFYACCOUNT, req);
            const payload = helpers_1.default.isTokenValid({ token: validateFields.token });
            if (payload.type !== "VERIFY_ACCOUNT")
                throw new errors_1.ForbiddenError("Token is valid but not authorized for verify account");
            const checkUser = yield user_repository_1.UserRepository.findByEmail(payload.email);
            if (!checkUser)
                throw new unauthenticated_1.UnauthenticatedError("Email tidak valid atau pengguna telah terhapus");
            if (checkUser.is_active)
                throw new errors_1.BadrequestError("Akun anda sudah aktif");
            if (payload.jti !== checkUser.verify_token)
                throw new errors_1.BadrequestError("Token tidak valid");
            if (checkUser.otp !== validateFields.otp_code)
                throw new errors_1.BadrequestError("Kode OTP yang Anda masukan salah");
            const result = yield user_repository_1.UserRepository.updateIsActive(checkUser.id);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            return responses_1.default.userResponse.toUserResponse(result);
        });
    }
    static resendOtpVerifyAccount(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.RESENDOTP, req);
            const payloadToken = helpers_1.default.isTokenValid({ token: validateFields.token });
            const checkUser = yield user_repository_1.UserRepository.findByEmail(payloadToken.email);
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
            const valueOTP = Object.assign(Object.assign({}, checkUser), { otp: newOtp });
            const result = yield user_repository_1.UserRepository.updateOtp(checkUser.id, newOtp, "ACTIVATION");
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            yield _1.default.EmailService.ResendOtpVerifyAccountMail(checkUser.email, valueOTP);
            return {
                email: result.email,
                otp_last_sent_at: new Date(),
                otp_expiry_seconds: RESEND_COOLDOWN_SECONDS,
            };
        });
    }
    static resendTokenVerifyAccount(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.RESENDVERIFYACCOUNTTOKEN, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(validateFields.email);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            if (checkUser.is_active)
                throw new errors_1.BadrequestError("Akun anda sudah aktif");
            if (checkUser.verify_token_last_sen_at) {
                const lastSentTime = checkUser.verify_token_last_sen_at.getTime();
                const currentTime = new Date().getTime();
                const timeElapsed = (currentTime - lastSentTime) / 1000;
                if (timeElapsed < RESEND_COOLDOWN_SECONDS) {
                    const remainingTime = Math.ceil(RESEND_COOLDOWN_SECONDS - timeElapsed);
                    throw new many_request_1.ManyRequestError(`Mohon tunggu ${remainingTime} detik sebelum meminta link verifikasi baru`);
                }
            }
            const jti = (0, generate_uuid_1.generateUUID)();
            const verify_token = (0, create_token_verify_account_1.createTokenVerifyAccount)({ user_id: checkUser.id, jti, email: checkUser.email, role: checkUser.role, type: "VERIFY_ACCOUNT" });
            const result = yield user_repository_1.UserRepository.updateVerifyToken(checkUser.id, jti);
            if (!result)
                throw new errors_1.InternalServerError("Gagal memperbarui token verifikasi, pleaset try again later");
            yield email_service_1.EmailService.ResendTokenVerifyAccountMail(result.email, verify_token, result);
            return {
                verify_token_last_sen_at: result.verify_token_last_sen_at
            };
        });
    }
    static forgotPassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.FORGOTPASSWORD, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(validateFields.email);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            if (!checkUser.is_active)
                throw new errors_1.BadrequestError("Akun anda belum aktif haraf aktivasi terlebih dahulu");
            const otp = (0, generate_otp_1.generateOtp)();
            const valueOTP = Object.assign(Object.assign({}, checkUser), { otp: otp });
            const result = yield user_repository_1.UserRepository.updateOtp(checkUser.id, otp, "RESET_PASSWORD");
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            yield _1.default.EmailService.SendOtpForgotPasswordMail(validateFields.email, valueOTP);
            return {
                email: result.email,
                otp_last_sent_at: new Date(),
            };
        });
    }
    static resendOtpForgotPassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.FORGOTPASSWORD, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(validateFields.email);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            if (checkUser.otp_purpose === "RESET_PASSWORD" && checkUser.otp_last_sen_at) {
                const lastSentTime = checkUser.otp_last_sen_at.getTime();
                const currentTime = new Date().getTime();
                const timeElapsed = (currentTime - lastSentTime) / 1000;
                if (timeElapsed < RESEND_COOLDOWN_SECONDS) {
                    const remainingTime = Math.ceil(RESEND_COOLDOWN_SECONDS - timeElapsed);
                    throw new many_request_1.ManyRequestError(`Mohon tunggu ${remainingTime} detik sebelum meminta link verifikasi baru`);
                }
            }
            const otp = (0, generate_otp_1.generateOtp)();
            const valueOTP = Object.assign(Object.assign({}, checkUser), { otp: otp });
            const result = yield user_repository_1.UserRepository.updateOtp(checkUser.id, otp, "RESET_PASSWORD");
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            yield _1.default.EmailService.ReSendOtpForgotPasswordMail(validateFields.email, valueOTP);
            return {
                email: result.email,
                otp_last_sent_at: new Date(),
                otp_expiry_seconds: RESEND_COOLDOWN_SECONDS
            };
        });
    }
    static verifyOtpForgotPassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.MATCHOTP, req);
            const checkUser = yield user_repository_1.UserRepository.findByEmail(validateFields.email);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            if (validateFields.otp_code !== checkUser.otp)
                throw new errors_1.BadrequestError("Kode OTP yang anda masukan salah");
            const jti = (0, generate_uuid_1.generateUUID)();
            const result = yield user_repository_1.UserRepository.updateResetToken(checkUser.id, jti);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan saat verifikasi otp anda, please try again later");
            const token = (0, create_token_reset_password_1.createTokenResetPassword)({ user_id: checkUser.id, type: "RESET_PASSWORD", jti, email: checkUser.email, role: checkUser.role });
            yield user_repository_1.UserRepository.deleteOtp(checkUser.id);
            yield email_service_1.EmailService.SendTokenForgotPasswordMail(result.email, token, result);
            return {
                verify_token_last_sen_at: new Date()
            };
        });
    }
    static resetPassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.RESETPASSWORD, req);
            if (validateFields.password !== validateFields.confirm_password)
                throw new errors_1.BadrequestError("Password dan Konfirm Password tidak sama");
            const token = helpers_1.default.isTokenValid({ token: validateFields.token });
            const checkUser = yield user_repository_1.UserRepository.findByEmail(token.email);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            const result = yield user_repository_1.UserRepository.updatePassword(checkUser.id, validateFields.password);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan saat mengubah password anda, please try again later");
            const resultDeleteToken = yield user_repository_1.UserRepository.deleteResetToken(result.id);
            if (!resultDeleteToken)
                logging_1.logger.error("Gagal menghapus reset_token, dan reset_token_last_sen_at");
            return user__response_1.default.toUserResponse(result);
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map