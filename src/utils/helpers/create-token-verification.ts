import { UserRole } from "@prisma/client"
import { createJwt } from "./create-jwt"

interface TokenVerification {
	id: string
	email: string
	role: UserRole
}

export const createTokenVerification = (payload: TokenVerification): string => {
	const payloadToken = {
		id: payload.id,
		email: payload.email,
		role: payload.role,
		purpose: "password_reset",
	}

	const token = createJwt({payload: payloadToken})

	return token
}
