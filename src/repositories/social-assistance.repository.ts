import { CategorySocialAssistance, Prisma } from "@prisma/client";
import { prismaClient } from "../db";
import { CreateSocialAssistanceRequest } from "../models/social-assistance.model";

export class SocialAssistanceRepository {
	static async create(args: Prisma.SocialAssistanceCreateArgs) {
		return prismaClient.socialAssistance.create(args);
	}

	static async isNameTaken(name: string) {
		const count = await prismaClient.socialAssistance.count({
			where: {
				name: {
					contains:name,
					mode: "insensitive"
				}
			}
		})

		return count > 0
	}
}
