"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAssistanceValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("./validation");
class SocialAssistanceValidation {
}
exports.SocialAssistanceValidation = SocialAssistanceValidation;
_a = SocialAssistanceValidation;
SocialAssistanceValidation.IS_ACTIVE = zod_1.default.preprocess((val) => {
    if (typeof val === "string") {
        const lowerCaseVal = val.toLowerCase();
        return lowerCaseVal === "true";
    }
    return val;
}, zod_1.default.boolean({ error: "Opsi ketersediaan harus Tersedia atau Tidak Tersedia" }));
SocialAssistanceValidation.SOCIALASSISTANCE = zod_1.default.object({
    thumbnail: zod_1.default.string().nullable().default(null),
    name: zod_1.default.string().nonempty({ error: "Nama tidak boleh kosong" }),
    category: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_CATEGORY_SOCIAL_ASSISTANCE)),
    amount: zod_1.default.coerce.number({ error: "Nominal harus berupa angka" }).int().positive().min(1, "Nominal bantuan tidak boleh kosong"),
    provider: zod_1.default.string().nonempty({ error: "Nama pemberi bantuan tidak boleh kosong" }),
    description: zod_1.default.string().nullable().default(null),
    is_active: _a.IS_ACTIVE
});
SocialAssistanceValidation.GETALL = zod_1.default.object({
    keyword: zod_1.default.string().optional(),
    category: zod_1.default.string().transform((v) => v.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_CATEGORY_SOCIAL_ASSISTANCE)).optional(),
    is_active: _a.IS_ACTIVE.optional(),
    page: zod_1.default.string().optional(),
    limit: zod_1.default.string().optional()
});
SocialAssistanceValidation.CREATE = _a.SOCIALASSISTANCE;
// static readonly CREATE = z.object({
// 	thumbnail: z.string().nullable().default(null),
// 	name: z.string().nonempty({error: "Nama tidak boleh kosong"}),
// 	category: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_CATEGORY_SOCIAL_ASSISTANCE)),
// 	amount: z.string().nonempty({error: "Nomimal bantuan tidak boleh kosong"}),
// 	provider: z.string().nonempty({error: "Nama pemberi bantuan tidak boleh kosong"}),
// 	description: z.string().nullable().default(null),
// 	is_active: this.IS_ACTIVE
// })
SocialAssistanceValidation.UPDATE = zod_1.default.object({
    thumbnail: zod_1.default.string().optional(),
    name: zod_1.default.string().nonempty({ error: "Nama tidak boleh kosong" }),
    category: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_CATEGORY_SOCIAL_ASSISTANCE)).optional(),
    amount: zod_1.default.coerce.number({ error: "Nomimal harus berupa angka" }).int().positive().min(1, "Nominal bantuan tidak boleh kosong").optional(),
    provider: zod_1.default.string().nonempty({ error: "Nama pemberi bantuan tidak boleh kosong" }),
    description: zod_1.default.string().optional(),
    is_active: _a.IS_ACTIVE.optional()
});
// is_active: z.string().refine((val) => val.toLocaleLowerCase() === "true" || val.toLocaleLowerCase() === "false", {
// 	error: "Opsi ketersediaan harus Tersedia atau Tidak Tersedia"
// })
//# sourceMappingURL=social-assistance.validation.js.map