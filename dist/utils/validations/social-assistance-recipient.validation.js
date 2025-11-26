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
        head_of_family_id: zod_1.default.string().nonempty({ error: "Kepala keluarga tidak boleh kosong!" }),
        amount: zod_1.default.coerce.number({ error: "Nominal harus berupa angka" }).int().positive().min(1, "Nominal pengajuan tidak boleh kosong!"),
        reason: zod_1.default.string().nonempty({ error: "Alasan tidak boleh kosong!" }),
        bank: zod_1.default.string().transform((v) => v.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_BANK)),
        account_number: zod_1.default.string().nonempty({ error: "Nomor akun tidak boleh kosong!" }),
        proof: zod_1.default.string()
    }),
    GETALL: zod_1.default.object({
        keyword: zod_1.default.string().optional(),
        page: zod_1.default.string().optional(),
        limit: zod_1.default.string().optional(),
        sort: zod_1.default.string().transform((val) => val.toLowerCase()).pipe(zod_1.default.enum(validation_1.VALID_SORT, { error: "Nilai parameter 'sort' tidak valid. Nilai yang diizinkan hanya 'asc' atau 'desc'." })).optional()
    }),
};
//# sourceMappingURL=social-assistance-recipient.validation.js.map