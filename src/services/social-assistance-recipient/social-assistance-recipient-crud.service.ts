import { Prisma, Status } from "@prisma/client";
import { prismaClient } from "../../db";
import { logger } from "../../logging";
import {
	SocialAssistanceRecipientCreateRequest,
	SocialAssistanceRecipientGetAllRequest,
	SocialAssistanceRecipientGetAllResponse,
	SocialAssistanceRecipientGetOneRequest,
	SocialAssistanceRecipientGetOneResponse,
	SocialAssistanceRecipientResponse,
	SocialAssistanceRecipientUpdateRequest
} from "../../models/social-assistance-recipient.model";
import { HeadOfFamilyRepository } from "../../repositories";
import { ImageRepository } from "../../repositories/image.repository";
import { SocialAssistanceRecipientRepository } from "../../repositories/social-assistance-recipient.repository";
import { SocialAssistanceRepository } from "../../repositories/social-assistance.repository";
import { TokenUser } from "../../types/token.type";
import { BadrequestError, InternalServerError, NotfoundError } from "../../utils/errors";
import { formatCurrencyToIdr } from "../../utils/helpers/formatCurrency";
import { getPagination } from "../../utils/helpers/get-pagination";
import { toSocialAssistanceRecipientResponse } from "../../utils/responses/social-assistance-recipient.response";
import { SocialAssistanceRecipientValidation } from "../../utils/validations";
import { validation } from "../../utils/validations/validation";

export const SocialAssistanceRecipientCrudService = {
	create: async (req: SocialAssistanceRecipientCreateRequest, context: TokenUser): Promise<SocialAssistanceRecipientResponse> => {
		logger.info(`Social assistance recipient create requested by User ID: ${context.user_id} with role ${context.role}`)

		const validateFields = validation.validate(SocialAssistanceRecipientValidation.CREATE, req);
		if (validateFields.amount <= 0) throw new BadrequestError("Nominal bantuan tidak valid!");

		const checkHeadOfFamily = await HeadOfFamilyRepository.findByUserId(context.user_id)
		if (!checkHeadOfFamily) throw new NotfoundError("Mohon maaf data pengguna pengajuan tidak terdaftar.")

		const checkSocialAssistance = await SocialAssistanceRepository.findById(validateFields.social_assistance_id);
		if (!checkSocialAssistance) throw new NotfoundError("Mohon maaf, bantuan sosial yang anda ajukan tidak tersedia.");
		// validasi ini belum di test
		if (!checkSocialAssistance.amount.gt(0) || !checkSocialAssistance.is_active) throw new BadrequestError("Mohon maaf, kuota penerima bantuan sosial saat ini telah terpenuhi.")

		const checkSocialAssistanceRecipient = await SocialAssistanceRecipientRepository.findByHeadOfFamilyId(checkHeadOfFamily.id, checkSocialAssistance.id)
		if (checkSocialAssistanceRecipient) throw new BadrequestError("Mohon maaf, anda telah melakukan pengajuan untuk bantuan sosial ini.")

		const currentAmount = new Prisma.Decimal(checkSocialAssistance.amount);
		const reqAmount = new Prisma.Decimal(validateFields.amount);

		const currentAmountIdr = formatCurrencyToIdr(currentAmount)
		if (currentAmount.lt(reqAmount)) throw new BadrequestError(`Mohon maaf, Nominal pengajuan anda melebihi sisa bantuan sosial yang tersedia yaitu ${currentAmountIdr}`);

		const result = await SocialAssistanceRecipientRepository.create(checkHeadOfFamily.id, validateFields)
		if (!result) throw new InternalServerError("Terjadi kesalahan saat mengajukan bantuan, please try again later.");

		return toSocialAssistanceRecipientResponse.response(result);
	},

	update: async (id: string, req: SocialAssistanceRecipientUpdateRequest, context: TokenUser): Promise<SocialAssistanceRecipientResponse> => {
		logger.info(`Social assistance recipient update requested by User ID: ${context.user_id} with role: ${context.role}`)
		const validateFields = validation.validate(SocialAssistanceRecipientValidation.UPDATE, req)

		// cek social-assistance-recipient
		const checkSocialAssistanceRecipient = await SocialAssistanceRecipientRepository.findById(id)
		if (!checkSocialAssistanceRecipient) throw new NotfoundError("Mohon maaf, bantuan sosial tidak tersedia")
		if (checkSocialAssistanceRecipient.status !== Status.PENDING || validateFields.status === Status.PENDING) throw new BadrequestError("Mohon maaf, perubahan status bantuan sosial tidak valid. Harap cek kembali datanya.")

		// cek jika ini bukan di tolak maka harus masuk ke pengecekan bukti image
		if (validateFields.status !== Status.REJECTED) {
			const checkImageSocialAssistanceRecipient = await ImageRepository.findByIdSocialAssistanceRecipient(checkSocialAssistanceRecipient.id)
			if (!checkImageSocialAssistanceRecipient) throw new BadrequestError("Mohon maaf, untuk segera mengupload bukti pemberian bansos terlebih dahulu sebelum menyelesaikan penerimaan bantuan sosial ini.")
		}

		const checkSocialAssistance = await SocialAssistanceRepository.findById(checkSocialAssistanceRecipient.social_assistance_id)
		if (!checkSocialAssistance) throw new NotfoundError("Mohon maaf, bantuan sosial tidak tersedia.")

		const currentAmountSocialAssistance = new Prisma.Decimal(checkSocialAssistance.amount)
		const currentAmountSocialAssistanceRecipient = new Prisma.Decimal(checkSocialAssistanceRecipient.amount)
		const availableAmountSocialAssistance = currentAmountSocialAssistance.minus(currentAmountSocialAssistanceRecipient)

		if (currentAmountSocialAssistance.lt(currentAmountSocialAssistanceRecipient)) throw new BadrequestError("Mohon maaf, Nominal pengajuan anda melebihi sisa bantuan sosial yang tersedia.")

		const result = await prismaClient.$transaction(async (tx) => {
			const resultSocialAssistanceRecipient = await tx.socialAssistanceRecipient.update({
				where: {
					id: checkSocialAssistanceRecipient.id
				},

				data: {
					status: validateFields.status
				}
			})

			const resultSocialAssistance = await tx.socialAssistance.update({
				where: {
					id: checkSocialAssistance.id
				},

				data: {
					amount: availableAmountSocialAssistance,
					is_active: availableAmountSocialAssistance.gt(0)
				}
			})

			return {resultSocialAssistanceRecipient, resultSocialAssistance}
		})

		if (!result) throw new InternalServerError("Terjadi kesalahan saat mengubah penerima bantuan sosial.")

		return toSocialAssistanceRecipientResponse.response(result.resultSocialAssistanceRecipient)
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
