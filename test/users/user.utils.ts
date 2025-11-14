import bcrypt from "bcryptjs";
import { prismaClient } from "../../src/db";
import { User } from "@prisma/client";
import { generateUUID } from "../../src/utils/helpers/generate-uuid";

export class UserTest {
	static HASHED_PASSWORD_USERTEST: string;
	static uniqueEmail = `testuser${Date.now()}`;

	static async setupHashedPassword() {
		const saltRounds = 4;

		this.HASHED_PASSWORD_USERTEST = await bcrypt.hash("testpassword123", saltRounds);
	}

	static async createUserTest(): Promise<User> {
		return await prismaClient.user.create({
			data: {
				name: "user random",
				email: `${this.uniqueEmail}@gmail.com`,
				password: this.HASHED_PASSWORD_USERTEST,
			},
		});
	}

	static async createUserTestActive(): Promise<User> {
		return await prismaClient.user.create({
			data: {
				name: "user active",
				email: `${this.uniqueEmail}active@gmail.com`,
				password: this.HASHED_PASSWORD_USERTEST,
				is_active: true,
			},
		});
	}

	static async createUserTestOtp(): Promise<User> {
		const jti = generateUUID()
		return await prismaClient.user.create({
			data: {
				name: "user otp",
				email: `${this.uniqueEmail}otp@gmail.com`,
				password: this.HASHED_PASSWORD_USERTEST,
				otp: "112233",
				otp_purpose: "ACTIVATION",
				otp_last_sen_at: new Date(),
				verify_token: jti,
				verify_token_last_sen_at: new Date()
			},
		});
	}

	// static async createUserTest(): Promise<User> {
	// 	return await prismaClient.user.create({
	// 		data: {
	// 			name: "user test example",
	// 			email: `testuserexample@gmail.com`,
	// 			password: this.HASHED_PASSWORD_USERTEST,
	// 		},
	// 	});
	// }

	static async createUserTestAdmin(): Promise<void> {
		await prismaClient.user.create({
			data: {
				name: "admin",
				email: `testuseradmin@gmail.com`,
				password: this.HASHED_PASSWORD_USERTEST,
			},
		});
	}

	// static async createUserTestActive(): Promise<void> {
	// 	console.log("Creating Test user active");
	// 	await prismaClient.user.create({
	// 		data: {
	// 			name: "user active",
	// 			email: "testuseractive@gmail.com",
	// 			password: this.HASHED_PASSWORD_USERTEST,
	// 			is_active: true,
	// 		},
	// 	});
	// }

	// static async createUserTestOtp(): Promise<void> {
	// 	await prismaClient.user.create({
	// 		data: {
	// 			name: "user otp",
	// 			email: "testuserotp@gmail.com",
	// 			password: this.HASHED_PASSWORD_USERTEST,
	// 			otp: "223344",
	// 			is_active: false,
	// 		},
	// 	});
	// }

	static async createUserForgotPassword(): Promise<User> {
		console.log("Create Test user forgot");
		const result = await prismaClient.user.create({
			data: {
				name: "user forgotPass",
				email: "testuserforgot@gmail.com",
				password: this.HASHED_PASSWORD_USERTEST,
				otp: "223344",
				is_active: true,
				is_first_login: false,
			},
		});

		return result;
	}

	static async deleteUserTest(): Promise<void> {
		await prismaClient.user.deleteMany({
			where: {
				email: {
					contains: "test",
					endsWith: "@gmail.com",
				},
			},
		});
	}
}
