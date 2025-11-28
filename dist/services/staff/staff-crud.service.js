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
exports.StaffCrudService = void 0;
const client_1 = require("@prisma/client");
const logging_1 = require("../../logging");
const repositories_1 = require("../../repositories");
const errors_1 = require("../../utils/errors");
const get_pagination_1 = require("../../utils/helpers/get-pagination");
const staff_response_1 = require("../../utils/responses/staff-response");
const validations_1 = require("../../utils/validations");
const validation_1 = require("../../utils/validations/validation");
exports.StaffCrudService = {
    getAll: (req, context) => __awaiter(void 0, void 0, void 0, function* () {
        logging_1.logger.info(`staff list requested by User ID: ${context.user_id} with role: ${context.role}`, { query: req });
        if (context.role !== client_1.UserRole.ADMIN) {
            logging_1.logger.warn(`Forbidden access atempt for staff list by User ID: ${context.user_id}`);
            throw new errors_1.ForbiddenError("Anda tidak memiliki akses untuk melihat daftar Staff");
        }
        const validateFields = validation_1.validation.validate(validations_1.StaffValidation.GETALL, req);
        let whereCondition = {};
        let orderByCondition = {
            created_at: "asc"
        };
        if (validateFields.sort) {
            orderByCondition = {
                user: {
                    name: validateFields.sort
                }
            };
        }
        if (validateFields.keyword) {
            whereCondition.OR = [
                {
                    identity_number: {
                        contains: validateFields.keyword,
                        mode: "insensitive"
                    }
                },
                {
                    user: {
                        is: {
                            name: {
                                contains: validateFields.keyword,
                                mode: "insensitive"
                            }
                        }
                    }
                }
            ];
        }
        logging_1.logger.debug(`Executing COUNT query with WHERE condition: `, whereCondition);
        let countCondition = { where: whereCondition };
        const countResult = yield repositories_1.StaffRepository.findCount(countCondition);
        const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = (0, get_pagination_1.getPagination)({ count: countResult, pageRequest: validateFields.page, limitRequest: validateFields.limit });
        let finalFindAllCondition = {
            where: whereCondition,
            skip: limit * (page - 1),
            take: limit,
            orderBy: orderByCondition
        };
        logging_1.logger.debug(`Executing FIND_ALL query: ${finalFindAllCondition}`);
        const result = yield repositories_1.StaffRepository.findAll(finalFindAllCondition);
        if (!result) {
            logging_1.logger.error(`Failed to access staff data from repository for User ID: ${context.user_id}`);
            throw new errors_1.InternalServerError("Gagal mengakses data users, please try again later!");
        }
        logging_1.logger.info(`Successfully returned ${result.length} staff record to User ID: ${context.user_id}`);
        return {
            data: staff_response_1.toStaffResponse.listResponse(result),
            pagination: {
                current_page: currentPage,
                limit: limit,
                links: links,
                total_page: totalPage,
                next_page: nextPage,
                prev_page: prevPage
            }
        };
    }),
    getOne: (req, context) => __awaiter(void 0, void 0, void 0, function* () {
        logging_1.logger.info(`detail staff requested by User ID: ${context.user_id} with role: ${context.role}`, { query: req });
        if (context.role !== client_1.UserRole.ADMIN) {
            logging_1.logger.warn(`Forbidden access atempt for detail staff by User ID: ${context.user_id}`);
            throw new errors_1.ForbiddenError("Anda tidak memiliki akses untu melihat detail staff");
        }
        const validateFields = validation_1.validation.validate(validations_1.StaffValidation.GETONE, req);
        const checkStaff = yield repositories_1.StaffRepository.findDetailById(validateFields.id);
        if (!checkStaff)
            throw new errors_1.NotfoundError("Pengguna tidak terdaftar sebagai staff");
        const result = yield repositories_1.StaffRepository.findDetailById(checkStaff.id);
        if (!result)
            throw new errors_1.InternalServerError("Gagal mengakses data staff, please try again later");
        return staff_response_1.toStaffResponse.response(result);
    })
};
//# sourceMappingURL=staff-crud.service.js.map