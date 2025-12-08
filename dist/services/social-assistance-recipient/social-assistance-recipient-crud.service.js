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
const client_1 = require("@prisma/client");
const logging_1 = require("../../logging");
const repositories_1 = require("../../repositories");
const image_repository_1 = require("../../repositories/image.repository");
const social_assistance_recipient_repository_1 = require("../../repositories/social-assistance-recipient.repository");
const social_assistance_repository_1 = require("../../repositories/social-assistance.repository");
const errors_1 = require("../../utils/errors");
const formatCurrency_1 = require("../../utils/helpers/formatCurrency");
const get_pagination_1 = require("../../utils/helpers/get-pagination");
const social_assistance_recipient_response_1 = require("../../utils/responses/social-assistance-recipient.response");
const validations_1 = require("../../utils/validations");
const validation_1 = require("../../utils/validations/validation");
const db_1 = require("../../db");
exports.SocialAssistanceRecipientCrudService = {
    create: (req, context) => __awaiter(void 0, void 0, void 0, function* () {
        logging_1.logger.info(`Social assistance recipient create requested by User ID: ${context.user_id} with role ${context.role}`);
        const validateFields = validation_1.validation.validate(validations_1.SocialAssistanceRecipientValidation.CREATE, req);
        if (validateFields.amount <= 0)
            throw new errors_1.BadrequestError("Nominal bantuan tidak valid!");
        const checkHeadOfFamily = yield repositories_1.HeadOfFamilyRepository.findByUserId(context.user_id);
        if (!checkHeadOfFamily)
            throw new errors_1.NotfoundError("Mohon maaf data pengguna pengajuan tidak terdaftar.");
        const checkSocialAssistance = yield social_assistance_repository_1.SocialAssistanceRepository.findById(validateFields.social_assistance_id);
        if (!checkSocialAssistance)
            throw new errors_1.NotfoundError("Mohon maaf, bantuan sosial yang anda ajukan tidak tersedia.");
        // validasi ini belum di test
        if (!checkSocialAssistance.amount.gt(0) || !checkSocialAssistance.is_active)
            throw new errors_1.BadrequestError("Mohon maaf, kuota penerima bantuan sosial saat ini telah terpenuhi.");
        const checkSocialAssistanceRecipient = yield social_assistance_recipient_repository_1.SocialAssistanceRecipientRepository.findByHeadOfFamilyId(checkHeadOfFamily.id, checkSocialAssistance.id);
        if (checkSocialAssistanceRecipient)
            throw new errors_1.BadrequestError("Mohon maaf, anda telah melakukan pengajuan untuk bantuan sosial ini.");
        const currentAmount = new client_1.Prisma.Decimal(checkSocialAssistance.amount);
        const reqAmount = new client_1.Prisma.Decimal(validateFields.amount);
        const currentAmountIdr = (0, formatCurrency_1.formatCurrencyToIdr)(currentAmount);
        if (currentAmount.lt(reqAmount))
            throw new errors_1.BadrequestError(`Mohon maaf, Nominal pengajuan anda melebihi sisa bantuan sosial yang tersedia yaitu ${currentAmountIdr}`);
        const result = yield social_assistance_recipient_repository_1.SocialAssistanceRecipientRepository.create(checkHeadOfFamily.id, validateFields);
        if (!result)
            throw new errors_1.InternalServerError("Terjadi kesalahan saat mengajukan bantuan, please try again later.");
        return social_assistance_recipient_response_1.toSocialAssistanceRecipientResponse.response(result);
    }),
    update: (id, req, context) => __awaiter(void 0, void 0, void 0, function* () {
        logging_1.logger.info(`Social assistance recipient update requested by User ID: ${context.user_id} with role: ${context.role}`);
        const validateFields = validation_1.validation.validate(validations_1.SocialAssistanceRecipientValidation.UPDATE, req);
        // cek social-assistance-recipient
        const checkSocialAssistanceRecipient = yield social_assistance_recipient_repository_1.SocialAssistanceRecipientRepository.findById(id);
        if (!checkSocialAssistanceRecipient)
            throw new errors_1.NotfoundError("Mohon maaf, bantuan sosial tidak tersedia");
        if (checkSocialAssistanceRecipient.status !== client_1.Status.PENDING || validateFields.status === client_1.Status.PENDING)
            throw new errors_1.BadrequestError("Mohon maaf, perubahan status bantuan sosial tidak valid. Harap cek kembali datanya.");
        // cek jika ini bukan di tolak maka harus masuk ke pengecekan bukti image
        if (validateFields.status !== client_1.Status.REJECTED) {
            const checkImageSocialAssistanceRecipient = yield image_repository_1.ImageRepository.findByIdSocialAssistanceRecipientId(checkSocialAssistanceRecipient.id);
            if (!checkImageSocialAssistanceRecipient)
                throw new errors_1.BadrequestError("Mohon maaf, untuk segera mengupload bukti pemberian bansos terlebih dahulu sebelum menyelesaikan penerimaan bantuan sosial ini.");
        }
        const checkSocialAssistance = yield social_assistance_repository_1.SocialAssistanceRepository.findById(checkSocialAssistanceRecipient.social_assistance_id);
        if (!checkSocialAssistance)
            throw new errors_1.NotfoundError("Mohon maaf, bantuan sosial tidak tersedia.");
        const currentAmountSocialAssistance = new client_1.Prisma.Decimal(checkSocialAssistance.amount);
        const currentAmountSocialAssistanceRecipient = new client_1.Prisma.Decimal(checkSocialAssistanceRecipient.amount);
        const availableAmountSocialAssistance = currentAmountSocialAssistance.minus(currentAmountSocialAssistanceRecipient);
        const currentAmountIdr = (0, formatCurrency_1.formatCurrencyToIdr)(currentAmountSocialAssistance);
        if (currentAmountSocialAssistance.lt(currentAmountSocialAssistanceRecipient))
            throw new errors_1.BadrequestError(`Mohon maaf, Nominal pengajuan melebihi sisa bantuan sosial yang tersedia yaitu ${currentAmountIdr}.`);
        const result = yield db_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const resultSocialAssistanceRecipient = yield tx.socialAssistanceRecipient.update({
                where: {
                    id: checkSocialAssistanceRecipient.id
                },
                data: {
                    status: validateFields.status
                }
            });
            const resultSocialAssistance = yield tx.socialAssistance.update({
                where: {
                    id: checkSocialAssistance.id
                },
                data: {
                    amount: availableAmountSocialAssistance,
                    is_active: availableAmountSocialAssistance.gt(0)
                }
            });
            return { resultSocialAssistanceRecipient, resultSocialAssistance };
        }));
        if (!result)
            throw new errors_1.InternalServerError("Terjadi kesalahan saat mengubah penerima bantuan sosial.");
        return social_assistance_recipient_response_1.toSocialAssistanceRecipientResponse.response(result.resultSocialAssistanceRecipient);
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