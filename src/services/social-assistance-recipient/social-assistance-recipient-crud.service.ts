import { CreateSocialAssistanceRecipientRequest } from "../../models/social-assistance-recipient.model";
import { BadrequestError } from "../../utils/errors";
import { SocialAssistanceRecipientValidation } from "../../utils/validations/social-assistance-recipient.validation";
import { validation } from "../../utils/validations/validation";

export const SocialAssistanceRecipientCrudService = {
	create: async (req: CreateSocialAssistanceRecipientRequest) => {
		const validateFields = validation.validate(SocialAssistanceRecipientValidation.CREATE, req)
		if (validateFields.amount && validateFields.amount < 0) throw new BadrequestError("Nominal bantuan tidak valid!")
	},

	getAll: async () => {

	},
}
