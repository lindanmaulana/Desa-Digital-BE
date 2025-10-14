import { Gender, Marital } from "@prisma/client";
import { CreateStaffRequest, StaffResponse } from "../models/staff.model";
import { StaffRepository } from "../repositories/staff.repository";
import { UserRepository } from "../repositories/user.repository";
import { InternalServerError, NotfoundError } from "../utils/errors";
import { StaffValidation } from "../utils/validations/staff.validation";
import { validation } from "../utils/validations/validation";
import responses from "../utils/responses";

export class StaffService {
	static async create(req: CreateStaffRequest): Promise<StaffResponse> {
		const validateFields = validation.validate(StaffValidation.CREATE, req);

		const checkUser = await UserRepository.findById(req.user_id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		const result = await StaffRepository.create({
			data: {
				user_id: validateFields.user_id,
				profile_picture: validateFields.profile_picture ?? "",
				identity_number: validateFields.identity_number ?? "",
				gender: validateFields.gender as Gender,
				date_of_birth: validateFields.date_of_birth ?? "",
				phone_number: validateFields.phone_number ?? "",
				occupation: validateFields.occupation ?? null,
				marital_status: validateFields.marital_status as Marital,
			},
		});

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return responses.staffResponse.toStaffResponse(result)
	}
}
