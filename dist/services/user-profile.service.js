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
exports.UserProfileService = void 0;
const repositories_1 = __importDefault(require("../repositories"));
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
const unauthorized_1 = require("../utils/errors/unauthorized");
const helpers_1 = __importDefault(require("../utils/helpers"));
const responses_1 = __importDefault(require("../utils/responses"));
const user_profile_validation_1 = require("../utils/validations/user-profile.validation");
const validation_1 = require("../utils/validations/validation");
class UserProfileService {
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repositories_1.default.UserRepository.findById(user.id);
            if (!result)
                throw new errors_1.NotfoundError("Pengguna tidak ditemukan");
            return responses_1.default.userResponse.toUserResponseWithRelation(result);
        });
    }
    static changePassword(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(user_profile_validation_1.UserProfileValidation.CHANGEPASSWORD, req);
            if (validateFields.password !== validateFields.confirm_password)
                throw new errors_1.BadrequestError("Password dan Konfirm password tidak sama");
            const checkUser = yield user_repository_1.UserRepository.findById(user.id);
            if (!checkUser)
                throw new errors_1.NotfoundError("Pengguna tidak di temukan");
            if (!checkUser.is_active)
                throw new unauthorized_1.UnauthorizedError("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun");
            const newHasPassword = yield helpers_1.default.hashPassword(validateFields.password);
            const result = yield repositories_1.default.UserRepository.updatePassword(checkUser.id, newHasPassword);
            if (checkUser.is_first_login)
                yield user_repository_1.UserRepository.updateIsFirstLogin(checkUser.id);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
            return responses_1.default.userResponse.toUserResponse(result);
        });
    }
}
exports.UserProfileService = UserProfileService;
//# sourceMappingURL=user-profile.service.js.map