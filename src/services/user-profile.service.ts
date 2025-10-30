import { Prisma } from "@prisma/client";
import { ChangePasswordUserProfileRequest, UpdateUserProfileRequest } from "../models/user-profile.model";
import { UserResponse } from "../models/user.model";
import repositories from "../repositories";
import { UserRepository } from "../repositories/user.repository";
import { TokenUser } from "../types/token.type";
import { BadrequestError, InternalServerError, NotfoundError } from "../utils/errors";
import { UnauthorizedError } from "../utils/errors/unauthorized";
import helpers from "../utils/helpers";
import { removeUndefined } from "../utils/helpers/remove-undefined";
import responses from "../utils/responses";
import { UserProfileValidation } from "../utils/validations/user-profile.validation";
import { validation } from "../utils/validations/validation";

export class UserProfileService {
	static async get(user: TokenUser) {
		const result = await repositories.UserRepository.findById(user.user_id);

		if (!result) throw new NotfoundError("Pengguna tidak ditemukan");

		return responses.userResponse.toUserResponseWithRelation(result);
	}

	static async update(user: TokenUser, req: UpdateUserProfileRequest): Promise<UserResponse> {
		const validateFields = validation.validate(UserProfileValidation.UPDATE, req);

		const checkUser = await UserRepository.findById(user.user_id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		const data = removeUndefined(validateFields)

		if (checkUser.role === "STAFF" && !validateFields.head_of_family_id) {

			const checkStaff = await repositories.StaffRepository.findByUserId(checkUser.id)

			if (!checkStaff) throw new NotfoundError("Pengguna belum terdaftar sebagai Staf!")

			const staffConditions: Prisma.StaffUpdateArgs = {
				where: { id: checkStaff.id },
				data
			}

			await repositories.StaffRepository.update(staffConditions);
		}

		if (checkUser.role === "HEAD_OF_FAMILY" && !validateFields.head_of_family_id) {
			const checkHeadOfFamily = await repositories.HeadOfFamilyRepository.findByUserId(checkUser.id)

			if (!checkHeadOfFamily) throw new NotfoundError("Pengguna belum terdaftar sebagai Kepala Keluarga!")

			const headOfFamilyConditions: Prisma.HeadOfFamilyUpdateArgs = {
				where: {user_id: checkUser.id},
				data
			}

			await repositories.HeadOfFamilyRepository.update(headOfFamilyConditions)
		}

		return responses.userResponse.toUserResponseWithRelation(checkUser)
	}

	static async changePassword(req: ChangePasswordUserProfileRequest, user: TokenUser): Promise<UserResponse> {
		const validateFields = validation.validate(UserProfileValidation.CHANGEPASSWORD, req);

		if (validateFields.password !== validateFields.confirm_password) throw new BadrequestError("Password dan Konfirm password tidak sama");

		const checkUser = await UserRepository.findById(user.user_id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak di temukan");

		if (!checkUser.is_active) throw new UnauthorizedError("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun");

		const newHasPassword = await helpers.hashPassword(validateFields.password);

		const result = await repositories.UserRepository.updatePassword(checkUser.id, newHasPassword);

		if (checkUser.is_first_login) await UserRepository.updateIsFirstLogin(checkUser.id);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return responses.userResponse.toUserResponse(result);
	}
}
