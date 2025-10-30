import { User } from "@prisma/client";
import { createJwt } from "./create-jwt";
import { TokenUser } from "../../../types/token.type";

export const createTokenUser = (user: User): string => {
	const payloadToken: TokenUser = {
		user_id: user.id,
		role: user.role,
		type: "ACCESS",
		name: user.name,
		email: user.email,
		is_active: user.is_active,
		is_first_login: user.is_first_login,
	};

	const token = createJwt({ payload: payloadToken });

	return token;
};
