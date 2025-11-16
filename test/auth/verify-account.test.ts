import { User } from "@prisma/client";
import supertest from "supertest";
import { logger } from "../../src/logging";
import { app } from "../../src/web";
import { UserTest } from "../users/user.utils";
import { jwtHelper } from "./helper/token";

describe("POST /api/v1/auth/verify-account/verify", () => {
	let otpAccount: User;

	beforeAll(async () => {
		await UserTest.setupHashedPassword();
	});

	beforeEach(async () => {
		await UserTest.deleteUserTest();

		otpAccount = await UserTest.createUserTestOtp();
	});

	afterEach(async () => {
		await UserTest.deleteUserTest();
	});

	it("Should reject activation if request body invalid", async () => {
		const response = await supertest(app).post("/api/v1/auth/verify-account/verify").send({
			token: "",
			otp_code: "",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);

		expect(response.body.errors).toBeDefined();
	});

	it("Should reject activation if token invalid", async () => {
		const response = await supertest(app).post("/api/v1/auth/verify-account/verify").send({
			token: "sdhiadhadihedhasd",
			otp_code: "112233",
		});

		logger.debug(response.body);
		expect(response.status).toBe(401);

		expect(response.body.errors).toBeDefined();
	});

	it("Should reject activation if otp_code invalid", async () => {
		let verifyToken = jwtHelper.generateVerifyToken({
			user_id: otpAccount.id,
			email: otpAccount.email,
			jti: otpAccount.verify_token ?? "",
			role: otpAccount.role,
			type: "VERIFY_ACCOUNT",
		});

		const response = await supertest(app).post("/api/v1/auth/verify-account/verify").send({
			token: verifyToken,
			otp_code: "239887",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);

		expect(response.body.errors).toBeDefined();
		expect(response.body.errors).toBe("Kode OTP yang Anda masukan salah");
	});

	it("Should reject token with mismatched JTI", async () => {
		let verifyToken = jwtHelper.generateVerifyToken({
			user_id: otpAccount.id,
			email: otpAccount.email,
			jti: "diadadjijeihidjoeojd",
			role: otpAccount.role,
			type: "VERIFY_ACCOUNT",
		});

		const response = await supertest(app).post("/api/v1/auth/verify-account/verify").send({
			token: verifyToken,
			otp_code: otpAccount.otp,
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);

		expect(response.body.errors).toBeDefined();
		expect(response.body.errors).toBe("Token tidak valid");
	});

	it("Should be able user active after verify code otp", async () => {
		let verifyToken = jwtHelper.generateVerifyToken({
			user_id: otpAccount.id,
			email: otpAccount.email,
			jti: otpAccount.verify_token ?? "",
			role: otpAccount.role,
			type: "VERIFY_ACCOUNT",
		});

		const response = await supertest(app).post("/api/v1/auth/verify-account/verify").send({
			token: verifyToken,
			otp_code: otpAccount.otp,
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("status", "success");
		expect(response.body).toHaveProperty("code", 200);
		expect(response.body).toHaveProperty("message", "Aktivasi akun berhasil");
		expect(response.body.data).toBeDefined();
		expect(response.body.data).toHaveProperty("is_active", true);

		expect(response.body.data).not.toHaveProperty("password");
	});
});  

describe("POST /api/v1/auth/verify-account/resend-otp", () => {
	let otpAccount: User;

	beforeAll(async () => {
		await UserTest.setupHashedPassword();
	});

	beforeEach(async () => {
		await UserTest.deleteUserTest()
		otpAccount = await UserTest.createUserTestOtp();
	});

	afterEach(async () => {
		await UserTest.deleteUserTest();
	});

	it("Should reject if email account notfound", async () => {
		let verifyToken = jwtHelper.generateVerifyToken({
			user_id: otpAccount.id,
			email: otpAccount.email,
			jti: otpAccount.verify_token ?? "",
			role: otpAccount.role,
			type: "VERIFY_ACCOUNT",
		});

		const response = await supertest(app).post("/api/v1/auth/verify-account/resend-otp").send({
			token: verifyToken,
			email: "example@gmail.com",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);

		expect(response.body.errors).toBeDefined();
		expect(response.body.errors).toBe("Pengguna tidak ditemukan");
	});

	it("Should be able receive otp_code", async () => {
		let verifyToken = jwtHelper.generateVerifyToken({
			user_id: otpAccount.id,
			email: otpAccount.email,
			jti: otpAccount.verify_token ?? "",
			role: otpAccount.role,
			type: "VERIFY_ACCOUNT",
		});

		const response = await supertest(app).post("/api/v1/auth/verify-account/resend-otp").send({
			token: verifyToken,
			email: otpAccount.email,
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("status", "success");
		expect(response.body).toHaveProperty("code", 200);
		expect(response.body).toHaveProperty("message", "Kode verifikasi telah dikirimkan. Cek email Anda.");
		expect(response.body.data).toBeDefined();

		expect(response.body.data).toHaveProperty("email");
		expect(response.body.data).toHaveProperty("otp_last_sent_at");

		expect(response.body.data).not.toHaveProperty("password");

		console.log({response: response.body})
	}, 20000);
});
