import { Prisma } from "@prisma/client";
import { CreateVillageProfileRequest, UpdateVillageProfileRequest, VillageProfileResponse } from "../models/village-profile";
import repositories from "../repositories";
import { BadrequestError, InternalServerError, NotfoundError } from "../utils/errors";
import responses from "../utils/responses";
import { validation } from "../utils/validations/validation";
import { VillageProfileValidation } from "../utils/validations/village-profile.validation";
import { logger } from "../logging";

export class VillageProfileService {
	static async create(req: CreateVillageProfileRequest): Promise<VillageProfileResponse> {
		const validateFields = validation.validate(VillageProfileValidation.CREATE, req)

		const checkVillageProfile = await repositories.VillageProfileRepository.checkCount()

		if (checkVillageProfile) throw new BadrequestError("Maaf Profile Desa sudah ada, tidak dapat menambahkan kembali Profile Desa baru")

		const result = await repositories.VillageProfileRepository.create({
			data: validateFields
		})

		if (!result) throw new InternalServerError("Maaf terjadi kesalahan saat menambahkan Profile Desa, please try again later")

		return responses.villageProfileResponse.toVillageProfileResponse(result)
	}

	static async get(): Promise<VillageProfileResponse> {
		const result = await repositories.VillageProfileRepository.findOne()

		if (!result) throw new NotfoundError("Profile Desa tidak tersedia")

		return responses.villageProfileResponse.toVillageProfileResponse(result)
	}

	static async update(id: string, req: UpdateVillageProfileRequest): Promise<VillageProfileResponse> {
		const validateFields = validation.validate(VillageProfileValidation.UPDATE, req)

		if (Object.keys(req).length <= 0) throw new BadrequestError("Maaf tidak ada data yang bisa di update")

		const checkVillageProfile = await repositories.VillageProfileRepository.findById(id)

		if (!checkVillageProfile) throw new NotfoundError("Profile Desa tidak di temukan")

		const condition = Object.keys(validateFields).reduce((acc, key) => {
			const value = validateFields[key as keyof typeof validateFields]

			if (value) (acc as any)[key as keyof typeof validateFields] = value

			return acc
		}, {} as Partial<UpdateVillageProfileRequest>)

		const cleanDataForPrisma = condition as Prisma.ProfileUpdateInput

		const prismaUpdateArgs: Prisma.ProfileUpdateArgs = {
			where: {id},
			data: cleanDataForPrisma
		}

		const result = await repositories.VillageProfileRepository.update(prismaUpdateArgs)

		if (!result) throw new InternalServerError("Terjadi kesalahan saat mengubah Profile Desa, please try again later")

		return responses.villageProfileResponse.toVillageProfileResponse(result)
	}
}
