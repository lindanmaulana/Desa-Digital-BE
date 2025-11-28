import { Prisma } from "@prisma/client";
import { HeadOfFamilyGetAllRequest, HeadOfFamilyGetAllResponse, HeadOfFamilyGetOneRequest, HeadOfFamilyGetOneResponse } from "../../models/head-of-family.model";
import { HeadOfFamilyRepository } from "../../repositories";
import { InternalServerError, NotfoundError } from "../../utils/errors";
import { getPagination } from "../../utils/helpers/get-pagination";
import { toHeadOfFamilyResponse } from "../../utils/responses/head-of-family-response";
import { HeadOfFamilyValidation } from "../../utils/validations/head-of-family.validation";
import { validation } from "../../utils/validations/validation";

export const HeadOfFamilyService = {
	getAll: async (req: HeadOfFamilyGetAllRequest): Promise<HeadOfFamilyGetAllResponse> => {
		const validateFields = validation.validate(HeadOfFamilyValidation.GETALL, req);

		let whereCondition: Prisma.HeadOfFamilyWhereInput = {};
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
			data: toHeadOfFamilyResponse.listResponse(result),
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

	getOne: async (req: HeadOfFamilyGetOneRequest): Promise<HeadOfFamilyGetOneResponse> => {
		const validateFields = validation.validate(HeadOfFamilyValidation.GETONE, req);

		const result = await HeadOfFamilyRepository.findDetailById(validateFields.id);
		if (!result) throw new NotfoundError("Pengguna tidak ditemukan!");

		return toHeadOfFamilyResponse.detailResponse(result);
	},
};
