import { Prisma } from "@prisma/client";
import { prismaClient } from "../db";
import tr from "zod/v4/locales/tr.js";

export class HeadOfFamilyRepository {
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

				sosial_assistance_recipient: true,
			},
		});
	}

	static async findByUserId(userId: string) {
		return prismaClient.headOfFamily.findFirst({
			where: { user_id: userId },
		});
	}

	static async findById(id: string) {
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

				sosial_assistance_recipient: true,
			},
		});
	}

	static async findCount(args: Prisma.HeadOfFamilyCountArgs) {
		return prismaClient.headOfFamily.count(args);
	}

	static async update(args: Prisma.HeadOfFamilyUpdateArgs) {
		return prismaClient.headOfFamily.update(args);
	}
}
