import { Prisma } from "@prisma/client";
import { GetAllStaffRequest, GetAllStaffResponse } from "../../models/staff.model";
import { StaffRepository } from "../../repositories";
import { InternalServerError } from "../../utils/errors";
import { getPagination } from "../../utils/helpers/get-pagination";
import { toStaffResponse } from "../../utils/responses/staff-response";
import { StaffValidation } from "../../utils/validations/staff.validation";
import { validation } from "../../utils/validations/validation";


export const StaffCrudService = {
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

	getAll: async (req: GetAllStaffRequest): Promise<GetAllStaffResponse> => {
		const validateFields = validation.validate(StaffValidation.GETALL, req)

		let whereCondition: Prisma.StaffWhereInput = {}
		let orderByCondition: Prisma.StaffOrderByWithRelationInput = {}

		if (validateFields.sort) {
			orderByCondition = {
				user: {
					name: validateFields.sort
				}
			}
		} else {
			orderByCondition.created_at = "asc"
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
			]
		}

		let countCondition: Prisma.StaffCountArgs = {}
		const countResult = await StaffRepository.findCount(countCondition)

		const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = getPagination({count: countResult, pageRequest: validateFields.page, limitRequest: validateFields.limit})

		let finalFindAllCondition: Prisma.StaffFindManyArgs = {
			where: whereCondition,
			skip: limit * ( page - 1 ),
			take: limit,
			orderBy: orderByCondition
		}

		const result = await StaffRepository.findAll(finalFindAllCondition)
		if (!result) throw new InternalServerError("Gagal mengakses data users, please try again later!")

		return {
			data: toStaffResponse.withRelationesponses(result),
			pagination: {
				current_page: currentPage,
				limit: limit,
				links: links,
				total_page: totalPage,
				next_page: nextPage,
				prev_page: prevPage
			}
		}
	}
};
