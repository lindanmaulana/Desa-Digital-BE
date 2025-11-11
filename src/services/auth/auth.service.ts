import { SigninRequest, SigninResponse } from "../../models/auth.model";
import { UserRepository } from "../../repositories";
import { NeedActivation } from "../../utils/errors";
import { UnauthorizedError } from "../../utils/errors/unauthorized";
import { comparePassword } from "../../utils/helpers/compare-password";
import { createTokenUser } from "../../utils/helpers/jwt/create-token-user";
import userResponse from "../../utils/responses/user.,response";
import { AuthValidation } from "../../utils/validations/auth.validation";
import { validation } from "../../utils/validations/validation";

export const AuthService = {
	signin: async (req: SigninRequest): Promise<SigninResponse> => {
		const validateFields = validation.validate(AuthValidation.SIGNIN, req);

		const checkUser = await UserRepository.findByEmail(validateFields.email);
		if (!checkUser) throw new UnauthorizedError("Invalid credentials");
		if (!checkUser.is_active)
			throw new NeedActivation("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun", checkUser.email);

		const isPasswordValid = await comparePassword(validateFields.password, checkUser.password);
		if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");

		const token = createTokenUser(checkUser);

		return {
			...userResponse.toUserResponse(checkUser),
			token,
		};
	},
};
