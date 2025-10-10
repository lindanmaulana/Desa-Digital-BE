import { NextFunction, Response } from "express";
import { CustomeRequest } from "../types/express.type";
import { Token } from "../types/token.type";
import { UnauthenticatedError } from "../utils/errors/unauthenticated";
import helpers from "../utils/helpers";
import { logger } from "../logging";

const authenticatedUser = async (req: CustomeRequest, res: Response, next: NextFunction) => {
	try {
		let token;

		const authHeader = req.headers.authorization;
		if (authHeader && authHeader.startsWith("Bearer")) {
			token = authHeader.split(" ")[1];
		}

		if (!token) throw new UnauthenticatedError("Authenticated invalid");

		const payload = helpers.isTokenValid({ token }) as Token;

		req.user = {
			id: payload.id,
			name: payload.name,
			email: payload.email,
			role: payload.role,
			is_first_login: payload.is_first_login,
		} as Token;

		next();
	} catch (err) {
		next(err);
	}
};

const authorizedRoles = (...roles: string[]) => {
	return (req: CustomeRequest, res: Response, next: NextFunction) => {
		if (!req.user?.role) throw new UnauthenticatedError("unauthorized to access this route");

		if (!roles.includes(req.user.role)) {
			throw new UnauthenticatedError("Unauthorized to access this route");
		}

		next();
	};
};

export { authenticatedUser, authorizedRoles };
