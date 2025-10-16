"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAssistanceValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("./validation");
class SocialAssistanceValidation {
}
exports.SocialAssistanceValidation = SocialAssistanceValidation;
SocialAssistanceValidation.CREATE = zod_1.default.object({
    thumbnail: zod_1.default.string().optional(),
    name: zod_1.default.string().nonempty({ error: "Nama tidak boleh kosong" }),
    category: zod_1.default.string().transform((val) => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_CATEGORY_SOCIAL_ASSISTANCE)),
    amount: zod_1.default.string().nonempty({ error: "Nomimal bantuan tidak boleh kosong" }),
    provider: zod_1.default.string().nonempty({ error: "Nama pemberi bantuan tidak boleh kosong" }),
    description: zod_1.default.string().optional(),
    is_active: zod_1.default.string().refine((val) => val.toLocaleLowerCase() === "true" || val.toLocaleLowerCase() === "false", {
        error: "Opsi ketersediaan harus Tersedia atau Tidak Tersedia"
    })
});
//# sourceMappingURL=social-assistance.validation.js.map