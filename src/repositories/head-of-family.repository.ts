import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";

export class HeadOfFamilyRepository {
	static async findById(id: string) {
		return prismaClient.headOfFamily.findUnique({
			where: { id },
		});
	}

	static async findByUserId(userId: string) {
		return prismaClient.headOfFamily.findFirst({
			where: { user_id: userId },
		});
	}
	
	static async findAll(args: Prisma.HeadOfFamilyFindManyArgs) {
		return prismaClient.headOfFamily.findMany({
			where: args.where ?? {},
			skip: args.skip ?? 0,
			take: args.take ?? 5,
			orderBy: {
				...args.orderBy,
			},

			include: {
				user: {
					omit: {
						password: true,
						otp: true,
						otp_last_sen_at: true,
						otp_purpose: true,
						reset_token: true,
						reset_token_last_sen_at: true,
						verify_token: true,
						verify_token_last_sen_at: true,
					},

					include: {
						image: {
							select: {
								id: true,
								filename: true,
								path: true,
								entity_type: true,
								user_id: true,
								created_at: true,
								updated_at: true,
							},
						},
					},
				},

				social_assistance_recipient: true,
			},
		});
	}

	static async findByIdDetail(id: string) {
		return prismaClient.headOfFamily.findFirst({
			where: {
				id: id,
			},

			include: {
				user: {
					omit: {
						password: true,
						otp: true,
						otp_last_sen_at: true,
						otp_purpose: true,
						reset_token: true,
						reset_token_last_sen_at: true,
						verify_token: true,
						verify_token_last_sen_at: true,
					},

					include: {
						image: {
							select: {
								id: true,
								filename: true,
								path: true,
								entity_type: true,
								user_id: true,
								created_at: true,
								updated_at: true,
							},
						},
					},
				},

				social_assistance_recipient: {
					take: 3,
					orderBy: {
						created_at: "asc",
					},
				},
			},
		});
	}

	static async findCount(args: Prisma.HeadOfFamilyCountArgs) {
		return prismaClient.headOfFamily.count(args);
	}

	static async update(args: Prisma.HeadOfFamilyUpdateArgs) {
		return prismaClient.headOfFamily.update(args);
	}

	static async deleteByIdUser(id: string) {
		return prismaClient.user.delete({
			where: { id },
		});
	}
}
