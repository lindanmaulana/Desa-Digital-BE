import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";
import { UserSignupRequest } from "../models/user.model";

export class UserRepository {
	static async findAll(whereCondition: Prisma.UserWhereInput) {
		return prismaClient.user.findMany({
			where: whereCondition
		});
	}

	static async findById(id: string) {
		return prismaClient.user.findUnique({
			where: {
				id,
			},
		});
	}

	static async findByEmail(email: string) {
		const user = await prismaClient.user.findFirst({
			where: {
				email: email,
			},
		});

		return user;
	}

	static async findUserForActivation(id: string) {
		return prismaClient.user.findUnique({
			where: { id, is_active: false },
			select: { id: true, is_active: true, otp_code: true },
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
				id,
			},
			data: {
				password,
			},
		});
	}

	static async updateIsFirstLogin(id: string) {
		return prismaClient.user.update({
			where: { id, is_first_login: true },
			data: { is_first_login: false },
		});
	}

	static async updateIsActive(id: string) {
		return prismaClient.user.update({
			where: { id, is_active: false },
			data: {
				is_active: true,
				otp_code: null,
			},
		});
	}

	static async updateOtp(id: string, otp_code: string) {
		return prismaClient.user.update({
			where: {id},
			data: {
				otp_code,
				otp_last_sen_at: new Date()
			}
		})
	}

	static async deleteAll() {
		return prismaClient.user.deleteMany();
	}

	static async deleteById(id: string) {
		return prismaClient.user.delete({
			where: {
				id,
			},
		});
	}

	static async deleteOtp(id: string, is_active: boolean) {
		return prismaClient.user.update({
			where: {id},
			data: {
				otp_code: null
			}
		})
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
