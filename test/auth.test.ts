import supertest from "supertest";
import { logger } from "../src/logging";
import { app } from "../src/web";
import { UserTest } from "./user.utils";

describe("POST /api/v1/auth/signup", () => {
	beforeAll(async () => {
		await UserTest.setupHashedPassword();
	});

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
		const response = await supertest(app).post("/api/v1/auth/signup").send({
			name: "admin",
			email: "admin@gmail.com",
			password: UserTest.HASHED_PASSWORD_USERTEST,
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
	}, 20000);
});

describe("POST /api/v1/auth/signin", () => {
	beforeAll(async () => {
		await UserTest.setupHashedPassword();
	});

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
			password: "usertest123",
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
});

describe("POST /api/v1/auth/verify-account", () => {
	beforeAll(async () => {
		await UserTest.setupHashedPassword();
	});

	beforeEach(async () => {
		await UserTest.createUserTestActive();
		await UserTest.createUserTestOtp();
	});

	afterEach(async () => {
		await UserTest.deleteUserTest();
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

	it("Should reject activation if otp_code invalid", async () => {
		const response = await supertest(app).post("/api/v1/auth/verify-account").send({
			email: "userotp@gmail.com",
			otp_code: "239887",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);

		expect(response.body.errors).toBeDefined();
		expect(response.body).toHaveProperty("errors", "Kode OTP yang Anda masukan salah");
	});

	it("Should be able user active after verify code otp", async () => {
		const response = await supertest(app).post("/api/v1/auth/verify-account").send({
			email: "userotp@gmail.com",
			otp_code: "223344",
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

describe("POST /api/v1/auth/resend-otp", () => {
	beforeAll(async () => {
		await UserTest.setupHashedPassword();
	});

	beforeEach(async () => {
		await UserTest.createUserTestOtp();
	});

	afterEach(async () => {
		await UserTest.deleteUserTest();
	});

	it("Should reject if email account notfound", async () => {
		const response = await supertest(app).post("/api/v1/auth/resend-otp").send({
			email: "example@gmail.com",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);

		expect(response.body.errors).toBeDefined();
		expect(response.body).toHaveProperty("errors", "Pengguna tidak ditemukan");
	});

	it("Should be able receive otp_code", async () => {
		const response = await supertest(app).post("/api/v1/auth/resend-otp").send({
			email: "userotp@gmail.com",
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
	}, 20000);
});

describe("POST /api/v1/auth/forgot-password", () => {
	beforeAll(async () => {
		await UserTest.setupHashedPassword();
	});

	beforeEach(async () => {
		await UserTest.createUserTest();
	});

	afterEach(async () => {
		await UserTest.deleteUserTest();
	});

	it("Should reject if req body empty", async () => {
		const response = await supertest(app).post("/api/v1/auth/forgot-password").send({})

		logger.debug(response.body)
		expect(response.status).toBe(400)

		expect(response.body.errors).toBeDefined()
		expect(response.body.errors).toEqual(expect.arrayContaining(["Format email tidak valid"]))

		expect(response.body).not.toHaveProperty("data")
	});

	it("Should reject if email empty", async () => {
		const response = await supertest(app).post("/api/v1/auth/forgot-password").send({
			email: ""
		})

		logger.debug(response.body)
		expect(response.status).toBe(400)

		expect(response.body.errors).toBeDefined()
		expect(response.body.errors).toEqual(expect.arrayContaining(["Format email tidak valid", "Email tidak boleh kosong"]))

		expect(response.body).not.toHaveProperty("data")
	})

	it("Should reject if email not matching", async () => {
		const response = await supertest(app).post("/api/v1/auth/forgot-password").send({
			email: "examplmark123@gmail.com"
		})

		logger.debug(response.body)
		expect(response.status).toBe(404)

		expect(response.body.errors).toBeDefined()
		expect(response.body.errors).toBe("Pengguna tidak ditemukan")

		expect(response.body).not.toHaveProperty("data")
	})

	it("Should be able receive email & otp_last_sent_at", async () => {
		const response = await supertest(app).post("/api/v1/auth/forgot-password").send({
			email: "usertest@gmail.com"
		})

		logger.debug(response.body)
		expect(response.status).toBe(200)

		expect(response.body.data).toHaveProperty("email")
		expect(response.body.data).toHaveProperty("otp_last_sent_at")

		expect(response.body).not.toHaveProperty("errors")
	}, 20000)

	// email: z.email({error: "Format email tidak valid"}).nonempty({error: "Email tidak boleh kosong"})

			// email: result.email,
			// otp_last_sent_at: new Date()
});
