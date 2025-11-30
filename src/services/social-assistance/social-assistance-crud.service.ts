import { Prisma } from "@prisma/client";
import { SocialAssistanceCreateRequest, SocialAssistanceDeleteRequest, SocialAssistanceGetAllRequest, SocialAssistanceGetAllResponse, SocialAssistanceGetOneRequest, SocialAssistanceGetOneResponse, SocialAssistanceResponse, SocialAssistanceUpdateRequest } from "../../models/social-assistance.model";
import { SocialAssistanceRepository } from "../../repositories/social-assistance.repository";
import { BadrequestError, InternalServerError, NotfoundError } from "../../utils/errors";
import { getPagination } from "../../utils/helpers/get-pagination";
import { RESPONSE_MESSAGE } from "../../utils/response-message.type";
import { toSocialAssistanceResponse } from "../../utils/responses";
import { SocialAssistanceValidation } from "../../utils/validations/social-assistance.validation";
import { validation } from "../../utils/validations/validation";

export const SocialAssistanceCrudService = {
	create: async (req: SocialAssistanceCreateRequest): Promise<SocialAssistanceResponse> => {
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
				is_active: validateFields.is_active,
			},
		})

		if (!result) throw new InternalServerError("Pembuatan bantuan sosial gagal, please try again later")

		return toSocialAssistanceResponse.response(result)
	},

	getAll: async (req: SocialAssistanceGetAllRequest): Promise<SocialAssistanceGetAllResponse> => {
		const validateFields = validation.validate(SocialAssistanceValidation.GETALL, req)
		let whereCondition: Prisma.SocialAssistanceWhereInput = {}
		let orderByCondition: Prisma.SocialAssistanceOrderByWithRelationInput = {}

		if (validateFields.sort) {
			orderByCondition.name = validateFields.sort

		} else {
			orderByCondition.created_at = "asc"
		}

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

		let conditionCount: Prisma.SocialAssistanceCountArgs = {where: whereCondition}
		const count = await SocialAssistanceRepository.findCount(conditionCount)

		const {totalPage, links, nextPage, prevPage, page, limit, currentPage} = getPagination({count, pageRequest: validateFields.page, limitRequest: validateFields.limit})

		let conditionFindAll: Prisma.SocialAssistanceFindManyArgs = {
			where: whereCondition,
			skip: limit * (page - 1),
			take: limit,
			orderBy: orderByCondition
		}

		const result = await SocialAssistanceRepository.findAll(conditionFindAll)
		if (!result) throw new InternalServerError(`${RESPONSE_MESSAGE.error.read} Bantuan Sosial, please try again later`)

		return {
			data: toSocialAssistanceResponse.listResponse(result),
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

	getOne: async (req: SocialAssistanceGetOneRequest): Promise<SocialAssistanceGetOneResponse> => {
		const validateFields = validation.validate(SocialAssistanceValidation.GETONE, req)

		const result = await SocialAssistanceRepository.findOne(validateFields.id)
		if (!result) throw new NotfoundError("Bantuan Sosial tidak tersedia!")

		return toSocialAssistanceResponse.detailResponse(result)
	},

	update: async (id: string, req: SocialAssistanceUpdateRequest): Promise<SocialAssistanceResponse> => {
		const validateFields = validation.validate(SocialAssistanceValidation.UPDATE, req)

		console.log({cekActive: validateFields.is_active})
		if (Object.keys(req).length <= 0) throw new BadrequestError("Badan permintaan kosong. Masukkan setidaknya satu field untuk diperbarui.")

		const conditions = Object.keys(validateFields).reduce((acc, key) => {
			const value = validateFields[key as keyof typeof validateFields]

			if (value !== undefined || value !== null) (acc as any)[key as keyof typeof validateFields] = value

			return acc
		}, {} as Partial<SocialAssistanceUpdateRequest>)

		console.log({conditions})

		const cleanDataForPrisma = conditions as Prisma.SocialAssistanceUpdateInput

		const prismaUpdateArgs: Prisma.SocialAssistanceUpdateArgs = {
			where: {id},
			data: cleanDataForPrisma
		}

		const result = await SocialAssistanceRepository.update(prismaUpdateArgs)

		if (!result) throw new InternalServerError("Terjadi kesalahan saat update data, please try again later")

		return toSocialAssistanceResponse.response(result)
	},

	delete: async (req: SocialAssistanceDeleteRequest) => {
		const validateFields = validation.validate(SocialAssistanceValidation.DELETE, req)

		const checkSocialAssistance = await SocialAssistanceRepository.findById(validateFields.id)
		if (!checkSocialAssistance) throw new NotfoundError("Bantuan Sosial tidak tersedia!")

		const result = await SocialAssistanceRepository.delete(checkSocialAssistance.id)
		if (!result) throw new InternalServerError("Terjadi kesalahan saat menghapus data Bantuan Sosial ini!, please try again later")

		return toSocialAssistanceResponse.response(result)
	}
}
