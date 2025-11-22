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
exports.HeadOfFamilyService = void 0;
const repositories_1 = require("../../repositories");
const errors_1 = require("../../utils/errors");
const get_pagination_1 = require("../../utils/helpers/get-pagination");
const head_of_family_response_1 = require("../../utils/responses/head-of-family-response");
const head_of_family_validation_1 = require("../../utils/validations/head-of-family.validation");
const validation_1 = require("../../utils/validations/validation");
exports.HeadOfFamilyService = {
    getAll: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(head_of_family_validation_1.HeadOfFamilyValidation.GETALL, req);
        let whereCondition = {};
        let orderByCondition = {};
        if (validateFields.sort) {
            orderByCondition = {
                user: {
                    name: validateFields.sort,
                },
            };
        }
        else {
            orderByCondition.created_at = "asc";
        }
        if (validateFields.keyword) {
            whereCondition.OR = [
                {
                    identity_number: {
                        contains: validateFields.keyword,
                        mode: "insensitive",
                    },
                },
                {
                    user: {
                        is: {
                            name: {
                                contains: validateFields.keyword,
                                mode: "insensitive",
                            },
                        },
                    },
                },
            ];
        }
        let conditionCount = { where: whereCondition };
        const count = yield repositories_1.HeadOfFamilyRepository.findCount(conditionCount);
        const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = (0, get_pagination_1.getPagination)({
            count,
            pageRequest: validateFields.page,
            limitRequest: validateFields.limit,
        });
        let conditionFindAll = {
            where: whereCondition,
            skip: limit * (page - 1),
            take: limit,
            orderBy: orderByCondition,
        };
        const result = yield repositories_1.HeadOfFamilyRepository.findAll(conditionFindAll);
        if (!result)
            throw new errors_1.InternalServerError("Gagal mengakses data user, please try again later");
        return {
            data: head_of_family_response_1.toHeadOfFamilyResponse.withRelationesponses(result),
            pagination: {
                total_page: totalPage,
                limit,
                current_page: currentPage,
                links,
                next_page: nextPage,
                prev_page: prevPage,
            },
        };
    }),
    getOne: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(head_of_family_validation_1.HeadOfFamilyValidation.GETONE, req);
        const result = yield repositories_1.HeadOfFamilyRepository.findByIdDetail(validateFields.id);
        if (!result)
            throw new errors_1.NotfoundError("Pengguna tidak ditemukan!");
        return head_of_family_response_1.toHeadOfFamilyResponse.withRelationResponse(result);
    }),
};
//# sourceMappingURL=head-of-family.service.js.map