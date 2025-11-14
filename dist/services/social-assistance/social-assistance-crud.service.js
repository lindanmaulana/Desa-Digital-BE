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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAssistanceCrudService = void 0;
const social_assistance_repository_1 = require("../../repositories/social-assistance.repository");
const errors_1 = require("../../utils/errors");
const get_pagination_1 = require("../../utils/helpers/get-pagination");
const response_message_type_1 = require("../../utils/response-message.type");
const responses_1 = require("../../utils/responses");
const social_assistance_validation_1 = require("../../utils/validations/social-assistance.validation");
const validation_1 = require("../../utils/validations/validation");
exports.SocialAssistanceCrudService = {
    create: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(social_assistance_validation_1.SocialAssistanceValidation.CREATE, req);
        if (validateFields.amount && validateFields.amount < 0)
            throw new errors_1.BadrequestError("Nominal bantuan tidak valid");
        const result = yield social_assistance_repository_1.SocialAssistanceRepository.create({
            data: {
                thumbnail: validateFields.thumbnail,
                name: validateFields.name,
                category: validateFields.category,
                amount: validateFields.amount,
                provider: validateFields.provider,
                description: validateFields.description,
                is_active: validateFields.is_active
            },
        });
        if (!result)
            throw new errors_1.InternalServerError("Pembuatan bantuan sosial gagal, please try again later");
        return responses_1.socialAssistanceResponse.toSocialAssistanceResponse(result);
    }),
    getAll: (req) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (validateFields.category)
            whereCondition.category = validateFields.category;
        if (validateFields.is_active && (validateFields.is_active !== undefined || validateFields.is_active !== null))
            whereCondition.is_active = validateFields.is_active;
        let conditionCount = { where: whereCondition };
        const count = yield social_assistance_repository_1.SocialAssistanceRepository.findCount(conditionCount);
        const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = (0, get_pagination_1.getPagination)({ count, pageRequest: validateFields.page, limitRequest: validateFields.limit });
        let conditionFindAll = {
            where: whereCondition,
            skip: limit * (page - 1),
            take: limit,
        };
        const result = yield social_assistance_repository_1.SocialAssistanceRepository.findAll(conditionFindAll);
        if (!result)
            throw new errors_1.InternalServerError(`${response_message_type_1.RESPONSE_MESSAGE.error.read} Bantuan Sosial, please try again later`);
        return {
            data: responses_1.socialAssistanceResponse.toSocialAssistanceResponsesWithRelation(result),
            pagination: {
                total_page: totalPage,
                limit,
                current_page: currentPage,
                links: links,
                next_page: nextPage,
                prev_page: prevPage,
            }
        };
    }),
    getOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield social_assistance_repository_1.SocialAssistanceRepository.findOne(id);
        if (!result)
            throw new errors_1.NotfoundError("Bantuan Sosial tidak tersedia!");
        return responses_1.socialAssistanceResponse.toSocialAssistanceResponseWithRelation(result);
    }),
    update: (id, req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(social_assistance_validation_1.SocialAssistanceValidation.UPDATE, req);
        console.log({ cekActive: validateFields.is_active });
        if (Object.keys(req).length <= 0)
            throw new errors_1.BadrequestError("Badan permintaan kosong. Masukkan setidaknya satu field untuk diperbarui.");
        const conditions = Object.keys(validateFields).reduce((acc, key) => {
            const value = validateFields[key];
            if (value !== undefined || value !== null)
                acc[key] = value;
            return acc;
        }, {});
        console.log({ conditions });
        const cleanDataForPrisma = conditions;
        const prismaUpdateArgs = {
            where: { id },
            data: cleanDataForPrisma
        };
        const result = yield social_assistance_repository_1.SocialAssistanceRepository.update(prismaUpdateArgs);
        if (!result)
            throw new errors_1.InternalServerError("Terjadi kesalahan saat update data, please try again later");
        return responses_1.socialAssistanceResponse.toSocialAssistanceResponse(result);
    }),
};
//# sourceMappingURL=social-assistance-crud.service.js.map