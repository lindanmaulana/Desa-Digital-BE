import bcrypt from "bcryptjs";
import supertest from "supertest";
import { logger } from "../src/logging";
import { app } from "../src/web";
import { UserTest } from "./user.utils";

describe("POST /api/v1/auth/signup", () => {
	afterEach(async () => {
		await UserTest.deleteAdmin();
	});

	it("Should reject signup if request invalid", async () => {
		const response = await supertest(app).post("/api/v1/auth/signup").send({
			name: "",
			email: "",
			password: "",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should signup new user CREDENTIALS", async () => {
		const response = await supertest(app)
			.post("/api/v1/auth/signup")
			.send({
				name: "admin",
				email: "admin@gmail.com",
				password: await bcrypt.hash("admin123", 4),
			});

		logger.debug(response.body);
		expect(response.status).toBe(201);

		expect(response.body).toHaveProperty("status", "success");
		expect(response.body).toHaveProperty("code", 201);
		expect(response.body).toHaveProperty("message", "Pendaftaran berhasil");
		expect(response.body.data).toBeDefined();

		expect(response.body.data).toHaveProperty("id");
		expect(typeof response.body.data.id).toBe("string");

		expect(response.body.data).not.toHaveProperty("password");
	});
});

describe("POST /api/v1/auth/signin", () => {
	beforeEach(async () => {
		await UserTest.createUserTest();
		await UserTest.createUserTestActive();
	});

	afterEach(async () => {
		await UserTest.deleteUserTest();
	});

	it("Should reject signin if request invalid", async () => {
		const response = await supertest(app).post("/api/v1/auth/signin").send({
			email: "",
			password: "",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("Should reject signin if account not found or invalid credentials", async () => {
		const response = await supertest(app).post("/api/v1/auth/signin").send({
			email: "example@gmail.com",
			password: "example123",
		});

		logger.debug(response.body);
		expect(response.status).toBe(403);

		expect(response.body.errors).toBeDefined();
		expect(response.body.errors).toBe("Invalid credentials");
	});

	it("Should reject signin if is_active account false", async () => {
		const response = await supertest(app).post("/api/v1/auth/signin").send({
			email: "usertest@gmail.com",
			password: "usertest123",
		});

		logger.debug(response.body);
		expect(response.status).toBe(403);

		expect(response.body.errors).toBeDefined();
		expect(response.body.errors).toBe("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun");
		expect(response.body.email).toBeDefined();
		expect(response.body.status).toBe("need_activation");
	});

	it("Should be able signin", async () => {
		const response = await supertest(app).post("/api/v1/auth/signin").send({
			email: "useractive@gmail.com",
			password: "useractive123",
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("status", "success");
		expect(response.body).toHaveProperty("code", 200);
		expect(response.body).toHaveProperty("message", "Login berhasil");
		expect(response.body.data).toBeDefined();

		expect(response.body.data).toHaveProperty("id");
		expect(response.body.data).toHaveProperty("token");
		expect(typeof response.body.data.id).toBe("string");
		expect(typeof response.body.data.token).toBe("string");

		expect(response.body.data).not.toHaveProperty("password");
	});

	it("Should reject activation if request body invalid", async () => {
		const response = await supertest(app).post("/api/v1/auth/verify-account").send({
			email: "",
			otp_code: "",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);

		expect(response.body.errors).toBeDefined();
	});

	it("Should reject activation if email invalid", async () => {
		const response = await supertest(app).post("/api/v1/auth/verify-account").send({
			email: "example@gmail.com",
			otp_code: "237899",
		});

		logger.debug(response.body);
		expect(response.status).toBe(401);

		expect(response.body.errors).toBeDefined();
		expect(response.body.errors).toBe("Email tidak valid atau pengguna telah terhapus");
	});

	it("Should reject activation if is_active account true", async () => {
		const response = await supertest(app).post("/api/v1/auth/verify-account").send({
			email: "Kailyn_Gusikowski@hotmail.com",
			otp_code: "237899",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);

		expect(response.body.errors).toBeDefined();
		expect(response.body.errors).toBe("Akun anda sudah aktif");
	});

	// it("Should reject activation if otp_code invalid", async () => {});
});
