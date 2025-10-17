import { CategorySocialAssistance, Prisma } from "@prisma/client";
import { CreateSocialAssistanceRequest, GetAllSocialAssistanceRequest, GetAllSocialAssistanceUserResponse, SocialAssistanceResponse, UpdateSocialAssistanceRequest } from "../models/social-assistance.model";
import { SocialAssistanceRepository } from "../repositories/social-assistance.repository";
import { BadrequestError, InternalServerError } from "../utils/errors";
import responses from "../utils/responses";
import { SocialAssistanceValidation } from "../utils/validations/social-assistance.validation";
import { validation } from "../utils/validations/validation";
import helpers from "../utils/helpers";
import { RESPONSE_MESSAGE } from "../utils/response-message.type";

export class SocialAssistanceService {
	static async create(req: CreateSocialAssistanceRequest): Promise<SocialAssistanceResponse> {
		const validateFields = validation.validate(SocialAssistanceValidation.CREATE, req)

		if (validateFields.amount && Number(validateFields.amount) < 0) throw new BadrequestError("Nominal bantuan tidak valid")

		const result = await SocialAssistanceRepository.create({
			data: {
				thumbnail: validateFields.thumbnail ?? null,
				name: validateFields.name,
				category: (validateFields.category as CategorySocialAssistance) ?? undefined,
				amount: validateFields.amount,
				provider: validateFields.provider,
				description: validateFields.description ?? null,
				is_active: validateFields.is_active === "true",
			},
		})

		if (!result) throw new InternalServerError("Pembuatan bantuan sosial gagal, please try again later")

		return responses.socialAssistanceResponse.toSocialAssistanceResponse(result)
	}

	static async getAll(req: GetAllSocialAssistanceRequest): Promise<GetAllSocialAssistanceUserResponse> {
		const validateFields = validation.validate(SocialAssistanceValidation.GETALL, req)

		let whereCondition: Prisma.SocialAssistanceWhereInput = {}

		if (validateFields.keyword) {
			whereCondition = {
				...whereCondition,
				OR: [
					{
						name: {
							contains: validateFields.keyword,
							mode: "insensitive"
						},
						provider: {
							contains: validateFields.keyword,
							mode: "insensitive"
						}
					}
				]
			}
		}

		if (validateFields.category && Object.values(CategorySocialAssistance).includes(validateFields.category as CategorySocialAssistance)) {
			const searchCategory = validateFields.category as CategorySocialAssistance
			whereCondition = {
				...whereCondition,
				category: searchCategory
			}
		}

		if (validateFields.is_active) {
			whereCondition = {
				...whereCondition,
				is_active: validateFields.is_active === "true"
			}
		}

		let conditionCount: Prisma.SocialAssistanceCountArgs = {where: whereCondition}
		const count = await SocialAssistanceRepository.findCount(conditionCount)

		const {totalPage, links, nextPage, prevPage, page, limit, currentPage} = helpers.getPagination({count, pageRequest: validateFields.page, limitRequest: validateFields.limit})

		let conditionFindAll: Prisma.SocialAssistanceFindManyArgs = {
			where: whereCondition,
			skip: limit * (page - 1),
			take: limit,
		}

		const result = await SocialAssistanceRepository.findAll(conditionFindAll)

		if (!result) throw new InternalServerError(`${RESPONSE_MESSAGE.error.read} Bantuan Sosial, please try again later`)

		return {
			data: responses.socialAssistanceResponse.toSocialAssistanceResponses(result),
			pagination: {
				total_page: totalPage,
				limit,
				current_page: currentPage,
				links: links,
				next_page: nextPage,
				prev_page: prevPage,
			}
		}
	}

	static async update(req: UpdateSocialAssistanceRequest): Promise<SocialAssistanceResponse> {
		const validateFields = validation.validate(SocialAssistanceValidation.UPDATE, req)

		let updateData: Partial<UpdateSocialAssistanceRequest> = {}

		if (validateFields.name) {
			updateData = {
				...updateData,
				name: validateFields.name,
			}
		}

		if (validateFields.category && Object.values(CategorySocialAssistance).includes(validateFields.category as CategorySocialAssistance)) {
			updateData = {
				...updateData,
				category: validateFields.category
			}
		}

		if (validateFields.provider) {
			updateData = {
				...updateData,
				provider: validateFields.provider
			}
		}
	}
}
