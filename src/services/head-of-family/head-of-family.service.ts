import { Prisma } from "@prisma/client";
import { GetAllHeadOfFamilyRequest, GetAllHeadOfFamilyResponse } from "../../models/head-of-family.model";
import { validation } from "../../utils/validations/validation";
import { UserRepository } from "../../repositories";
import { getPagination } from "../../utils/helpers/get-pagination";
import { InternalServerError } from "../../utils/errors";
import userResponse from "../../utils/responses/user.,response";
import { HeadOfFamilyValidation } from "../../utils/validations/head-of-family.validation";

export const HeadOfFamilyService = {
	// static async update(user: Token, req: updateHead)

	getAll: async (req: GetAllHeadOfFamilyRequest): Promise<GetAllHeadOfFamilyResponse> => {
		const validateFields = validation.validate(HeadOfFamilyValidation.GETALL, req);

		let whereCondition: Prisma.UserWhereInput = {};
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

		let conditionCount: Prisma.UserCountArgs = { where: whereCondition };
		const count = await UserRepository.findCount(conditionCount);
		const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = getPagination({
			count,
			pageRequest: validateFields.page,
			limitRequest: validateFields.limit,
		});

		let conditionFindAll: Prisma.UserFindManyArgs = {
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

		const result = await UserRepository.findAll(conditionFindAll);
		if (!result) throw new InternalServerError("Gagal mengakses data user, please try again later");

		return {
			data: userResponse.toUserResponsesWithRelation(result),
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
};
