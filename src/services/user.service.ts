import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { Token } from "../types/token.type";
import { ChangePasswordRequest, UserResponse, UserSigninRequest, UserSigninResponse, UserSignupRequest } from "../types/user.type";
import { BadrequestError, InternalServerError, NotfoundError } from "../utils/errors";
import { UnauthorizedError } from "../utils/errors/unauthorized";
import { comparePassword } from "../utils/helpers/compare-password";
import { createToken } from "../utils/helpers/create-token";
import { generateOtp } from "../utils/helpers/generate-otp";
import { toUserResponse, toUserResponses } from "../utils/helpers/responses/user.,response";
import { UserValidation } from "../utils/validations/user.validation";
import { validation } from "../utils/validations/validation";
import { EmailService } from "./email.service";
import { logger } from "../logging";

export class UserService {
	static async signup(req: UserSignupRequest): Promise<UserResponse> {
		const validateFields = validation.validate(UserValidation.SIGNUP, req);

		const checkEmailUser = await UserRepository.isEmailTaken(
			validateFields.email
		);

		if (checkEmailUser) throw new BadrequestError("Email telah di gunakan");

		const hashPassword = await bcrypt.hash(validateFields.password, 10);
		const otp = generateOtp()

		const result = await UserRepository.create({
			...validateFields,
			password: hashPassword,
			otp_code: otp
		});

		if (!result)
			throw new InternalServerError(
				"Pendaftaran gagal, please try again later!"
			);

		const checkEmail = await EmailService.SendOtpMail(result.email, result)

		logger.info({checkEmail})

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

	static async changePassword(req: ChangePasswordRequest, user: Token): Promise<UserResponse> {
		const validateFields = validation.validate(UserValidation.CHANGEPASSWORD, req)

		if (validateFields.password !== validateFields.confirmPassword) throw new BadrequestError("Password dan Konfirm password tidak sama")

		const checkUser = await UserRepository.findById(user.id)

		if (!checkUser) throw new NotfoundError("Pengguna tidak di temukan")

		const newHasPassword = await bcrypt.hash(validateFields.password, 10)

		const result = await UserRepository.updatePassword(checkUser.id, newHasPassword)

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later")

		return toUserResponse(result)
	}

	static async getAll(): Promise<UserResponse[]> {
		const result = await UserRepository.findAll();

		if (!result)
			throw new InternalServerError(
				"Gagal mengakses data user, please try again later!"
			);

		return toUserResponses(result)
	}

	static async getById(id: string): Promise<UserResponse> {
		const result = await UserRepository.findById(id)

		if (!result) throw new NotfoundError(`Pengguna tidak ditemukan`)

		return toUserResponse(result)
	}

	static async delete(id: string): Promise<UserResponse> {
		const checkUser = await UserRepository.findById(id)

		if(!checkUser) throw new NotfoundError("Pengguna tidak ditemukan")

		const result = await UserRepository.deleteById(checkUser.id)

		return toUserResponse(result)
	}
}
