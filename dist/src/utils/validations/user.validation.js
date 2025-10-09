"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.SIGNUP = zod_1.default.object({
    name: zod_1.default.string().nonempty({ error: "Nama tidak boleh kosong!" }),
    email: zod_1.default.email({ error: "Email tidak valid!" }).nonempty({ error: "Email tidak boleh kosong!" }),
    password: zod_1.default.string().min(8, { error: "Password minimal 8 karakter" }),
});
UserValidation.SIGNIN = zod_1.default.object({
    email: zod_1.default
        .email({ error: "Email tidak valid!" })
        .nonempty({ error: "Email tidak boleh kosong!" }),
    password: zod_1.default
        .string()
        .nonempty({ error: "password tidak boleh kosong!" }),
});
UserValidation.CHANGEPASSWORD = zod_1.default.object({
    password: zod_1.default.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: zod_1.default.string().min(8, "Confirm Password minimal 8 karakter")
});
//# sourceMappingURL=user.validation.js.map