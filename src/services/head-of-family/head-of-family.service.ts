import { Prisma } from "@prisma/client";
import { GetAllHeadOfFamilyRequest, GetAllHeadOfFamilyResponse, GetOneHeadOfFamilyRequest, GetOneHeadOfFamilyResponse } from "../../models/head-of-family.model";
import { HeadOfFamilyRepository, UserRepository } from "../../repositories";
import { InternalServerError, NotfoundError } from "../../utils/errors";
import { getPagination } from "../../utils/helpers/get-pagination";
import { toUserResponse } from "../../utils/responses";
import { HeadOfFamilyValidation } from "../../utils/validations/head-of-family.validation";
import { validation } from "../../utils/validations/validation";
import { toHeadOfFamilyResponse } from "../../utils/responses/head-of-family-response";

export const HeadOfFamilyService = {
	// static async update(user: Token, req: updateHead)

	getAll: async (req: GetAllHeadOfFamilyRequest): Promise<GetAllHeadOfFamilyResponse> => {
		const validateFields = validation.validate(HeadOfFamilyValidation.GETALL, req);

		let whereCondition: Prisma.HeadOfFamilyWhereInput = { };
		let orderByCondition: Prisma.HeadOfFamilyOrderByWithRelationInput = {};

		if (validateFields.sort) {
			orderByCondition = {
				user: {
					name: validateFields.sort,
				},
			};
		} else {
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

		let conditionCount: Prisma.HeadOfFamilyCountArgs = { where: whereCondition };
		const count = await HeadOfFamilyRepository.findCount(conditionCount);

		const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = getPagination({
			count,
			pageRequest: validateFields.page,
			limitRequest: validateFields.limit,
		});

		let conditionFindAll: Prisma.HeadOfFamilyFindManyArgs = {
			where: whereCondition,
			skip: limit * (page - 1),
			take: limit,
			orderBy: orderByCondition,
		};

		const result = await HeadOfFamilyRepository.findAll(conditionFindAll);
		if (!result) throw new InternalServerError("Gagal mengakses data user, please try again later");

		return {
			data: toHeadOfFamilyResponse.responses(result),
			pagination: {
				total_page: totalPage,
				limit,
				current_page: currentPage,
				links,
				next_page: nextPage,
				prev_page: prevPage,
			},
		};
	},

	getOne: async (req: GetOneHeadOfFamilyRequest): Promise<GetOneHeadOfFamilyResponse> => {
		const validateFields = validation.validate(HeadOfFamilyValidation.GETONE, req)

		const checkUser = await UserRepository.findById(validateFields.id)
		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan!")

		const result = await HeadOfFamilyRepository.findById(checkUser.id)
		if (!result) throw new InternalServerError("Terjadi kesalahan saat mengambil data pengguna!")

		return toHeadOfFamilyResponse.response(result)
	}
};
