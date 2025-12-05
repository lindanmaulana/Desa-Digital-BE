"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("./validation");
exports.ImageValidation = {
    CREATE: zod_1.default.object({
        profile_id: zod_1.default.string().nullable(),
        user_id: zod_1.default.string().nullable(),
        social_assistance_id: zod_1.default.string().nullable(),
        social_assistance_recipient_id: zod_1.default.string().nullable(),
        event_id: zod_1.default.string().nullable(),
        development_id: zod_1.default.string().nullable()
    }),
    UPLOAD_SOCIAL_ASSISTANCE: zod_1.default.object({
        id: zod_1.default.string().nonempty({ error: "Id bantuan sosial tidak boleh kosong." })
    })
};
const ExtendImageCreateSchema = exports.ImageValidation.CREATE.extend({
    path: zod_1.default.string().nonempty({ error: "Nama path tidak boleh kosong." }),
    filename: zod_1.default.string().nonempty({ error: "Nama file tidak boleh kosong." }),
    entity: zod_1.default.string().transform(val => val.toUpperCase()).pipe(zod_1.default.enum(validation_1.VALID_ENTITY_IMAGE))
});
const ExtendImageUpdateSchema = exports.ImageValidation.UPLOAD_SOCIAL_ASSISTANCE.extend({
    path: zod_1.default.string().nonempty({ error: "Nama path tidak boleh kosong." }),
    filename: zod_1.default.string().nonempty({ error: "Nama file tidak boleh kosong." }),
});
//# sourceMappingURL=image.validation.js.map