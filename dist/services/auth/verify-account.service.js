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
exports.VerifyAccountAuthService = void 0;
const _1 = require(".");
const repositories_1 = require("../../repositories");
const errors_1 = require("../../utils/errors");
const many_request_1 = require("../../utils/errors/many-request");
const unauthenticated_1 = require("../../utils/errors/unauthenticated");
const generate_otp_1 = require("../../utils/helpers/generate-otp");
const generate_uuid_1 = require("../../utils/helpers/generate-uuid");
const create_jwt_1 = require("../../utils/helpers/jwt/create-jwt");
const create_token_verify_account_1 = require("../../utils/helpers/jwt/create-token-verify-account");
const responses_1 = require("../../utils/responses");
const auth_validation_1 = require("../../utils/validations/auth.validation");
const validation_1 = require("../../utils/validations/validation");
const email_service_1 = require("../utilities/email.service");
exports.VerifyAccountAuthService = {
    verifyAccount: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.VERIFYACCOUNT, req);
        const payload = (0, create_jwt_1.isTokenValid)({ token: validateFields.token });
        if (payload.type !== "VERIFY_ACCOUNT")
            throw new errors_1.ForbiddenError("Token is valid but not authorized for verify account");
        const checkUser = yield repositories_1.UserRepository.findByEmail(payload.email);
        if (!checkUser)
            throw new unauthenticated_1.UnauthenticatedError("Email tidak valid atau pengguna telah terhapus");
        if (checkUser.is_active)
            throw new errors_1.BadrequestError("Akun anda sudah aktif");
        if (payload.jti !== checkUser.verify_token)
            throw new errors_1.BadrequestError("Token tidak valid");
        if (checkUser.otp !== validateFields.otp_code)
            throw new errors_1.BadrequestError("Kode OTP yang Anda masukan salah");
        const result = yield repositories_1.UserRepository.updateIsActive(checkUser.id);
        if (!result)
            throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
        return responses_1.toUserResponse.response(result);
    }),
    resendOtpVerifyAccount: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.RESENDOTP, req);
        const payloadToken = (0, create_jwt_1.isTokenValid)({ token: validateFields.token });
        const checkUser = yield repositories_1.UserRepository.findByEmail(payloadToken.email);
        if (!checkUser)
            throw new errors_1.BadrequestError("Pengguna tidak ditemukan");
        if (checkUser.is_active)
            throw new errors_1.BadrequestError("Akun Anda sudah aktif, Tidak dapat mengirim kode OTP");
        if (checkUser.otp_last_sen_at) {
            const lastSentTime = checkUser.otp_last_sen_at.getTime();
            const currentTime = new Date().getTime();
            const timeElapsed = (currentTime - lastSentTime) / 1000;
            if (timeElapsed < _1.RESEND_COOLDOWN_SECONDS) {
                const remainingTime = Math.ceil(_1.RESEND_COOLDOWN_SECONDS - timeElapsed);
                throw new many_request_1.ManyRequestError(`Mohon tunggu ${remainingTime} detik sebelum meminta kode baru`);
            }
        }
        const newOtp = (0, generate_otp_1.generateOtp)();
        const valueOTP = Object.assign(Object.assign({}, checkUser), { otp: newOtp });
        const result = yield repositories_1.UserRepository.updateOtp(checkUser.id, newOtp, "ACTIVATION");
        if (!result)
            throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
        yield email_service_1.EmailService.ResendOtpVerifyAccountMail(checkUser.email, valueOTP);
        return {
            email: result.email,
            otp_last_sent_at: new Date(),
            otp_expiry_seconds: _1.RESEND_COOLDOWN_SECONDS,
        };
    }),
    resendTokenVerifyAccount: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.RESENDVERIFYACCOUNTTOKEN, req);
        const checkUser = yield repositories_1.UserRepository.findByEmail(validateFields.email);
        if (!checkUser)
            throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
        if (checkUser.is_active)
            throw new errors_1.BadrequestError("Akun anda sudah aktif");
        if (checkUser.verify_token_last_sen_at) {
            const lastSentTime = checkUser.verify_token_last_sen_at.getTime();
            const currentTime = new Date().getTime();
            const timeElapsed = (currentTime - lastSentTime) / 1000;
            if (timeElapsed < _1.RESEND_COOLDOWN_SECONDS) {
                const remainingTime = Math.ceil(_1.RESEND_COOLDOWN_SECONDS - timeElapsed);
                throw new many_request_1.ManyRequestError(`Mohon tunggu ${remainingTime} detik sebelum meminta link verifikasi baru`);
            }
        }
        const jti = (0, generate_uuid_1.generateUUID)();
        const verify_token = (0, create_token_verify_account_1.createTokenVerifyAccount)({
            user_id: checkUser.id,
            jti,
            email: checkUser.email,
            role: checkUser.role,
            type: "VERIFY_ACCOUNT",
        });
        const result = yield repositories_1.UserRepository.updateVerifyToken(checkUser.id, jti);
        if (!result)
            throw new errors_1.InternalServerError("Gagal memperbarui token verifikasi, pleaset try again later");
        yield email_service_1.EmailService.ResendTokenVerifyAccountMail(result.email, verify_token, result);
        return {
            verify_token_last_sen_at: result.verify_token_last_sen_at,
        };
    }),
};
//# sourceMappingURL=verify-account.service.js.map