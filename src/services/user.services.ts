import { UserRepository } from "../repositories/user.repository";
import { UserResponse, UserSigninRequest, UserSigninResponse, UserSignupRequest } from "../types/user.type";
import { BadrequestError, InternalServerError } from "../utils/errors";
import { UnauthorizedError } from "../utils/errors/unauthorized";
import { comparePassword } from "../utils/helpers/compare-password";
import { createToken } from "../utils/helpers/create-token";
import { toUserResponse, toUserResponses } from "../utils/helpers/responses/user.,response";
import { UserValidation } from "../utils/validations/user.validation";
import { validation } from "../utils/validations/validation";
import bcrypt from "bcrypt";

export class UserService {
	static async signup(req: UserSignupRequest): Promise<UserResponse> {
		const validateFields = validation.validate(UserValidation.SIGNUP, req);

		const checkEmailUser = await UserRepository.isEmailTaken(
			validateFields.email
		);

		if (checkEmailUser) throw new BadrequestError("Email telah di gunakan");

		const hashPassword = await bcrypt.hash(validateFields.password, 10);

		const result = await UserRepository.create({
			...validateFields,
			password: hashPassword,
		});

		if (!result)
			throw new InternalServerError(
				"Pendaftaran gagal, please try again later!"
			);

		return toUserResponse(result);
	}

	static async signin(req: UserSigninRequest): Promise<UserSigninResponse> {
		const validateFields = validation.validate(UserValidation.SIGNIN, req)

		const checkUser = await UserRepository.findByEmail(validateFields.email)

		if (!checkUser) throw new UnauthorizedError("Invalid credentials")

		await comparePassword(validateFields.password, checkUser.password)

		const token = createToken(checkUser)

		return {
			...checkUser,
			token
		}
	}

	static async getAll(): Promise<UserResponse[]> {
		const result = await UserRepository.findAll();

		if (!result)
			throw new InternalServerError(
				"Gagal mengakses data user, please try again later!"
			);

		return toUserResponses(result)
	}
}
