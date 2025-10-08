import { User } from "@prisma/client";
import { createJwt } from "./create-jwt";

export const createToken = (user: User): string => {
	const payloadToken = {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		is_active: user.is_active,
		is_first_login: user.is_first_login,
	};

	const token = createJwt({payload: payloadToken})

	return token
};
