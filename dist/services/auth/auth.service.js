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
exports.AuthService = void 0;
const repositories_1 = require("../../repositories");
const errors_1 = require("../../utils/errors");
const unauthorized_1 = require("../../utils/errors/unauthorized");
const compare_password_1 = require("../../utils/helpers/compare-password");
const create_token_user_1 = require("../../utils/helpers/jwt/create-token-user");
const user__response_1 = __importDefault(require("../../utils/responses/user.,response"));
const auth_validation_1 = require("../../utils/validations/auth.validation");
const validation_1 = require("../../utils/validations/validation");
exports.AuthService = {
    signin: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(auth_validation_1.AuthValidation.SIGNIN, req);
        const checkUser = yield repositories_1.UserRepository.findByEmail(validateFields.email);
        if (!checkUser)
            throw new unauthorized_1.UnauthorizedError("Invalid credentials");
        if (!checkUser.is_active)
            throw new errors_1.NeedActivation("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun", checkUser.email);
        const isPasswordValid = yield (0, compare_password_1.comparePassword)(validateFields.password, checkUser.password);
        if (!isPasswordValid)
            throw new unauthorized_1.UnauthorizedError("Invalid credentials");
        const token = (0, create_token_user_1.createTokenUser)(checkUser);
        return Object.assign(Object.assign({}, user__response_1.default.toUserResponse(checkUser)), { token });
    }),
};
//# sourceMappingURL=auth.service.js.map