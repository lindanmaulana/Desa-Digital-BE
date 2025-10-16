import { CategorySocialAssistance } from "@prisma/client";
import { CreateSocialAssistanceRequest, SocialAssistanceResponse } from "../models/social-assistance.model";
import { SocialAssistanceRepository } from "../repositories/social-assistance.repository";
import { BadrequestError, InternalServerError } from "../utils/errors";
import responses from "../utils/responses";
import { SocialAssistanceValidation } from "../utils/validations/social-assistance.validation";
import { validation } from "../utils/validations/validation";

export class SocialAssistanceService {
	static async create(req: CreateSocialAssistanceRequest): Promise<SocialAssistanceResponse> {
		const validateFields = validation.validate(SocialAssistanceValidation.CREATE, req)

		if (Number(validateFields.amount) < 0) throw new BadrequestError("Nominal bantuan tidak valid")

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
}
