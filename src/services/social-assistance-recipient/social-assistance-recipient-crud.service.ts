import { Prisma } from "@prisma/client";
import { prismaClient } from "../../db";
import { logger } from "../../logging";
import {
	SocialAssistanceRecipientCreateRequest,
	SocialAssistanceRecipientGetAllRequest,
	SocialAssistanceRecipientGetAllResponse,
	SocialAssistanceRecipientGetOneRequest,
	SocialAssistanceRecipientGetOneResponse,
} from "../../models/social-assistance-recipient.model";
import { SocialAssistanceRecipientRepository } from "../../repositories/social-assistance-recipient.repository";
import { SocialAssistanceRepository } from "../../repositories/social-assistance.repository";
import { TokenUser } from "../../types/token.type";
import { BadrequestError, InternalServerError, NotfoundError } from "../../utils/errors";
import { getPagination } from "../../utils/helpers/get-pagination";
import { toSocialAssistanceRecipientResponse } from "../../utils/responses/social-assistance-recipient.response";
import { SocialAssistanceRecipientValidation } from "../../utils/validations";
import { validation } from "../../utils/validations/validation";
import { HeadOfFamilyRepository } from "../../repositories";

export const SocialAssistanceRecipientCrudService = {
	create: async (req: SocialAssistanceRecipientCreateRequest, context: TokenUser) => {
		logger.info(`Social assistance recipient create requested by User ID: ${context.user_id} with role ${context.role}`)
		const validateFields = validation.validate(SocialAssistanceRecipientValidation.CREATE, req);
		if (validateFields.amount <= 0) throw new BadrequestError("Nominal bantuan tidak valid!");

		const checkHeadOfFamily = await HeadOfFamilyRepository.findByUserId(context.user_id)
		if (!checkHeadOfFamily) throw new NotfoundError("Mohon maaf data pengguna pengajuan tidak terdaftar.")

		const checkSocialAssistance = await SocialAssistanceRepository.findById(validateFields.social_assistance_id);
		if (!checkSocialAssistance) throw new NotfoundError("Mohon maaf, bantuan sosial yang anda ajukan tidak tersedia.");
		if (!checkSocialAssistance.amount.gt(0) || !checkSocialAssistance.is_active) throw new BadrequestError("Mohon maaf, kuota penerima bantuan sosial saat ini telah terpenuhi.")

		const current = new Prisma.Decimal(checkSocialAssistance.amount);
		const reqAmount = new Prisma.Decimal(validateFields.amount);
		const availableBalance = current.minus(reqAmount);
		
		if (current.lt(reqAmount)) throw new BadrequestError("Mohon maaf, Nominal pengajuan anda melebihi sisa bantuan sosial yang tersedia");

		const result = await prismaClient.$transaction(async (tx) => {
			const newSocialAssistanceRecipient = await tx.socialAssistanceRecipient.create({
				data: {
					...validateFields,
					head_of_family_id: checkHeadOfFamily.id
				},
			});

			const reduceBalanceSocialAssistance = await tx.socialAssistance.update({
				where: {
					id: newSocialAssistanceRecipient.social_assistance_id,
				},

				data: {
					amount: availableBalance,
					is_active: availableBalance.gt(0),
				},
			});

			return { newSocialAssistanceRecipient, reduceBalanceSocialAssistance };
		});
		if (!result) throw new InternalServerError("Terjadi kesalahan saat mengajukan bantuan, please try again later.");

		return toSocialAssistanceRecipientResponse.response(result.newSocialAssistanceRecipient);
	},

	getAll: async (req: SocialAssistanceRecipientGetAllRequest, context: TokenUser): Promise<SocialAssistanceRecipientGetAllResponse> => {
		logger.info(`Social assistance recipient list requested by User ID: ${context.user_id} with role: ${context.role}`, { query: req });
		const validateFields = validation.validate(SocialAssistanceRecipientValidation.GETALL, req);

		let whereCondition: Prisma.SocialAssistanceRecipientWhereInput = {};
		let orderByCondition: Prisma.SocialAssistanceRecipientOrderByWithRelationInput = { created_at: "asc" };

		if (validateFields.sort) {
			orderByCondition = {
				social_assistance: {
					name: validateFields.sort,
				},
			};
		}

		if (validateFields.keyword) {
			whereCondition.social_assistance = {
				is: {
					name: {
						contains: validateFields.keyword,
						mode: "insensitive",
					},
				},
			};
		}

		logger.debug(`Executing COUNT query with WHERE condition: `, whereCondition);
		let countCondition: Prisma.SocialAssistanceRecipientCountArgs = { where: whereCondition };
		const countResult = await SocialAssistanceRecipientRepository.findCount(countCondition);

		const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = getPagination({
			count: countResult,
			limitRequest: validateFields.limit,
			pageRequest: validateFields.page,
		});

		const finalFindAllCondition: Prisma.SocialAssistanceRecipientFindManyArgs = {
			where: whereCondition,
			skip: limit * (page - 1),
			take: limit,
			orderBy: orderByCondition,
		};

		logger.debug(`Executing FIND_ALL query: ${finalFindAllCondition}`);
		const result = await SocialAssistanceRecipientRepository.findAll(finalFindAllCondition);
		if (!result) {
			logger.error(`Failed to access Social Assistance Recipient data from repository for User ID: ${context.user_id}`);
			throw new InternalServerError("Gagal mengakses data penerima bantuan sosial, please try again later.");
		}

		logger.info(`Successfully returned ${result.length} social assistance recipient record to User ID: ${context.user_id}`);
		return {
			data: toSocialAssistanceRecipientResponse.listResponse(result),
			pagination: {
				current_page: currentPage,
				limit: limit,
				links: links,
				total_page: totalPage,
				next_page: nextPage,
				prev_page: prevPage,
			},
		};
	},

	getOne: async (req: SocialAssistanceRecipientGetOneRequest, context: TokenUser): Promise<SocialAssistanceRecipientGetOneResponse> => {
		logger.info(`Social assistance recipient detail requested by User ID: ${context.user_id}`, { query: req });
		const validateFields = validation.validate(SocialAssistanceRecipientValidation.GETONE, req);

		logger.debug(`Executing check Social assistance recipient`);
		const checkSocialAssistanceRecipient = await SocialAssistanceRecipientRepository.findById(validateFields.id);
		if (!checkSocialAssistanceRecipient) {
			logger.error(`Failed Data Social assistance recipient detail not found from repository for User ID: ${context.user_id}`);
			throw new NotfoundError("Penerima bantuan sosial tidak ditemukan!");
		}

		logger.debug(`Executing FIND_DETAIL Social assistance recipient ID: ${checkSocialAssistanceRecipient.id}`);
		const result = await SocialAssistanceRecipientRepository.findDetailById(checkSocialAssistanceRecipient.id);
		if (!result) {
			logger.error(`Failed to access Social assistance recipient data from repository for User ID: ${context.user_id}`);
			throw new InternalServerError("Terjadi kesalahan, please try again later");
		}

		logger.info(`Successfully returned detail social assistance recipient record to User ID: ${context.user_id}`);
		return toSocialAssistanceRecipientResponse.detailResponse(result);
	},
};
