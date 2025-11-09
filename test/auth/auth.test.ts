import supertest from "supertest";
import { logger } from "../../src/logging";
import { app } from "../../src/web";
import { UserTest } from "../users/user.utils";

describe("POST /api/v1/auth/signin", () => {
	beforeAll(async () => {
		await UserTest.setupHashedPassword();
	});

	beforeEach(async () => {
		await UserTest.deleteUserTest();

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

	it("Should reject signin if account inactive", async () => {
		const response = await supertest(app).post("/api/v1/auth/signin").send({
			email: "testuserexample@gmail.com",
			password: "testpassword123",
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
			email: "testuseractive@gmail.com",
			password: "testpassword123",
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("status", "success");
		expect(response.body).toHaveProperty("code", 200);
		expect(response.body).toHaveProperty("message", "Login berhasil");
		expect(response.body.data).toBeDefined();

		expect(response.body.data).toHaveProperty("id");
		expect(typeof response.body.data.id).toBe("string");

		expect(response.body.data).not.toHaveProperty("token");
		expect(response.body.data).not.toHaveProperty("password");
	});
});
