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
exports.SocialAssistanceService = void 0;
const social_assistance_repository_1 = require("../repositories/social-assistance.repository");
const errors_1 = require("../utils/errors");
const responses_1 = __importDefault(require("../utils/responses"));
const social_assistance_validation_1 = require("../utils/validations/social-assistance.validation");
const validation_1 = require("../utils/validations/validation");
class SocialAssistanceService {
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const validateFields = validation_1.validation.validate(social_assistance_validation_1.SocialAssistanceValidation.CREATE, req);
            if (Number(validateFields.amount) < 0)
                throw new errors_1.BadrequestError("Nominal bantuan tidak valid");
            const result = yield social_assistance_repository_1.SocialAssistanceRepository.create({
                data: {
                    thumbnail: (_a = validateFields.thumbnail) !== null && _a !== void 0 ? _a : null,
                    name: validateFields.name,
                    category: (_b = validateFields.category) !== null && _b !== void 0 ? _b : undefined,
                    amount: validateFields.amount,
                    provider: validateFields.provider,
                    description: (_c = validateFields.description) !== null && _c !== void 0 ? _c : null,
                    is_active: validateFields.is_active === "true",
                },
            });
            if (!result)
                throw new errors_1.InternalServerError("Pembuatan bantuan sosial gagal, please try again later");
            return responses_1.default.socialAssistanceResponse.toSocialAssistanceResponse(result);
        });
    }
}
exports.SocialAssistanceService = SocialAssistanceService;
//# sourceMappingURL=social-assistance.service.js.map