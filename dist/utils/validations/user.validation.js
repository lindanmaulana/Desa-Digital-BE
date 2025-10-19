"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const auth_validation_1 = require("./auth.validation");
const validation_1 = require("./validation");
class UserValidation {
}
exports.UserValidation = UserValidation;
_a = UserValidation;
UserValidation.PROFILE = zod_1.default.object({
    profile_picture: zod_1.default.string().nullable().default(null),
    identity_number: zod_1.default.string().nullable().default(null),
    gender: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_GENDER)).default("MALE"),
    date_of_birth: zod_1.default.coerce.date().nullable().default(null),
    phone_number: zod_1.default.string().nullable().default(null),
    occupation: zod_1.default.string().nullable().default(null),
    marital_status: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_MARITAL)).default("SINGLE")
}).shape;
UserValidation.REGISTERSTAFF = auth_validation_1.AuthValidation.SIGNUP.extend(_a.PROFILE);
UserValidation.REGISTERHEADOFFAMILY = auth_validation_1.AuthValidation.SIGNUP.extend(_a.PROFILE);
UserValidation.GETALL = zod_1.default.object({
    keyword: zod_1.default.string().optional(),
    role: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_ROLE)).optional(),
    is_active: zod_1.default.preprocess((val) => {
        if (typeof val === "string") {
            const lowerCaseVal = val.toLocaleLowerCase();
            return lowerCaseVal === "true";
        }
        return val;
    }, zod_1.default.boolean()).optional(),
    page: zod_1.default.string().optional(),
    limit: zod_1.default.string().optional()
});
UserValidation.CHANGEPASSWORD = zod_1.default.object({
    password: zod_1.default.string({ error: "Password tidak boleh kosong" }).min(8, "Password minimal 8 karakter"),
    confirm_password: zod_1.default.string({ error: "Konfirm password tidak boleh kosong" }).min(8, "Confirm Password minimal 8 karakter"),
});
//# sourceMappingURL=user.validation.js.map