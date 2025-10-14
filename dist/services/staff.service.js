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
const staff_repository_1 = require("../repositories/staff.repository");
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
const staff_validation_1 = require("../utils/validations/staff.validation");
const validation_1 = require("../utils/validations/validation");
const responses_1 = __importDefault(require("../utils/responses"));
class StaffService {
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const validateFields = validation_1.validation.validate(staff_validation_1.StaffValidation.CREATE, req);
            const checkUser = yield user_repository_1.UserRepository.findById(req.user_id);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            const result = yield staff_repository_1.StaffRepository.create({
                data: {
                    user_id: validateFields.user_id,
                    profile_picture: (_a = validateFields.profile_picture) !== null && _a !== void 0 ? _a : "",
                    identity_number: (_b = validateFields.identity_number) !== null && _b !== void 0 ? _b : "",
                    gender: validateFields.gender,
                    date_of_birth: (_c = validateFields.date_of_birth) !== null && _c !== void 0 ? _c : "",
                    phone_number: (_d = validateFields.phone_number) !== null && _d !== void 0 ? _d : "",
                    occupation: (_e = validateFields.occupation) !== null && _e !== void 0 ? _e : null,
                    marital_status: validateFields.marital_status,
                },
            });
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            return responses_1.default.staffResponse.toStaffResponse(result);
        });
    }
}
exports.StaffService = StaffService;
//# sourceMappingURL=staff.service.js.map