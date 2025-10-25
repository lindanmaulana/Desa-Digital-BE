import { ChangePasswordUserProfileRequest } from "../models/user-profile.model";
import { UserResponse } from "../models/user.model";
import repositories from "../repositories";
import { UserRepository } from "../repositories/user.repository";
import { Token } from "../types/token.type";
import { BadrequestError, InternalServerError, NotfoundError } from "../utils/errors";
import { UnauthorizedError } from "../utils/errors/unauthorized";
import helpers from "../utils/helpers";
import responses from "../utils/responses";
import { UserProfileValidation } from "../utils/validations/user-profile.validation";
import { validation } from "../utils/validations/validation";

export class UserProfileService {
	static async get(user: Token) {
		const result = await repositories.UserRepository.findById(user.id);

		if (!result) throw new NotfoundError("Pengguna tidak ditemukan");

		return responses.userResponse.toUserResponseWithRelation(result);
	}

	static async changePassword(req: ChangePasswordUserProfileRequest, user: Token): Promise<UserResponse> {
		const validateFields = validation.validate(UserProfileValidation.CHANGEPASSWORD, req);

		if (validateFields.password !== validateFields.confirm_password) throw new BadrequestError("Password dan Konfirm password tidak sama");

		const checkUser = await UserRepository.findById(user.id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak di temukan");

		if (!checkUser.is_active) throw new UnauthorizedError("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun");

		const newHasPassword = await helpers.hashPassword(validateFields.password);

		const result = await repositories.UserRepository.updatePassword(checkUser.id, newHasPassword);

		if (checkUser.is_first_login) await UserRepository.updateIsFirstLogin(checkUser.id);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return responses.userResponse.toUserResponse(result);
	}
}
