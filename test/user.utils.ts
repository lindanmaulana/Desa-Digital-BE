import bcrypt from "bcryptjs";
import { prismaClient } from "../src/db";

export class UserTest {
	static HASHED_PASSWORD_USERTEST: string

	static async setupHashedPassword() {
		const saltRounds = 4

		this.HASHED_PASSWORD_USERTEST = await bcrypt.hash("usertest123", saltRounds)
	}

	static async createUserTest(): Promise<void> {
		await prismaClient.user.create({
			data: {
				name: "user test",
				email: "usertest@gmail.com",
				password: this.HASHED_PASSWORD_USERTEST,
			},
		});
	}

	static async createUserTestActive(): Promise<void> {
		await prismaClient.user.create({
			data: {
				name: "user active",
				email: "useractive@gmail.com",
				password: this.HASHED_PASSWORD_USERTEST,
				is_active: true,
			},
		});
	}

	static async createUserTestOtp(): Promise<void> {
		await prismaClient.user.create({
			data: {
				name: "user otp",
				email: "userotp@gmail.com",
				password: this.HASHED_PASSWORD_USERTEST,
				otp_code: "223344",
				is_active: false
			}
		})
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
