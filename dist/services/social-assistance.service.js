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
const client_1 = require("@prisma/client");
const social_assistance_repository_1 = require("../repositories/social-assistance.repository");
const errors_1 = require("../utils/errors");
const helpers_1 = __importDefault(require("../utils/helpers"));
const response_message_type_1 = require("../utils/response-message.type");
const responses_1 = __importDefault(require("../utils/responses"));
const social_assistance_validation_1 = require("../utils/validations/social-assistance.validation");
const validation_1 = require("../utils/validations/validation");
class SocialAssistanceService {
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const validateFields = validation_1.validation.validate(social_assistance_validation_1.SocialAssistanceValidation.CREATE, req);
            if (validateFields.amount && Number(validateFields.amount) < 0)
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
    static getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(social_assistance_validation_1.SocialAssistanceValidation.GETALL, req);
            let whereCondition = {};
            if (validateFields.keyword) {
                whereCondition = Object.assign(Object.assign({}, whereCondition), { OR: [
                        {
                            name: {
                                contains: validateFields.keyword,
                                mode: "insensitive"
                            },
                            provider: {
                                contains: validateFields.keyword,
                                mode: "insensitive"
                            }
                        }
                    ] });
            }
            if (validateFields.category && Object.values(client_1.CategorySocialAssistance).includes(validateFields.category)) {
                const searchCategory = validateFields.category;
                whereCondition = Object.assign(Object.assign({}, whereCondition), { category: searchCategory });
            }
            if (validateFields.is_active) {
                whereCondition = Object.assign(Object.assign({}, whereCondition), { is_active: validateFields.is_active === "true" });
            }
            let conditionCount = { where: whereCondition };
            const count = yield social_assistance_repository_1.SocialAssistanceRepository.findCount(conditionCount);
            const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = helpers_1.default.getPagination({ count, pageRequest: validateFields.page, limitRequest: validateFields.limit });
            let conditionFindAll = {
                where: whereCondition,
                skip: limit * (page - 1),
                take: limit,
            };
            const result = yield social_assistance_repository_1.SocialAssistanceRepository.findAll(conditionFindAll);
            if (!result)
                throw new errors_1.InternalServerError(`${response_message_type_1.RESPONSE_MESSAGE.error.read} Bantuan Sosial, please try again later`);
            return {
                data: responses_1.default.socialAssistanceResponse.toSocialAssistanceResponses(result),
                pagination: {
                    total_page: totalPage,
                    limit,
                    current_page: currentPage,
                    links: links,
                    next_page: nextPage,
                    prev_page: prevPage,
                }
            };
        });
    }
    static update(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(social_assistance_validation_1.SocialAssistanceValidation.UPDATE, req);
            let updateData = {};
            if (validateFields.thumbnail)
                updateData.thumbnail = validateFields.thumbnail;
            if (validateFields.name)
                updateData.name = validateFields.name;
            if (validateFields.category !== undefined && validateFields.category !== null)
                updateData.category = validateFields.category;
            if (validateFields.provider)
                updateData.provider = validateFields.provider;
            if (validateFields.amount && validateFields.amount > 0)
                updateData.amount = validateFields.amount;
            if (validateFields.description)
                updateData.description = validateFields.description;
            if (!validateFields.is_active === undefined && !validateFields.is_active === null)
                updateData.is_active = validateFields.is_active;
            const conditions = {
                where: { id },
                data: updateData
            };
            const result = yield social_assistance_repository_1.SocialAssistanceRepository.update(conditions);
            if (!result)
                throw new errors_1.InternalServerError("Terjadi kesalahan saat update data, please try again later");
            return responses_1.default.socialAssistanceResponse.toSocialAssistanceResponse(result);
        });
    }
}
exports.SocialAssistanceService = SocialAssistanceService;
//# sourceMappingURL=social-assistance.service.js.map