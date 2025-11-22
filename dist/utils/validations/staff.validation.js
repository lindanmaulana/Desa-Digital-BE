"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("./validation");
exports.StaffValidation = {
    CREATE: zod_1.default.object({
        user_id: zod_1.default.string().nonempty({ error: "Id Pengguna tidak boleh kosong" }),
        identity_number: zod_1.default.string().optional(),
        gender: zod_1.default.string().transform(val => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_GENDER)),
        date_of_birth: zod_1.default.string().optional(),
        phone_number: zod_1.default.string().optional(),
        occupation: zod_1.default.string().optional(),
        marital_status: zod_1.default.string().transform(val => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_MARITAL)),
    }),
    GETALL: zod_1.default.object({
        keyword: zod_1.default.string().optional(),
        page: zod_1.default.string().optional(),
        limit: zod_1.default.string().optional(),
        sort: zod_1.default.string().transform((val) => val.toLowerCase()).pipe(zod_1.default.enum(validation_1.VALID_SORT, { error: "Nilai parameter 'sort' tidak valid. Nilai yang diizinkan hanya 'asc' atau 'desc'." })).optional()
    }),
    GETONE: zod_1.default.object({
        id: zod_1.default.string().nonempty({ error: "Id Pengguna tidak boleh kosong!" })
    }),
    DELETE: zod_1.default.object({
        id: zod_1.default.string().nonempty({ error: "Id Pengguna tidak boleh kosong!" })
    }),
};
//# sourceMappingURL=staff.validation.js.map