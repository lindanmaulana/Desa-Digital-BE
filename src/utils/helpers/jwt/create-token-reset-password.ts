import { TokenResetPassword } from "../../../types/token.type";
import { createJwt } from "./create-jwt";

export const createTokenResetPassword = (payload: TokenResetPassword): string => {
	const payloadToken: TokenResetPassword = {
		user_id: payload.user_id,
		type: payload.type,
		email: payload.email,
		role: payload.role,
	};

	const token = createJwt({ payload: payloadToken });

	return token;
};
