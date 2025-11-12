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
exports.EmailService = void 0;
const fs_1 = __importDefault(require("fs"));
const mustache_1 = __importDefault(require("mustache"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config");
const logging_1 = require("../../logging");
const errors_1 = require("../../utils/errors");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config_1.MAIL_USERNAME,
        pass: config_1.MAIL_PASSWORD,
    },
});
exports.EmailService = {
    SendOtpMails: (email, title, message, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const view = {
                user_name: data.name,
                otp_code: data.otp,
                title: title,
                description: message,
                app_name: "Desa Digital",
                app_website: "https://desadigital.com",
            };
            let template = fs_1.default.readFileSync("src/utils/views/example.html", "utf-8");
            const htmlOutput = mustache_1.default.render(template, view);
            yield transporter.sendMail({
                from: config_1.MAIL_USERNAME,
                to: email,
                subject: "Kode Verifikasi Akun Anda",
                html: htmlOutput,
            });
        }
        catch (err) {
            logging_1.logger.error(err);
            throw new errors_1.InternalServerError("Terjadi kesalahan sistem saat mengirim OTP, please try again later");
        }
    }),
    ResendOtpVerifyAccountMail: (email, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const view = {
                user_name: data.name,
                otp: data.otp,
                app_name: "Desa Digital",
                expiry_minutes: "15 menit",
                app_website: "https://desadigital.com",
            };
            let template = fs_1.default.readFileSync("src/utils/views/resend-otp-verify-account-mail.html", "utf-8");
            const htmlOutput = mustache_1.default.render(template, view);
            yield transporter.sendMail({
                from: config_1.MAIL_USERNAME,
                to: email,
                subject: "Kode Verifikasi Akun Anda",
                html: htmlOutput,
            });
        }
        catch (err) {
            logging_1.logger.error(err);
            throw new errors_1.InternalServerError("Terjadi kesalahan sistem saat mengirim OTP, please try again later");
        }
    }),
    SendTokenVerifyAccountMail: (email, token, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const view = {
                user_name: data.name,
                otp: data.otp,
                app_name: "Desa Digital",
                verification_link: `${config_1.BASEURL_CLIENT}?token=${token}`,
            };
            let template = fs_1.default.readFileSync("src/utils/views/verify-account-mail.html", "utf-8");
            const htmlOutput = mustache_1.default.render(template, view);
            yield transporter.sendMail({
                from: config_1.MAIL_USERNAME,
                to: email,
                subject: "Verifikasi Akun Anda",
                html: htmlOutput,
            });
        }
        catch (err) {
            logging_1.logger.error("Send verify-account mail", err);
            throw new errors_1.InternalServerError("Terjadi kesalahan sistem saat mengirim TOKEN, please try again later");
        }
    }),
    ResendTokenVerifyAccountMail: (email, token, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const view = {
                user_name: data.name,
                otp_code: data.otp,
                app_name: "Desa Digital",
                verification_link: `${config_1.BASEURL_CLIENT}?token=${token}`,
            };
            let template = fs_1.default.readFileSync("src/utils/views/verify-account-mail.html", "utf-8");
            const htmlOutput = mustache_1.default.render(template, view);
            yield transporter.sendMail({
                from: config_1.MAIL_USERNAME,
                to: email,
                subject: "Verifikasi Akun Anda",
                html: htmlOutput,
            });
        }
        catch (err) {
            logging_1.logger.error("Send verify-account mail", err);
            throw new errors_1.InternalServerError("Terjadi kesalahan sistem saat mengirim TOKEN, please try again later");
        }
    }),
    SendOtpForgotPasswordMail: (email, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const view = {
                user_name: data.name,
                otp: data.otp,
                app_name: "Desa Digital",
                expiry_minutes: "15 menit",
                app_website: "https://desadigital.com",
            };
            let template = fs_1.default.readFileSync("src/utils/views/forgot-password-otp-mail.html", "utf-8");
            const htmlOutput = mustache_1.default.render(template, view);
            yield transporter.sendMail({
                from: config_1.MAIL_USERNAME,
                to: email,
                subject: "Kode Reset Password Akun Anda",
                html: htmlOutput,
            });
        }
        catch (err) {
            logging_1.logger.error(err);
            throw new errors_1.InternalServerError("Terjadi kesalahan sistem saat mengirim OTP, please try again later");
        }
    }),
    ReSendOtpForgotPasswordMail: (email, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const view = {
                user_name: data.name,
                otp: data.otp,
                app_name: "Desa Digital",
                expiry_minutes: "15 menit",
                app_website: "https://desadigital.com",
            };
            let template = fs_1.default.readFileSync("src/utils/views/resend-forgot-password-otp-mail.html", "utf-8");
            const htmlOutput = mustache_1.default.render(template, view);
            yield transporter.sendMail({
                from: config_1.MAIL_USERNAME,
                to: email,
                subject: "Kode Reset Password Akun Anda",
                html: htmlOutput,
            });
        }
        catch (err) {
            logging_1.logger.error("Resend OTP forgot password", err);
            throw new errors_1.InternalServerError("Terjadi kesalahan sistem saat mengirim OTP, please try again later");
        }
    }),
    SendTokenForgotPasswordMail: (email, token, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const view = {
                user_name: data.name,
                otp: data.otp,
                app_name: "Desa Digital",
                expiry_minutes: "15 menit",
                app_website: "https://desadigital.com",
                reset_link: `${config_1.BASEURL_AUTHENTICATION}/forgot-password/reset?token=${token}`,
            };
            let template = fs_1.default.readFileSync("src/utils/views/forgot-password-token-mail.html", "utf-8");
            const htmlOutput = mustache_1.default.render(template, view);
            yield transporter.sendMail({
                from: config_1.MAIL_USERNAME,
                to: email,
                subject: "Kode Reset Password Akun Anda",
                html: htmlOutput,
            });
        }
        catch (err) {
            logging_1.logger.error("Send TOKEN forgot-password", err);
            throw new errors_1.InternalServerError("Terjadi kesalahan sistem saat mengirim TOKEN, please try again later");
        }
    }),
};
//# sourceMappingURL=email.service.js.map