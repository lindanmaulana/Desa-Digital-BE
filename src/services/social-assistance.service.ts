import { Prisma } from "@prisma/client";
import { CreateSocialAssistanceRequest, GetAllSocialAssistanceRequest, GetAllSocialAssistanceUserResponse, SocialAssistanceResponse, UpdateSocialAssistanceRequest, UpdateSocialAssistanceSchema } from "../models/social-assistance.model";
import { SocialAssistanceRepository } from "../repositories/social-assistance.repository";
import { BadrequestError, InternalServerError } from "../utils/errors";
import helpers from "../utils/helpers";
import { RESPONSE_MESSAGE } from "../utils/response-message.type";
import responses from "../utils/responses";
import { SocialAssistanceValidation, ValidatedFieldsUpdate } from "../utils/validations/social-assistance.validation";
import { validation } from "../utils/validations/validation";

export class SocialAssistanceService {
	static async create(req: CreateSocialAssistanceRequest): Promise<SocialAssistanceResponse> {
		const validateFields = validation.validate(SocialAssistanceValidation.CREATE, req)

		if (validateFields.amount && validateFields.amount < 0) throw new BadrequestError("Nominal bantuan tidak valid")

		const result = await SocialAssistanceRepository.create({
			data: {
				thumbnail: validateFields.thumbnail,
				name: validateFields.name,
				category: validateFields.category,
				amount: validateFields.amount,
				provider: validateFields.provider,
				description: validateFields.description,
				is_active: validateFields.is_active
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

		if (validateFields.category) {
			whereCondition.category = validateFields.category
		}

		if (validateFields.is_active && (validateFields.is_active !== undefined || validateFields.is_active !== null)) {
			whereCondition.is_active = validateFields.is_active
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

	static async update(id: string, req: UpdateSocialAssistanceRequest): Promise<SocialAssistanceResponse> {
		const validateFields: ValidatedFieldsUpdate = validation.validate(SocialAssistanceValidation.UPDATE, req)

		let updateData: Partial<UpdateSocialAssistanceSchema> = {}

		if (validateFields.thumbnail) updateData.thumbnail = validateFields.thumbnail

		if (validateFields.name) updateData.name = validateFields.name

		if (validateFields.category !== undefined && validateFields.category !== null) updateData.category = validateFields.category

		if (validateFields.provider) updateData.provider = validateFields.provider

		if (validateFields.amount && validateFields.amount > 0) updateData.amount = validateFields.amount

		if (validateFields.description) updateData.description = validateFields.description

		if (validateFields.is_active && (!validateFields.is_active === undefined || !validateFields.is_active === null)) updateData.is_active = validateFields.is_active

		const conditions: Prisma.SocialAssistanceUpdateArgs = {
			where: {id},
			data: updateData
		}

		const result = await SocialAssistanceRepository.update(conditions)

		if (!result) throw new InternalServerError("Terjadi kesalahan saat update data, please try again later")

		return responses.socialAssistanceResponse.toSocialAssistanceResponse(result)
	}
}
