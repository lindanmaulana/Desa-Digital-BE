"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = __importDefault(require("zod"));
class AuthValidation {
}
exports.AuthValidation = AuthValidation;
AuthValidation.SIGNUP = zod_1.default.object({
    name: zod_1.default.string().nonempty({ error: "Nama tidak boleh kosong!" }),
    email: zod_1.default.email({ error: "Email tidak valid!" }).nonempty({ error: "Email tidak boleh kosong!" }),
    password: zod_1.default.string().min(8, { error: "Password minimal 8 karakter" }),
});
AuthValidation.SIGNIN = zod_1.default.object({
    email: zod_1.default.email({ error: "Email tidak valid!" }).nonempty({ error: "Email tidak boleh kosong!" }),
    password: zod_1.default.string().nonempty({ error: "password tidak boleh kosong!" }),
});
AuthValidation.VERIFYACCOUNT = zod_1.default.object({
    token: zod_1.default.string().nonempty({ error: "Token verifikasi tidak boleh kosong!" }),
    otp_code: zod_1.default.string().nonempty({ error: "Kode OTP tidak boleh kosong" }),
});
AuthValidation.RESENDOTP = zod_1.default.object({
    token: zod_1.default.string().nonempty({ error: "Token tidak boleh kosong" }),
});
AuthValidation.RESENDVERIFYACCOUNTTOKEN = zod_1.default.object({
    email: zod_1.default.email({ error: "Format email tidak valid" }).nonempty({ error: "Email tidak boleh kosong" })
});
AuthValidation.FORGOTPASSWORD = zod_1.default.object({
    email: zod_1.default.email({ error: "Format email tidak valid" }).nonempty({ error: "Email tidak boleh kosong" })
});
AuthValidation.MATCHOTP = zod_1.default.object({
    email: zod_1.default.email({ error: "Format email tidak valid" }).nonempty({ error: "Email tidak boleh kosong" }),
    otp_code: zod_1.default.string().nonempty({ error: "Kode OTP tidak boleh kosong" })
});
AuthValidation.RESETPASSWORD = zod_1.default.object({
    password: zod_1.default.string().min(8, { error: "Password minimal 8 karakter" }),
    confirm_password: zod_1.default.string().min(8, { error: "Konfirm password minimal 8 karakter" })
});
//# sourceMappingURL=auth.validation.js.map