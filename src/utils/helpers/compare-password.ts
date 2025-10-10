import bcrypt from "bcryptjs"

export const comparePassword = async (requestPassword: string, hashPassword: string): Promise<boolean> => {
	return bcrypt.compare(requestPassword, hashPassword)
}
