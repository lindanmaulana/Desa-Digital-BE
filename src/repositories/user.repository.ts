import { prismaClient } from "../db";
import { UserSignupRequest } from "../types/user.type";

export class UserRepository {
	static async findByEmail(email: string) {
		const user = await prismaClient.user.findUnique({
			where: {
				email: email
			}
		})

		return user
	}

	static async isEmailTaken(email: string) {
		const count = await prismaClient.user.count({
			where: {
				email
			}
		})

		return count > 0
	}

	static async create(data: UserSignupRequest) {
		return prismaClient.user.create({
			data
		})
	}

	static async findAll() {
		return prismaClient.user.findMany()
	}
}
