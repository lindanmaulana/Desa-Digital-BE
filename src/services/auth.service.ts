import services from ".";
import { logger } from "../logging";
import { UserRepository } from "../repositories/user.repository";
import { Token } from "../types/token.type";
import { ActivationRequest, ChangePasswordRequest, UserResponse, UserSigninRequest, UserSigninResponse, UserSignupRequest } from "../models/user.model";
import { BadrequestError, InternalServerError, NeedActivation, NotfoundError } from "../utils/errors";
import { UnauthenticatedError } from "../utils/errors/unauthenticated";
import { UnauthorizedError } from "../utils/errors/unauthorized";
import helpers from "../utils/helpers";
import { createToken } from "../utils/helpers/create-token";
import responses from "../utils/responses";
import { toUserResponse } from "../utils/responses/user.,response";
import { UserValidation } from "../utils/validations/user.validation";
import { validation } from "../utils/validations/validation";


export class AuthService {
	static async signup(req: UserSignupRequest): Promise<UserResponse> {
		const validateFields = validation.validate(UserValidation.SIGNUP, req);

		const checkEmailUser = await UserRepository.isEmailTaken(validateFields.email);

		if (checkEmailUser) throw new BadrequestError("Email telah di gunakan");

		const hashPassword = await helpers.hashPassword(validateFields.password);
		const otp = helpers.generateOtp();

		const result = await UserRepository.create({
			...validateFields,
			password: hashPassword,
			otp_code: otp,
		});

		if (!result) throw new InternalServerError("Pendaftaran gagal, please try again later!");

		const checkEmail = await services.EmailService.SendOtpMail(result.email, result);

		logger.info({ checkEmail });

		return responses.toUserResponse(result);
	}

	static async signin(req: UserSigninRequest): Promise<UserSigninResponse> {
		const validateFields = validation.validate(UserValidation.SIGNIN, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);

		if (!checkUser) throw new UnauthorizedError("Invalid credentialssssss");

		if(!checkUser.is_active) throw new NeedActivation("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun", checkUser.email)

		const isPasswordValid = await helpers.comparePassword(validateFields.password, checkUser.password);

		if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");

		const token = createToken(checkUser);

		return {
			...toUserResponse(checkUser),
			token,
		};
	}

	static async changePassword(req: ChangePasswordRequest, user: Token): Promise<UserResponse> {
		const validateFields = validation.validate(UserValidation.CHANGEPASSWORD, req);

		if (validateFields.password !== validateFields.confirm_password) throw new BadrequestError("Password dan Konfirm password tidak sama");

		const checkUser = await UserRepository.findById(user.id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak di temukan");

		if (!checkUser.is_active) throw new UnauthorizedError("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun");

		const newHasPassword = await helpers.hashPassword(validateFields.password);

		const result = await UserRepository.updatePassword(checkUser.id, newHasPassword);

		if (checkUser.is_first_login) await UserRepository.updateIsFirstLogin(checkUser.id);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return responses.toUserResponse(result);
	}

	static async activation(req: ActivationRequest): Promise<UserResponse> {
		const validateFields = validation.validate(UserValidation.ACTIVATION, req)

		const checkUser = await UserRepository.findByEmail(req.email);

		if (!checkUser) throw new UnauthenticatedError("Email tidak valid atau pengguna telah terhapus");

		const checkUserActivation = await UserRepository.findUserForActivation(checkUser.id)

		if (!checkUserActivation) throw new UnauthenticatedError("Pengguna tidak di temukan");

		if (checkUserActivation.is_active) throw new BadrequestError("Akun anda sudah aktif");

		if(checkUserActivation.otp_code !== validateFields.otp_code) throw new BadrequestError("Kode OTP yang anda masukan salah")

		const result = await UserRepository.updateIsActive(checkUserActivation.id);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return toUserResponse(result);
	}
}
