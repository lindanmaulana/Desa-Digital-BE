import jwt from "jsonwebtoken";
import { JWTSECRETKEY } from "../../../config";
import { logger } from "../../../logging";
import { TokenResetPassword, TokenUser, TokenVerifyAccount } from "../../../types/token.type";
import { BadrequestError } from "../../errors";
import { UnauthenticatedError } from "../../errors/unauthenticated";
import { ExpiredError } from "../../errors/expired";

export interface CreateJwtParams {
	payload: TokenUser | TokenResetPassword | TokenVerifyAccount;
}

export const createJwt = ({ payload }: CreateJwtParams): string => {
	if (!JWTSECRETKEY) {
		logger.error("jwt secret key is not defined");
		throw new BadrequestError("Server Error");
	}

	const token = jwt.sign(payload, JWTSECRETKEY, {
		expiresIn: "24h",
	});

	return token;
};

export const isTokenValid = ({ token }: { token: string }) => {
	if (!JWTSECRETKEY) {
		logger.error("jwt secret key is not defined");

		throw new BadrequestError("Server Error");
	}

	try {
		const isValid = jwt.verify(token, JWTSECRETKEY) as TokenUser | TokenResetPassword | TokenVerifyAccount;

		return isValid;
	} catch (err) {
		let errorMessage = "An unexpected error occurred";

		if (err instanceof jwt.JsonWebTokenError) {
			errorMessage = `Token Error : ${err.message}`;
		}

		if (err instanceof jwt.TokenExpiredError) {
			errorMessage = `Token expired : ${err.message}`;

			throw new ExpiredError(errorMessage)
		}

		if (err instanceof jwt.NotBeforeError) {
			errorMessage = `Token not active : ${err.message}`;
		}

		if (err instanceof Error) {
			errorMessage = err.message;
		}

		throw new UnauthenticatedError(errorMessage);
	}
};
