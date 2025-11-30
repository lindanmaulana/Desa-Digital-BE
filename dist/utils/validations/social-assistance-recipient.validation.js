"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAssistanceRecipientValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("./validation");
exports.SocialAssistanceRecipientValidation = {
    CREATE: zod_1.default.object({
        social_assistance_id: zod_1.default.string().nonempty({ error: "Bantuan sosial tidak boleh kosong!" }),
        amount: zod_1.default.coerce.number({ error: "Nominal harus berupa angka" }).int().positive().min(1, "Nominal pengajuan tidak boleh kosong!"),
        reason: zod_1.default.string().nonempty({ error: "Alasan tidak boleh kosong!" }),
        bank: zod_1.default.string().transform((v) => v.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_BANK)),
        account_number: zod_1.default.string().min(10, "Nomor rekening bank harus terdiri dari minimal 10 digit.").max(16, "Nomor rekening tidak boleh melebihi 16 digit. Mohon cek kembali bank penerbit"),
        account_name: zod_1.default.string().nonempty({ error: "Nama akun tidak boleh kosong!" }),
    }),
    UPDATE: zod_1.default.object({
        status: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_STATUS_SOCIAL_ASSISTANCE_RECIPIENT))
    }),
    GETALL: zod_1.default.object({
        keyword: zod_1.default.string().optional(),
        page: zod_1.default.string().optional(),
        limit: zod_1.default.string().optional(),
        sort: zod_1.default.string().transform((val) => val.toLowerCase()).pipe(zod_1.default.enum(validation_1.VALID_SORT, { error: "Nilai parameter 'sort' tidak valid. Nilai yang diizinkan hanya 'asc' atau 'desc'." })).optional()
    }),
    GETONE: zod_1.default.object({
        id: zod_1.default.string().nonempty({ error: "ID tidak boleh kosong" })
    })
};
//# sourceMappingURL=social-assistance-recipient.validation.js.map