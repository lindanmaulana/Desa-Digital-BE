import bcrypt from "bcryptjs";
import { prismaClient } from "../src/db";

export class UserTest {
	static async createUserTest(): Promise<void> {
		await prismaClient.user.create({
			data: {
				name: "user test",
				email: "usertest@gmail.com",
				password: await bcrypt.hash("usertest123", 4),
			},
		});
	}

	static async createUserTestActive(): Promise<void> {
		await prismaClient.user.create({
			data: {
				name: "user active",
				email: "useractive@gmail.com",
				password: await bcrypt.hash("useractive123", 4),
				is_active: true,
			},
		});
	}

	static async deleteUserTest(): Promise<void> {
		await prismaClient.user.deleteMany({
			where: {
				email: {
					startsWith: "user",
					endsWith: "@gmail.com"
				}
			},
		});
	}

	static async deleteAdmin(): Promise<void> {
		await prismaClient.user.deleteMany({
			where: {
				email: "admin@gmail.com",
			},
		});
	}
}
