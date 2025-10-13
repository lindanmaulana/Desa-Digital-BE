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
UserValidation.GETALL = zod_1.default.object({
    keyword: zod_1.default.string().optional(),
    role: zod_1.default.string().optional(),
    is_active: zod_1.default.boolean().optional(),
    page: zod_1.default.string().optional(),
    limit: zod_1.default.string().optional()
});
UserValidation.CHANGEPASSWORD = zod_1.default.object({
    password: zod_1.default.string({ error: "Password tidak boleh kosong" }).min(8, "Password minimal 8 karakter"),
    confirm_password: zod_1.default.string({ error: "Konfirm password tidak boleh kosong" }).min(8, "Confirm Password minimal 8 karakter"),
});
//# sourceMappingURL=user.validation.js.map