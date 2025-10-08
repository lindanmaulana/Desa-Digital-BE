import bcrypt from "bcrypt"
import { UnauthorizedError } from "../errors/unauthorized"

export const comparePassword = async (password: string, requestPassword: string): Promise<boolean> => {
	const isPasswordValid = await bcrypt.compare(requestPassword, password)

	if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials")

	return isPasswordValid
}
