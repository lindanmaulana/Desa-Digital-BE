import { Prisma, UserOtpPurpose } from "@prisma/client";
import { prismaClient } from "../db";
import { UserWithRelations } from "../models/user.model";

export class UserRepository {
	static async findCount(args: Prisma.UserCountArgs) {
		return prismaClient.user.count(args)
	}

	static async findAll(args: Prisma.UserFindManyArgs): Promise<UserWithRelations[]> {
		return prismaClient.user.findMany({
			where: args.where ?? {},
			skip: args.skip ?? 0,
			take: args.take ?? 5,
			include: {
				...args.include
			}
		});
	}

	static async findById(id: string) {
		return prismaClient.user.findUnique({
			where: {
				id,
			},
			include: {
				staff: true,
				head_of_family: true,
				image: true
			}
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
			select: { id: true, is_active: true, otp: true },
		});
	}

	static async create(args: Prisma.UserCreateArgs) {
		return prismaClient.user.create(args);
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

	static async updateProfile(args: Prisma.UserUpdateArgs) {
		return prismaClient.user.update(args)
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
				otp: null,
			},
		});
	}

	static async updateOtp(id: string, otp: string, otp_purpose: UserOtpPurpose) {
		return prismaClient.user.update({
			where: {id},
			data: {
				otp,
				otp_purpose,
				otp_last_sen_at: new Date()
			}
		})
	}

	static async updateVerifyToken(id: string, jti: string) {
		return prismaClient.user.update({
			where: {id},
			data: {
				verify_token: jti,
				verify_token_last_sen_at: new Date()
			}
		})
	}

	static async updateResetToken(id: string, jti: string) {
		return prismaClient.user.update({
			where: {id},
			data: {
				reset_token: jti,
				reset_token_last_sen_at: new Date()
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

	static async deleteOtp(id: string) {
		return prismaClient.user.update({
			where: {id},
			data: {
				otp: null,
				otp_purpose: null,
				otp_last_sen_at: null
			}
		})
	}

	static async deleteResetToken(id: string) {
		return prismaClient.user.update({
			where: {id},
			data: {
				reset_token: null,
				reset_token_last_sen_at: null
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
