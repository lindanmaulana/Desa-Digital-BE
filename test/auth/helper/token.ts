import { TokenVerifyAccount } from "../../../src/types/token.type"
import { createTokenVerifyAccount } from "../../../src/utils/helpers/jwt/create-token-verify-account"

export const jwtHelper = {
	generateVerifyToken: (req: TokenVerifyAccount): string => {
		return createTokenVerifyAccount({
			user_id: req.user_id,
			jti: req.jti,
			email: req.email,
			role: req.role,
			type: "VERIFY_ACCOUNT",
		})
	}
}
