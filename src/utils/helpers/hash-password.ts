import bcrypt from "bcryptjs"

export const hashPassword = async (password: string, salt?: number) => {
	return bcrypt.hash(password, salt ?? 10)
}
