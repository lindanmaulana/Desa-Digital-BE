import { StaffResponse, UpdateStaffRequest } from "../models/staff.model";
import repositories from "../repositories";
import { TokenUser } from "../types/token.type";
import { InternalServerError, NotfoundError } from "../utils/errors";
import { removeUndefined } from "../utils/helpers/remove-undefined";
import responses from "../utils/responses";
import { StaffValidation } from "../utils/validations/staff.validation";
import { validation } from "../utils/validations/validation";

export class StaffService {
	static async update(user: TokenUser, req: UpdateStaffRequest): Promise<StaffResponse> {
		const validateFields = validation.validate(StaffValidation.UPDATE, req)

		const checkUser = await repositories.UserRepository.findById(user.user_id)
		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan!")

		const checkStaff = await repositories.StaffRepository.findByUserId(checkUser.id)
		if (!checkStaff) throw new NotfoundError("Pengguna belum terdaftar sebagai Staf")

		// if (validateFields.profile_picture) {
		// 	const imageExist = helpers.fileHelpers.checkImage(validateFields.profile_picture)

		// 	if (!imageExist) throw new NotfoundError("Image tidak ditemukan")

		// 	if (checkStaff.profile_picture) helpers.fileHelpers.deleteImage(checkStaff.profile_picture)
		// }

		const data = removeUndefined(validateFields)

		const result = await repositories.StaffRepository.update({
			where: {id: checkStaff.id},
			data: data
		})

		if (!result) throw new InternalServerError("Terjadi kesalahan saat mengupdate data, please try again later")

		return responses.staffResponse.toStaffResponse(result)
	}
}
