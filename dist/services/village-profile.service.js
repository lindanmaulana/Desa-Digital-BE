"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillageProfileService = void 0;
const repositories_1 = __importDefault(require("../repositories"));
const errors_1 = require("../utils/errors");
const responses_1 = __importDefault(require("../utils/responses"));
const validation_1 = require("../utils/validations/validation");
const village_profile_validation_1 = require("../utils/validations/village-profile.validation");
class VillageProfileService {
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(village_profile_validation_1.VillageProfileValidation.CREATE, req);
            const checkVillageProfile = yield repositories_1.default.VillageProfileRepository.checkCount();
            if (checkVillageProfile)
                throw new errors_1.BadrequestError("Maaf Profile Desa sudah ada, tidak dapat menambahkan kembali Profile Desa baru");
            const result = yield repositories_1.default.VillageProfileRepository.create({
                data: validateFields
            });
            if (!result)
                throw new errors_1.InternalServerError("Maaf terjadi kesalahan saat menambahkan Profile Desa, please try again later");
            return responses_1.default.villageProfileResponse.toVillageProfileResponse(result);
        });
    }
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repositories_1.default.VillageProfileRepository.findOne();
            if (!result)
                throw new errors_1.NotfoundError("Profile Desa tidak tersedia");
            return responses_1.default.villageProfileResponse.toVillageProfileResponse(result);
        });
    }
    static update(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(village_profile_validation_1.VillageProfileValidation.UPDATE, req);
            if (Object.keys(req).length <= 0)
                throw new errors_1.BadrequestError("Maaf tidak ada data yang bisa di update");
            const checkVillageProfile = yield repositories_1.default.VillageProfileRepository.findById(id);
            if (!checkVillageProfile)
                throw new errors_1.NotfoundError("Profile Desa tidak di temukan");
            const condition = Object.keys(validateFields).reduce((acc, key) => {
                const value = validateFields[key];
                if (value)
                    acc[key] = value;
                return acc;
            }, {});
            const cleanDataForPrisma = condition;
            const prismaUpdateArgs = {
                where: { id },
                data: cleanDataForPrisma
            };
            const result = yield repositories_1.default.VillageProfileRepository.update(prismaUpdateArgs);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan saat mengubah Profile Desa, please try again later");
            return responses_1.default.villageProfileResponse.toVillageProfileResponse(result);
        });
    }
}
exports.VillageProfileService = VillageProfileService;
//# sourceMappingURL=village-profile.service.js.map