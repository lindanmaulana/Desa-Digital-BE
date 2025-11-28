import { Prisma, UserRole } from "@prisma/client";
import { logger } from "../../logging";
import { GetAllStaffRequest, GetOneStaffRequest, StaffGetAllResponse, StaffGetOneResponse } from "../../models/staff.model";
import { StaffRepository } from "../../repositories";
import { TokenUser } from "../../types/token.type";
import { ForbiddenError, InternalServerError, NotfoundError } from "../../utils/errors";
import { getPagination } from "../../utils/helpers/get-pagination";
import { toStaffResponse } from "../../utils/responses/staff-response";
import { StaffValidation } from "../../utils/validations";
import { validation } from "../../utils/validations/validation";


export const StaffCrudService = {
	getAll: async (req: GetAllStaffRequest, context: TokenUser): Promise<StaffGetAllResponse> => {
		logger.info(`staff list requested by User ID: ${context.user_id} with role: ${context.role}`, {query: req})

		if (context.role !== UserRole.ADMIN) {
			logger.warn(`Forbidden access atempt for staff list by User ID: ${context.user_id}`)
			throw new ForbiddenError("Anda tidak memiliki akses untuk melihat daftar Staff")
		}

		const validateFields = validation.validate(StaffValidation.GETALL, req)

		let whereCondition: Prisma.StaffWhereInput = {}
		let orderByCondition: Prisma.StaffOrderByWithRelationInput = {
			created_at: "asc"
		}

		if (validateFields.sort) {
			orderByCondition = {
				user: {
					name: validateFields.sort
				}
			}
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

		logger.debug(`Executing COUNT query with WHERE condition: `, whereCondition)
		let countCondition: Prisma.StaffCountArgs = {where: whereCondition}
		const countResult = await StaffRepository.findCount(countCondition)

		const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = getPagination({count: countResult, pageRequest: validateFields.page, limitRequest: validateFields.limit})
		let finalFindAllCondition: Prisma.StaffFindManyArgs = {
			where: whereCondition,
			skip: limit * ( page - 1 ),
			take: limit,
			orderBy: orderByCondition
		}

		logger.debug(`Executing FIND_ALL query: ${finalFindAllCondition}`)
		const result = await StaffRepository.findAll(finalFindAllCondition)

		if (!result) {
			logger.error(`Failed to access staff data from repository for User ID: ${context.user_id}`)
			throw new InternalServerError("Gagal mengakses data users, please try again later!")
		}

		logger.info(`Successfully returned ${result.length} staff record to User ID: ${context.user_id}`)
		return {
			data: toStaffResponse.listResponse(result),
			pagination: {
				current_page: currentPage,
				limit: limit,
				links: links,
				total_page: totalPage,
				next_page: nextPage,
				prev_page: prevPage
			}
		}
	},

	getOne: async (req: GetOneStaffRequest, context: TokenUser): Promise<StaffGetOneResponse> => {
		logger.info(`detail staff requested by User ID: ${context.user_id} with role: ${context.role}`, {query: req})

		if (context.role !== UserRole.ADMIN) {
			logger.warn(`Forbidden access atempt for detail staff by User ID: ${context.user_id}`)
			throw new ForbiddenError("Anda tidak memiliki akses untu melihat detail staff")
		}

		const validateFields = validation.validate(StaffValidation.GETONE, req)

		const checkStaff = await StaffRepository.findDetailById(validateFields.id)
		if (!checkStaff) throw new NotfoundError("Pengguna tidak terdaftar sebagai staff")

		const result = await StaffRepository.findDetailById(checkStaff.id)
		if (!result) throw new InternalServerError("Gagal mengakses data staff, please try again later")

		return toStaffResponse.response(result)
	}
};
