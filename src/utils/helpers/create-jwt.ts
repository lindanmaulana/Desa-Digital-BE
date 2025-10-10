import { JWTSECRETKEY } from "../../config";
import { Token } from "../../types/token.type";
import jwt from "jsonwebtoken";
import { BadrequestError } from "../errors";
import { logger } from "../../logging";
import { UnauthenticatedError } from "../errors/unauthenticated";

export interface CreateJwtParams {
	payload: Token;
}

export const createJwt = ({ payload }: CreateJwtParams): string => {
	if (!JWTSECRETKEY) {
		logger.error("jwt secret key is not defined");
		throw new BadrequestError("Server Error");
	}

	const token = jwt.sign(payload, JWTSECRETKEY, {
		expiresIn: "30m",
	});

	return token;
};

export const isTokenValid = ({ token }: { token: string }) => {
	if (!JWTSECRETKEY) {
		logger.error("jwt secret key is not defined");

		throw new BadrequestError("Server Error");
	}

	try {
		const isValid = jwt.verify(token, JWTSECRETKEY) as Token;

		return isValid;
	} catch (err) {
		let errorMessage = "An unexpected error occurred";

		if (err instanceof jwt.JsonWebTokenError) {
			errorMessage = `Token Error : ${err.message}`;
		}

		if (err instanceof jwt.TokenExpiredError) {
			errorMessage = `Token expired : ${err.message}`;
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
