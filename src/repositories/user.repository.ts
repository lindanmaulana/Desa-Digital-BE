import { prismaClient } from "../db";
import { UserSignupRequest } from "../types/user.type";

export class UserRepository {
	static async findByEmail(email: string) {
		const user = await prismaClient.user.findUnique({
			where: {
				email: email,
			},
		});

		return user;
	}

	static async findAll() {
		return prismaClient.user.findMany();
	}

	static async findById(id: string) {
		return prismaClient.user.findUnique({
			where: {
				id,
			},
		});
	}

	static async create(data: UserSignupRequest) {
		return prismaClient.user.create({
			data,
		});
	}

	static async updatePassword(id: string, password: string) {
		return prismaClient.user.update({
			where: {
				id
			},
			data: {
				password
			}
		})
	}

	static async deleteAll() {
		return prismaClient.user.deleteMany()
	}

	static async deleteById(id: string) {
		return prismaClient.user.delete({
			where: {
				id,
			},
		});
	}

	static async isEmailTaken(email: string) {
		const count = await prismaClient.user.count({
			where: {
				email,
			},
		});

		return count > 0;
	}
}
