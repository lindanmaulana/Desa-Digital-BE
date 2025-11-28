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
exports.SocialAssistanceRecipientCrudService = void 0;
const logging_1 = require("../../logging");
const social_assistance_recipient_repository_1 = require("../../repositories/social-assistance-recipient.repository");
const errors_1 = require("../../utils/errors");
const get_pagination_1 = require("../../utils/helpers/get-pagination");
const social_assistance_recipient_response_1 = require("../../utils/responses/social-assistance-recipient.response");
const validations_1 = require("../../utils/validations");
const validation_1 = require("../../utils/validations/validation");
exports.SocialAssistanceRecipientCrudService = {
    create: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(validations_1.SocialAssistanceRecipientValidation.CREATE, req);
        if (validateFields.amount && validateFields.amount < 0)
            throw new errors_1.BadrequestError("Nominal bantuan tidak valid!");
    }),
    getAll: (req, context) => __awaiter(void 0, void 0, void 0, function* () {
        logging_1.logger.info(`Social assistance recipient list requested by User ID: ${context.user_id} with role: ${context.role}`, { query: req });
        const validateFields = validation_1.validation.validate(validations_1.SocialAssistanceRecipientValidation.GETALL, req);
        let whereCondition = {};
        let orderByCondition = { created_at: "asc" };
        if (validateFields.sort) {
            orderByCondition = {
                social_assistance: {
                    name: validateFields.sort,
                },
            };
        }
        if (validateFields.keyword) {
            whereCondition.social_assistance = {
                is: {
                    name: {
                        contains: validateFields.keyword,
                        mode: "insensitive",
                    },
                },
            };
        }
        logging_1.logger.debug(`Executing COUNT query with WHERE condition: `, whereCondition);
        let countCondition = { where: whereCondition };
        const countResult = yield social_assistance_recipient_repository_1.SocialAssistanceRecipientRepository.findCount(countCondition);
        const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = (0, get_pagination_1.getPagination)({
            count: countResult,
            limitRequest: validateFields.limit,
            pageRequest: validateFields.page,
        });
        const finalFindAllCondition = {
            where: whereCondition,
            skip: limit * (page - 1),
            take: limit,
            orderBy: orderByCondition,
        };
        logging_1.logger.debug(`Executing FIND_ALL query: ${finalFindAllCondition}`);
        const result = yield social_assistance_recipient_repository_1.SocialAssistanceRecipientRepository.findAll(finalFindAllCondition);
        if (!result) {
            logging_1.logger.error(`Failed to access Social Assistance Recipient data from repository for User ID: ${context.user_id}`);
            throw new errors_1.InternalServerError("Gagal mengakses data penerima bantuan sosial, please try again later.");
        }
        logging_1.logger.info(`Successfully returned ${result.length} social assistance recipient record to User ID: ${context.user_id}`);
        return {
            data: social_assistance_recipient_response_1.toSocialAssistanceRecipientResponse.listResponse(result),
            pagination: {
                current_page: currentPage,
                limit: limit,
                links: links,
                total_page: totalPage,
                next_page: nextPage,
                prev_page: prevPage,
            },
        };
    }),
    getOne: (req, context) => __awaiter(void 0, void 0, void 0, function* () {
        logging_1.logger.info(`Social assistance recipient detail requested by User ID: ${context.user_id}`, { query: req });
        const validateFields = validation_1.validation.validate(validations_1.SocialAssistanceRecipientValidation.GETONE, req);
        logging_1.logger.debug(`Executing check Social assistance recipient`);
        const checkSocialAssistanceRecipient = yield social_assistance_recipient_repository_1.SocialAssistanceRecipientRepository.findById(validateFields.id);
        if (!checkSocialAssistanceRecipient) {
            logging_1.logger.error(`Failed Data Social assistance recipient detail not found from repository for User ID: ${context.user_id}`);
            throw new errors_1.NotfoundError("Penerima bantuan sosial tidak ditemukan!");
        }
        logging_1.logger.debug(`Executing FIND_DETAIL Social assistance recipient ID: ${checkSocialAssistanceRecipient.id}`);
        const result = yield social_assistance_recipient_repository_1.SocialAssistanceRecipientRepository.findDetailById(checkSocialAssistanceRecipient.id);
        if (!result) {
            logging_1.logger.error(`Failed to access Social assistance recipient data from repository for User ID: ${context.user_id}`);
            throw new errors_1.InternalServerError("Terjadi kesalahan, please try again later");
        }
        logging_1.logger.info(`Successfully returned detail social assistance recipient record to User ID: ${context.user_id}`);
        return social_assistance_recipient_response_1.toSocialAssistanceRecipientResponse.detailResponse(result);
    }),
};
//# sourceMappingURL=social-assistance-recipient-crud.service.js.map