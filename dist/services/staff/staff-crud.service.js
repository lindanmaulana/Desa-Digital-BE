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
const repositories_1 = require("../../repositories");
const errors_1 = require("../../utils/errors");
const get_pagination_1 = require("../../utils/helpers/get-pagination");
const staff_response_1 = require("../../utils/responses/staff-response");
const staff_validation_1 = require("../../utils/validations/staff.validation");
const validation_1 = require("../../utils/validations/validation");
exports.StaffCrudService = {
    // async update(user: TokenUser, req: UpdateStaffRequest): Promise<StaffResponse> {
    // 	const validateFields = validation.validate(StaffValidation.UPDATE, req);
    // 	const checkUser = await UserRepository.findById(user.user_id);
    // 	if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan!");
    // 	const checkStaff = await StaffRepository.findByUserId(checkUser.id);
    // 	if (!checkStaff) throw new NotfoundError("Pengguna belum terdaftar sebagai Staf");
    // 	// if (validateFields.profile_picture) {
    // 	// 	const imageExist = helpers.fileHelpers.checkImage(validateFields.profile_picture)
    // 	// 	if (!imageExist) throw new NotfoundError("Image tidak ditemukan")
    // 	// 	if (checkStaff.profile_picture) helpers.fileHelpers.deleteImage(checkStaff.profile_picture)
    // 	// }
    // 	const data = removeUndefined(validateFields);
    // 	const result = await StaffRepository.update({
    // 		where: { id: checkStaff.id },
    // 		data: data,
    // 	});
    // 	if (!result) throw new InternalServerError("Terjadi kesalahan saat mengupdate data, please try again later");
    // 	return staffResponse.toStaffResponse(result);
    // },
    getAll: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(staff_validation_1.StaffValidation.GETALL, req);
        let whereCondition = {};
        let orderByCondition = {};
        if (validateFields.sort) {
            orderByCondition = {
                user: {
                    name: validateFields.sort
                }
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
        let countCondition = {};
        const countResult = yield repositories_1.StaffRepository.findCount(countCondition);
        const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = (0, get_pagination_1.getPagination)({ count: countResult, pageRequest: validateFields.page, limitRequest: validateFields.limit });
        let finalFindAllCondition = {
            where: whereCondition,
            skip: limit * (page - 1),
            take: limit,
            orderBy: orderByCondition
        };
        const result = yield repositories_1.StaffRepository.findAll(finalFindAllCondition);
        if (!result)
            throw new errors_1.InternalServerError("Gagal mengakses data users, please try again later!");
        return {
            data: staff_response_1.toStaffResponse.withRelationesponses(result),
            pagination: {
                current_page: currentPage,
                limit: limit,
                links: links,
                total_page: totalPage,
                next_page: nextPage,
                prev_page: prevPage
            }
        };
    })
};
//# sourceMappingURL=staff-crud.service.js.map