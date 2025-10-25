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
const config_1 = require("../config");
const logging_1 = require("../logging");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config_1.MAIL_USERNAME,
        pass: config_1.MAIL_PASSWORD,
    },
});
class EmailService {
    static SendOtpMail(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const view = {
                    user_name: data.name,
                    otp_code: data.otp_code,
                    app_name: "Desa Digital",
                    app_website: "https://desadigital.com",
                };
                let template = fs_1.default.readFileSync("src/utils/views/otp-mail.html", "utf-8");
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
            }
        });
    }
    static SendVerifyAccountMail(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const view = {
                    user_name: data.name,
                    otp_code: data.otp_code,
                    app_name: "Desa Digital",
                    verification_link: `${config_1.BASEURL_CLIENT}?${email}`,
                };
                let template = fs_1.default.readFileSync("src/utils/views/verify-account-mail.html", "utf-8");
                const htmlOutput = mustache_1.default.render(template, view);
                yield transporter.sendMail({
                    from: config_1.MAIL_USERNAME,
                    to: email,
                    subject: "Verifikasi Akun Anda",
                    html: htmlOutput
                });
            }
            catch (err) {
                logging_1.logger.error("Send verify-account mail", err);
            }
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map