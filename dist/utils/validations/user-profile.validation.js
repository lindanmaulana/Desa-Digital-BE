"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("./validation");
class UserProfileValidation {
}
exports.UserProfileValidation = UserProfileValidation;
UserProfileValidation.CHANGEPASSWORD = zod_1.default.object({
    password: zod_1.default.string({ error: "Password tidak boleh kosong" }).min(8, "Password minimal 8 karakter"),
    confirm_password: zod_1.default.string({ error: "Konfirm password tidak boleh kosong" }).min(8, "Confirm Password minimal 8 karakter"),
});
UserProfileValidation.UPDATE = zod_1.default.object({
    profile_picture: zod_1.default.string().optional(),
    identity_number: zod_1.default.string().optional(),
    gender: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_GENDER)).optional(),
    date_of_birth: zod_1.default.coerce.date().optional(),
    phone_number: zod_1.default.string().optional(),
    occupation: zod_1.default.string().optional(),
    marital_status: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_MARITAL)).optional()
});
//# sourceMappingURL=user-profile.validation.js.map