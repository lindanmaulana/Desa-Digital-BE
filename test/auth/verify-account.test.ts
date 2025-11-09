import supertest from "supertest";
import { UserTest } from "../users/user.utils";
import { app } from "../../src/web";
import { logger } from "../../src/logging";

describe("POST /api/v1/auth/verify-account/verify", () => {
	beforeAll(async () => {
		await UserTest.setupHashedPassword();
	});

	beforeEach(async () => {
		await UserTest.deleteUserTest();
		await UserTest.createUserTestOtp();
		await UserTest.createUserTestActive();
	});

	afterEach(async () => {
		await UserTest.deleteUserTest();
	});

	// it("Should reject activation if request body invalid", async () => {
	// 	const response = await supertest(app).post("/api/v1/auth/verify-account/verify").send({
	// 		token: "",
	// 		otp_code: "",
	// 	});

	// 	logger.debug(response.body);
	// 	expect(response.status).toBe(400);

	// 	expect(response.body.errors).toBeDefined();
	// });

	// it("Should reject activation if token invalid", async () => {
	// 	const response = await supertest(app).post("/api/v1/auth/verify-account/verify").send({
	// 		email: "sdhiadhadihedhasd",
	// 		otp_code: "237899",
	// 	});

	// 	logger.debug(response.body);
	// 	expect(response.status).toBe(400);

	// 	expect(response.body.errors).toBeDefined();
	// });

	// it("Should reject activation if is_active account true", async () => {
	// 	const response = await supertest(app).post("/api/v1/auth/verify-account/verify").send({
	// 		email: "Kailyn_Gusikowski@hotmail.com",
	// 		otp_code: "237899",
	// 	});

	// 	logger.debug(response.body);
	// 	expect(response.status).toBe(400);

	// 	expect(response.body.errors).toBeDefined();
	// 	expect(response.body.errors).toBe("Akun anda sudah aktif");
	// });

	// it("Should reject activation if otp_code invalid", async () => {
	// 	const response = await supertest(app).post("/api/v1/auth/verify-account/verify").send({
	// 		email: "userotp@gmail.com",
	// 		otp_code: "239887",
	// 	});

	// 	logger.debug(response.body);
	// 	expect(response.status).toBe(400);

	// 	expect(response.body.errors).toBeDefined();
	// 	expect(response.body).toHaveProperty("errors", "Kode OTP yang Anda masukan salah");
	// });

	// it("Should be able user active after verify code otp", async () => {
	// 	const response = await supertest(app).post("/api/v1/auth/verify-account/verify").send({
	// 		email: "userotp@gmail.com",
	// 		otp_code: "223344",
	// 	});

	// 	logger.debug(response.body);
	// 	expect(response.status).toBe(200);

	// 	expect(response.body).toHaveProperty("status", "success");
	// 	expect(response.body).toHaveProperty("code", 200);
	// 	expect(response.body).toHaveProperty("message", "Aktivasi akun berhasil");
	// 	expect(response.body.data).toBeDefined();
	// 	expect(response.body.data).toHaveProperty("is_active", true);

	// 	expect(response.body.data).not.toHaveProperty("password");
	// });
});

// describe("POST /api/v1/auth/verify-account/resend-otp", () => {
// 	beforeAll(async () => {
// 		await UserTest.setupHashedPassword();
// 	});

// 	beforeEach(async () => {
// 		await UserTest.createUserTestOtp();
// 	});

// 	afterEach(async () => {
// 		await UserTest.deleteUserTest();
// 	});

// 	it("Should reject if email account notfound", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/resend-otp").send({
// 			email: "example@gmail.com",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(400);

// 		expect(response.body.errors).toBeDefined();
// 		expect(response.body).toHaveProperty("errors", "Pengguna tidak ditemukan");
// 	});

// 	it("Should be able receive otp_code", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/resend-otp").send({
// 			email: "userotp@gmail.com",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(200);

// 		expect(response.body).toHaveProperty("status", "success");
// 		expect(response.body).toHaveProperty("code", 200);
// 		expect(response.body).toHaveProperty("message", "Kode verifikasi telah dikirimkan. Cek email Anda.");
// 		expect(response.body.data).toBeDefined();

// 		expect(response.body.data).toHaveProperty("email");
// 		expect(response.body.data).toHaveProperty("otp_last_sent_at");

// 		expect(response.body.data).not.toHaveProperty("password");
// 	}, 20000);
// });
