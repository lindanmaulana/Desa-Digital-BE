import { Prisma } from "@prisma/client";
import { CreateSocialAssistanceRequest, GetAllSocialAssistanceRequest, GetAllSocialAssistanceUserResponse, SocialAssistanceResponse, UpdateSocialAssistanceRequest } from "../../models/social-assistance.model";
import { SocialAssistanceValidation } from "../../utils/validations/social-assistance.validation";
import { BadrequestError, InternalServerError } from "../../utils/errors";
import { SocialAssistanceRepository } from "../../repositories/social-assistance.repository";
import socialAssistanceResponse from "../../utils/responses/social-assistance-response";
import { validation } from "../../utils/validations/validation";
import { getPagination } from "../../utils/helpers/get-pagination";
import { RESPONSE_MESSAGE } from "../../utils/response-message.type";

export const SocialAssistanceCrudService = {
	create: async (req: CreateSocialAssistanceRequest): Promise<SocialAssistanceResponse> => {
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

		return socialAssistanceResponse.toSocialAssistanceResponse(result)
	},

	getAll: async (req: GetAllSocialAssistanceRequest): Promise<GetAllSocialAssistanceUserResponse> => {
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

		const {totalPage, links, nextPage, prevPage, page, limit, currentPage} = getPagination({count, pageRequest: validateFields.page, limitRequest: validateFields.limit})

		let conditionFindAll: Prisma.SocialAssistanceFindManyArgs = {
			where: whereCondition,
			skip: limit * (page - 1),
			take: limit,
		}

		const result = await SocialAssistanceRepository.findAll(conditionFindAll)

		if (!result) throw new InternalServerError(`${RESPONSE_MESSAGE.error.read} Bantuan Sosial, please try again later`)

		return {
			data: socialAssistanceResponse.toSocialAssistanceResponses(result),
			pagination: {
				total_page: totalPage,
				limit,
				current_page: currentPage,
				links: links,
				next_page: nextPage,
				prev_page: prevPage,
			}
		}
	},

	update: async (id: string, req: UpdateSocialAssistanceRequest): Promise<SocialAssistanceResponse> => {
		const validateFields = validation.validate(SocialAssistanceValidation.UPDATE, req)

		console.log({cekActive: validateFields.is_active})

		if (Object.keys(req).length <= 0) throw new BadrequestError("Badan permintaan kosong. Masukkan setidaknya satu field untuk diperbarui.")

		const conditions = Object.keys(validateFields).reduce((acc, key) => {
			const value = validateFields[key as keyof typeof validateFields]

			if (value !== undefined || value !== null) (acc as any)[key as keyof typeof validateFields] = value

			return acc
		}, {} as Partial<UpdateSocialAssistanceRequest>)

		console.log({conditions})

		const cleanDataForPrisma = conditions as Prisma.SocialAssistanceUpdateInput

		const prismaUpdateArgs: Prisma.SocialAssistanceUpdateArgs = {
			where: {id},
			data: cleanDataForPrisma
		}

		const result = await SocialAssistanceRepository.update(prismaUpdateArgs)

		if (!result) throw new InternalServerError("Terjadi kesalahan saat update data, please try again later")

		return socialAssistanceResponse.toSocialAssistanceResponse(result)
	},
}
