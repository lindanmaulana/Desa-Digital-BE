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
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../../../services");
class AuthController {
    static signin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield services_1.AuthService.signin(req.body);
                res.cookie("jwt", result.token, {
                    httpOnly: true,
                    // secure: process.env.NODE_ENV === ""
                    // secure: false,
                    maxAge: 1 * 24 * 60 * 60 * 1000,
                    // sameSite: "lax"
                });
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Login berhasil",
                    data: {
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        role: result.role,
                        is_active: result.is_active,
                        is_first_login: result.is_first_login,
                        created_at: result.created_at,
                        updated_at: result.updated_at,
                    },
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static verifyAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                const result = yield services_1.VerifyAccountAuthService.verifyAccount(reqBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Aktivasi akun berhasil",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static resendTokenVerifyAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                const result = yield services_1.VerifyAccountAuthService.resendTokenVerifyAccount(reqBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Link verifikasi telah dikirimkan. Cek email Anda.",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static resendOtpVerifyAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                const result = yield services_1.VerifyAccountAuthService.resendOtpVerifyAccount(reqBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Kode verifikasi telah dikirimkan. Cek email Anda.",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                const result = yield services_1.ForgotPasswordAuthService.forgotPassword(reqBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Kode verifikasi telah dikirimkan, Cek email Anda.",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static resendOtpForgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                const result = yield services_1.ForgotPasswordAuthService.resendOtpForgotPassword(reqBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Kode verifikasi telah dikirimkan ulang, Cek email Anda.",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static verifyOtpForgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                const result = yield services_1.ForgotPasswordAuthService.verifyOtpForgotPassword(reqBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Verifikasi berhasil, kode OTP anda benar",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                const result = yield services_1.ForgotPasswordAuthService.resetPassword(reqBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Password berhasil di ubah, harap login kembali",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map