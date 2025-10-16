"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const auth_validation_1 = require("./auth.validation");
const validation_1 = require("./validation");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTERSTAFF = auth_validation_1.AuthValidation.SIGNUP.extend(zod_1.default.object({
    profile_picture: zod_1.default.string().optional(),
    identity_number: zod_1.default.string().optional(),
    gender: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_GENDER)).optional(),
    date_of_birth: zod_1.default.string().optional(),
    phone_number: zod_1.default.string().optional(),
    occupation: zod_1.default.string().optional(),
    marital_status: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_MARITAL)).optional()
}).shape);
UserValidation.REGISTERHEADOFFAMILY = auth_validation_1.AuthValidation.SIGNUP.extend(zod_1.default.object({
    profile_picture: zod_1.default.string().optional(),
    identity_number: zod_1.default.string().optional(),
    gender: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_GENDER)).optional(),
    date_of_birth: zod_1.default.string().optional(),
    phone_number: zod_1.default.string().optional(),
    occupation: zod_1.default.string().optional(),
    marital_status: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_MARITAL)).optional()
}).shape);
UserValidation.GETALL = zod_1.default.object({
    keyword: zod_1.default.string().optional(),
    role: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_ROLE)).optional(),
    is_active: zod_1.default.string().optional(),
    page: zod_1.default.string().optional(),
    limit: zod_1.default.string().optional()
});
UserValidation.CHANGEPASSWORD = zod_1.default.object({
    password: zod_1.default.string({ error: "Password tidak boleh kosong" }).min(8, "Password minimal 8 karakter"),
    confirm_password: zod_1.default.string({ error: "Konfirm password tidak boleh kosong" }).min(8, "Confirm Password minimal 8 karakter"),
});
//# sourceMappingURL=user.validation.js.map