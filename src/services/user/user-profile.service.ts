import { Prisma } from "@prisma/client";
import {
	ChangePasswordUserProfileRequest,
	UpdateUserProfileRequest,
	UserResponse,
	UserResponseWithRelation,
} from "../../models/user.model";
import { HeadOfFamilyRepository, StaffRepository } from "../../repositories";
import { UserRepository } from "../../repositories/user.repository";
import { TokenUser } from "../../types/token.type";
import { BadrequestError, InternalServerError, NotfoundError } from "../../utils/errors";
import { UnauthorizedError } from "../../utils/errors/unauthorized";
import helpers from "../../utils/helpers";
import { removeUndefined } from "../../utils/helpers/remove-undefined";
import { userResponse } from "../../utils/responses";
import { UserValidation } from "../../utils/validations/user.validation";
import { validation } from "../../utils/validations/validation";

export const UserProfileService = {
	getProfile: async (user: TokenUser): Promise<UserResponseWithRelation> => {
		const result = await UserRepository.findById(user.user_id);

		if (!result) throw new NotfoundError("Pengguna tidak ditemukan");

		return userResponse.toUserResponseWithRelation(result);
	},

	updateProfile: async (user: TokenUser, req: UpdateUserProfileRequest): Promise<UserResponse> => {
		const validateFields = validation.validate(UserValidation.UPDATEPROFILE, req);

		const checkUser = await UserRepository.findById(user.user_id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		const data = removeUndefined(validateFields);

		if (checkUser.role === "STAFF" && !validateFields.head_of_family_id) {
			const checkStaff = await StaffRepository.findByUserId(checkUser.id);

			if (!checkStaff) throw new NotfoundError("Pengguna belum terdaftar sebagai Staf!");

			const staffConditions: Prisma.StaffUpdateArgs = {
				where: { id: checkStaff.id },
				data,
			};

			await StaffRepository.update(staffConditions);
		}

		if (checkUser.role === "HEAD_OF_FAMILY" && !validateFields.head_of_family_id) {
			const checkHeadOfFamily = await HeadOfFamilyRepository.findByUserId(checkUser.id);

			if (!checkHeadOfFamily) throw new NotfoundError("Pengguna belum terdaftar sebagai Kepala Keluarga!");

			const headOfFamilyConditions: Prisma.HeadOfFamilyUpdateArgs = {
				where: { user_id: checkUser.id },
				data,
			};

			await HeadOfFamilyRepository.update(headOfFamilyConditions);
		}

		return userResponse.toUserResponseWithRelation(checkUser);
	},

	changePassword: async (req: ChangePasswordUserProfileRequest, user: TokenUser): Promise<UserResponse> => {
		const validateFields = validation.validate(UserValidation.CHANGEPASSWORD, req);

		if (validateFields.password !== validateFields.confirm_password) throw new BadrequestError("Password dan Konfirm password tidak sama");

		const checkUser = await UserRepository.findById(user.user_id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak di temukan");

		if (!checkUser.is_active) throw new UnauthorizedError("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun");

		const newHasPassword = await helpers.hashPassword(validateFields.password);

		const result = await UserRepository.updatePassword(checkUser.id, newHasPassword);

		if (checkUser.is_first_login) await UserRepository.updateIsFirstLogin(checkUser.id);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return userResponse.toUserResponse(result);
	},
};
