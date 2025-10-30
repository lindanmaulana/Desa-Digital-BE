import { TokenVerifyAccount } from "../../../types/token.type";
import { createJwt } from "./create-jwt";

export const createTokenVerifyAccount = (payload: TokenVerifyAccount): string => {
	const payloadToken: TokenVerifyAccount = {
		user_id: payload.user_id,
		type: payload.type,
		jti: payload.jti,
		role: payload.role,
		email: payload.email
	}

	const token = createJwt({payload: payloadToken})

	return token
}
