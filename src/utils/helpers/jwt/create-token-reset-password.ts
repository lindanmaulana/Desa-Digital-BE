import { TokenResetPassword } from "../../../types/token.type";
import { createJwt } from "./create-jwt";

export const createTokenResetPassword = (payload: TokenResetPassword): string => {
	const payloadToken: TokenResetPassword = {
		user_id: payload.user_id,
		type: payload.type,
		jti: payload.jti,
		email: payload.email,
		role: payload.role,
	};

	const token = createJwt({ payload: payloadToken, expired: "15m" });

	return token;
};
