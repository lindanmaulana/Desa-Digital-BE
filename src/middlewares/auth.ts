import { NextFunction, Response } from "express";
import { CustomeRequest } from "../types/express.type";
import { TokenResetPassword, TokenUser, TokenVerifyAccount } from "../types/token.type";
import { ForbiddenError } from "../utils/errors";
import { UnauthenticatedError } from "../utils/errors/unauthenticated";
import helpers from "../utils/helpers";

const authenticatedUser = async (req: CustomeRequest, res: Response, next: NextFunction) => {
	try {
		let token;

		const authHeader = req.headers.authorization;
		if (authHeader && authHeader.startsWith("Bearer")) {
			token = authHeader.split(" ")[1];
		}

		if (!token) throw new UnauthenticatedError("Authenticated invalid");

		const payload = helpers.isTokenValid({ token }) as TokenUser;

		if (payload.type !== "ACCESS") throw new ForbiddenError("Token is valid but not authorized for access")

		req.user = {
			user_id: payload.user_id,
			type: payload.type,
			name: payload.name,
			email: payload.email,
			role: payload.role,
			is_first_login: payload.is_first_login,
		} as TokenUser;

		next();
	} catch (err) {
		next(err);
	}
};

const authenticatedVerifyAccount = async (req: CustomeRequest, res: Response, next: NextFunction) => {
	try {
		let token;

		const authHeader = req.headers.authorization

		if(authHeader && authHeader.startsWith("Bearer")) token = authHeader.split(" ")[1]

		if(!token) throw new UnauthenticatedError("Authentication token is missing or malformed.")

		const payload = helpers.isTokenValid({token}) as TokenVerifyAccount

		if (payload.type !== "VERIFY_ACCOUNT") throw new ForbiddenError("Token is valid but not authorized for verify account")

		req.user = {
			user_id: payload.user_id,
			jti: payload.jti,
			role: payload.role,
			type: payload.type,
			email: payload.email
		} as TokenVerifyAccount

		next()
	} catch (err) {
		next(err)
	}
}

const authenticatedResetPassword = async (req: CustomeRequest, res: Response, next: NextFunction) => {
	try {
		let token;

		const authHeader = req.headers.authorization

		if(authHeader && authHeader.startsWith("Bearer")) token = authHeader.split(" ")[1]

		if(!token) throw new UnauthenticatedError("Authentication token is missing or malformed.")

		const payload = helpers.isTokenValid({token}) as TokenResetPassword

		if(payload.type !== "RESET_PASSWORD")  throw new ForbiddenError("Token is valid but not authorized for password reset.")

		req.user = {
			user_id: payload.user_id,
			type: payload.type,
			role: payload.role,
			email: payload.email,
		} as TokenResetPassword

		next()
	} catch (err) {
		next(err)
	}
}



const authorizedRoles = (...roles: string[]) => {
	return (req: CustomeRequest, res: Response, next: NextFunction) => {
		if (!req.user?.role) throw new UnauthenticatedError("unauthorized to access this route");

		if (!roles.includes(req.user.role)) {
			throw new UnauthenticatedError("Unauthorized to access this route");
		}

		next();
	};
};

export { authenticatedResetPassword, authenticatedUser, authenticatedVerifyAccount, authorizedRoles };

