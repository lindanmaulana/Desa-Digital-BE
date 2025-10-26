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
exports.StaffService = void 0;
const repositories_1 = __importDefault(require("../repositories"));
const errors_1 = require("../utils/errors");
const remove_undefined_1 = require("../utils/helpers/remove-undefined");
const responses_1 = __importDefault(require("../utils/responses"));
const staff_validation_1 = require("../utils/validations/staff.validation");
const validation_1 = require("../utils/validations/validation");
class StaffService {
    static update(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(staff_validation_1.StaffValidation.UPDATE, req);
            const checkUser = yield repositories_1.default.UserRepository.findById(user.id);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan!");
            const checkStaff = yield repositories_1.default.StaffRepository.findByUserId(checkUser.id);
            if (!checkStaff)
                throw new errors_1.NotfoundError("Pengguna belum terdaftar sebagai Staf");
            // if (validateFields.profile_picture) {
            // 	const imageExist = helpers.fileHelpers.checkImage(validateFields.profile_picture)
            // 	if (!imageExist) throw new NotfoundError("Image tidak ditemukan")
            // 	if (checkStaff.profile_picture) helpers.fileHelpers.deleteImage(checkStaff.profile_picture)
            // }
            const data = (0, remove_undefined_1.removeUndefined)(validateFields);
            const result = yield repositories_1.default.StaffRepository.update({
                where: { id: checkStaff.id },
                data: data
            });
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan saat mengupdate data, please try again later");
            return responses_1.default.staffResponse.toStaffResponse(result);
        });
    }
}
exports.StaffService = StaffService;
//# sourceMappingURL=staff.service.js.map