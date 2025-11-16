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
exports.HeadOfFamilyService = void 0;
const validation_1 = require("../../utils/validations/validation");
const repositories_1 = require("../../repositories");
const get_pagination_1 = require("../../utils/helpers/get-pagination");
const errors_1 = require("../../utils/errors");
const user__response_1 = __importDefault(require("../../utils/responses/user.,response"));
const head_of_family_validation_1 = require("../../utils/validations/head-of-family.validation");
exports.HeadOfFamilyService = {
    // static async update(user: Token, req: updateHead)
    getAll: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(head_of_family_validation_1.HeadOfFamilyValidation.GETALL, req);
        let whereCondition = {};
        whereCondition.role = "HEAD_OF_FAMILY";
        if (validateFields.keyword) {
            whereCondition.OR = [
                {
                    name: {
                        contains: validateFields.keyword,
                        mode: "insensitive",
                    },
                },
                {
                    head_of_family: {
                        is: {
                            identity_number: {
                                contains: validateFields.keyword,
                                mode: "insensitive"
                            },
                        }
                    },
                },
            ];
        }
        let conditionCount = { where: whereCondition };
        const count = yield repositories_1.UserRepository.findCount(conditionCount);
        const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = (0, get_pagination_1.getPagination)({
            count,
            pageRequest: validateFields.page,
            limitRequest: validateFields.limit,
        });
        let conditionFindAll = {
            where: whereCondition,
            skip: limit * (page - 1),
            take: limit,
            include: {
                head_of_family: true,
                image: true,
            },
            orderBy: {
                created_at: "desc",
            },
        };
        const result = yield repositories_1.UserRepository.findAll(conditionFindAll);
        if (!result)
            throw new errors_1.InternalServerError("Gagal mengakses data user, please try again later");
        return {
            data: user__response_1.default.toUserResponsesWithRelation(result),
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
};
//# sourceMappingURL=head-of-family.service.js.map