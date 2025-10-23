"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillageProfileValidation = void 0;
const zod_1 = __importDefault(require("zod"));
class VillageProfileValidation {
}
exports.VillageProfileValidation = VillageProfileValidation;
_a = VillageProfileValidation;
VillageProfileValidation.INDEX = zod_1.default.object({
    thumbnail: zod_1.default.string().nonempty({ error: "Thumbnail tidak boleh kosong" }),
    name: zod_1.default.string().nonempty({ error: "Nama Desa tidak boleh kosong" }),
    about: zod_1.default.string().nonempty({ error: "Tentang Desa tidak boleh kosong" }),
    headman: zod_1.default.string().nonempty({ error: "Kepala Desa tidak boleh kosong" }),
    people: zod_1.default.coerce.number({ error: "Jumlah Penduduk tidak valid" }).int().positive().min(1, { error: "Jumlah penduduk tidak boleh kurang dari 0" }),
    agricultural_area: zod_1.default.coerce.number({ error: "Luas pertanian Desa tidak valid" }).int().positive(),
    total_area: zod_1.default.coerce.number({ error: "Luas area Desa tidak valid" }).int().positive(),
});
VillageProfileValidation.CREATE = _a.INDEX;
VillageProfileValidation.UPDATE = _a.INDEX.partial();
//# sourceMappingURL=village-profile.validation.js.map