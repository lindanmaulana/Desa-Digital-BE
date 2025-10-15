import { CreateHeadOfFamilyRequest } from "../models/head-of-family.model";
import { HeadOfFamilyValidation } from "../utils/validations/head-of-family.validation";
import { validation } from "../utils/validations/validation";

export class HeadOfFamilyService {
	static async create(req: CreateHeadOfFamilyRequest) {
		const validateFields = validation.validate(HeadOfFamilyValidation.CREATE, req);
	}
}
