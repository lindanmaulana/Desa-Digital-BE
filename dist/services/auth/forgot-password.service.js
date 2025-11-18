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
exports.ForgotPasswordAuthService = void 0;
const _1 = require(".");
const logging_1 = require("../../logging");
const repositories_1 = require("../../repositories");
const errors_1 = require("../../utils/errors");
const many_request_1 = require("../../utils/errors/many-request");
const generate_otp_1 = require("../../utils/helpers/generate-otp");
const generate_uuid_1 = require("../../utils/helpers/generate-uuid");
const create_jwt_1 = require("../../utils/helpers/jwt/create-jwt");
const create_token_reset_password_1 = require("../../utils/helpers/jwt/create-token-reset-password");
const responses_1 = require("../../utils/responses");
const auth_validation_1 = require("../../utils/validations/auth.validation");
const validation_1 = require("../../utils/validations/validation");
const email_service_1 = require("../utilities/email.service");
exports.ForgotPasswordAuthService = {
    forgotPassword: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.FORGOTPASSWORD, req);
        const checkUser = yield repositories_1.UserRepository.findByEmail(validateFields.email);
        if (!checkUser)
            throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
        if (!checkUser.is_active)
            throw new errors_1.BadrequestError("Akun anda belum aktif haraf aktivasi terlebih dahulu");
        const otp = (0, generate_otp_1.generateOtp)();
        const valueOTP = Object.assign(Object.assign({}, checkUser), { otp: otp });
        const result = yield repositories_1.UserRepository.updateOtp(checkUser.id, otp, "RESET_PASSWORD");
        if (!result)
            throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
        yield email_service_1.EmailService.SendOtpForgotPasswordMail(validateFields.email, valueOTP);
        return {
            email: result.email,
            otp_last_sent_at: new Date(),
        };
    }),
    resendOtpForgotPassword: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.FORGOTPASSWORD, req);
        const checkUser = yield repositories_1.UserRepository.findByEmail(validateFields.email);
        if (!checkUser)
            throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
        if (checkUser.otp_purpose === "RESET_PASSWORD" && checkUser.otp_last_sen_at) {
            const lastSentTime = checkUser.otp_last_sen_at.getTime();
            const currentTime = new Date().getTime();
            const timeElapsed = (currentTime - lastSentTime) / 1000;
            if (timeElapsed < _1.RESEND_COOLDOWN_SECONDS) {
                const remainingTime = Math.ceil(_1.RESEND_COOLDOWN_SECONDS - timeElapsed);
                throw new many_request_1.ManyRequestError(`Mohon tunggu ${remainingTime} detik sebelum meminta link verifikasi baru`);
            }
        }
        const otp = (0, generate_otp_1.generateOtp)();
        const valueOTP = Object.assign(Object.assign({}, checkUser), { otp: otp });
        const result = yield repositories_1.UserRepository.updateOtp(checkUser.id, otp, "RESET_PASSWORD");
        if (!result)
            throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
        yield email_service_1.EmailService.ReSendOtpForgotPasswordMail(validateFields.email, valueOTP);
        return {
            email: result.email,
            otp_last_sent_at: new Date(),
            otp_expiry_seconds: _1.RESEND_COOLDOWN_SECONDS,
        };
    }),
    verifyOtpForgotPassword: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.MATCHOTP, req);
        const checkUser = yield repositories_1.UserRepository.findByEmail(validateFields.email);
        if (!checkUser)
            throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
        if (validateFields.otp_code !== checkUser.otp)
            throw new errors_1.BadrequestError("Kode OTP yang anda masukan salah");
        const jti = (0, generate_uuid_1.generateUUID)();
        const result = yield repositories_1.UserRepository.updateResetToken(checkUser.id, jti);
        if (!result)
            throw new errors_1.InternalServerError("Terjadi kesalahan saat verifikasi otp anda, please try again later");
        const token = (0, create_token_reset_password_1.createTokenResetPassword)({
            user_id: checkUser.id,
            type: "RESET_PASSWORD",
            jti,
            email: checkUser.email,
            role: checkUser.role,
        });
        yield repositories_1.UserRepository.deleteOtp(checkUser.id);
        yield email_service_1.EmailService.SendTokenForgotPasswordMail(result.email, token, result);
        return {
            verify_token_last_sen_at: new Date(),
        };
    }),
    resetPassword: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.RESETPASSWORD, req);
        if (validateFields.password !== validateFields.confirm_password)
            throw new errors_1.BadrequestError("Password dan Konfirm Password tidak sama");
        const token = (0, create_jwt_1.isTokenValid)({ token: validateFields.token });
        const checkUser = yield repositories_1.UserRepository.findByEmail(token.email);
        if (!checkUser)
            throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
        const result = yield repositories_1.UserRepository.updatePassword(checkUser.id, validateFields.password);
        if (!result)
            throw new errors_1.InternalServerError("Terjadi kesalahan saat mengubah password anda, please try again later");
        const resultDeleteToken = yield repositories_1.UserRepository.deleteResetToken(result.id);
        if (!resultDeleteToken) {
            logging_1.logger.error("Gagal menghapus reset_token, dan reset_token_last_sen_at");
            throw new errors_1.InternalServerError("Terjadi kesalahan system, please try again later");
        }
        return responses_1.toUserResponse.response(result);
    }),
};
//# sourceMappingURL=forgot-password.service.js.map