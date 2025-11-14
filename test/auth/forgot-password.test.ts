import supertest from "supertest";
import { app } from "../../src/web";
import { logger } from "../../src/logging";
import { UserTest } from "../users/user.utils";

// describe("POST /api/v1/auth/forgot-password/request", () => {
// 	const endPoint = "/api/v1/auth/forgot-password/request"
// 	beforeAll(async () => {
// 		await UserTest.setupHashedPassword();
// 	});

// 	beforeEach(async () => {
// 		await UserTest.deleteUserTest()

// 		await UserTest.createUserTest()
// 		await UserTest.createUserTestActive();
// 	});

// 	afterEach(async () => {
// 		await UserTest.deleteUserTest();
// 	});

// 	it("Should reject if req body empty", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/request").send({});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(400);

// 		expect(response.body.errors).toBeDefined();
// 		expect(response.body.errors).toEqual(expect.arrayContaining(["Format email tidak valid"]));

// 		expect(response.body).not.toHaveProperty("data");
// 	});

// 	it("Should reject if email empty", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/request").send({
// 			email: "",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(400);

// 		expect(response.body.errors).toBeDefined();
// 		expect(response.body.errors).toEqual(expect.arrayContaining(["Format email tidak valid", "Email tidak boleh kosong"]));

// 		expect(response.body).not.toHaveProperty("data");
// 	});

// 	it("Should reject if email not matching", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/request").send({
// 			email: "examplmark123@gmail.com",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(404);

// 		expect(response.body.errors).toBeDefined();
// 		expect(response.body.errors).toBe("Pengguna tidak ditemukan");

// 		expect(response.body).not.toHaveProperty("data");
// 	});

// 	it ("Should reject if account inactive", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/request").send({
// 			email: "testuser@gmail.com",
// 		});

// 		logger.debug(response.body)
// 		expect(response.status).toBe(400)

// 		expect(response.body.errors).toBeDefined(),
// 		expect(response.body.errors).toBe("Akun anda belum aktif haraf aktivasi terlebih dahulu")
// 	})

// 	it("Should be able receive email & otp_last_sent_at", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/request").send({
// 			email: "testuseractive@gmail.com",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(200);

// 		expect(response.body).toHaveProperty("data")
// 		expect(response.body.data).toHaveProperty("email");
// 		expect(response.body.data).toHaveProperty("otp_last_sent_at");

// 		expect(response.body).not.toHaveProperty("errors");
// 	}, 20000);
// });

// describe("POST /api/v1/auth/forgot-password/verify-otp", () => {
// 	beforeAll(async () => {
// 		await UserTest.setupHashedPassword();
// 	});

// 	beforeEach(async () => {
// 		await UserTest.deleteUserTest()
// 		await UserTest.createUserTestOtp();
// 	});

// 	afterEach(async () => {
// 		await UserTest.deleteUserTest();
// 	});

// 	it("Should reject if request body invalid", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/verify-otp").send({
// 			email: "",
// 			otp_code: "",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(400);

// 		expect(response.body.errors).toBeDefined();
// 		expect(response.body).not.toHaveProperty("data");
// 	});

// 	it("Should reject if email invalid", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/verify-otp").send({
// 			email: "examplemail@gmail.com",
// 			otp_code: "223344",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(404);

// 		expect(response.body.errors).toBeDefined();
// 		expect(response.body.errors).toBe("Pengguna tidak ditemukan");

// 		expect(response.body).not.toHaveProperty("data");
// 	});

// 	it("Should reject if invalid otp_code", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/verify-otp").send({
// 			email: "testuserotp@gmail.com",
// 			otp_code: "889988",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(400);

// 		expect(response.body.errors).toBeDefined();
// 		expect(response.body.errors).toBe("Kode OTP yang anda masukan salah");

// 		expect(response.body).not.toHaveProperty("data");
// 	});

// 	it("Should reject if OTP format invalid (e.g., wrong length", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/verify-otp").send({
// 			email: "testuserotp@gmail.com",
// 			otp_code: "883",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(400);

// 		expect(response.body.errors).toBeDefined();
// 	});

// 	it("Should be able receive verify_token_last_sen_at", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/verify-otp").send({
// 			email: "testuserotp@gmail.com",
// 			otp_code: "223344",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(200);

// 		expect(response.body).toHaveProperty("data");
// 		expect(response.body.data).toHaveProperty("verify_token_last_sen_at");

// 		expect(response.body).not.toHaveProperty("errors");
// 	});
// });

// describe("POST /api/v1/auth/forgot-password/reset", () => {
// 	let userData: any;
// 	let verifyToken: any;

// 	beforeAll(async () => {
// 		await UserTest.setupHashedPassword();
// 	});

// 	beforeEach(async () => {
// 		const user = await UserTest.createUserForgotPassword();

// 		userData = user;

// 		const response = await supertest(app).post("/api/v1/auth/verify-otp").send({
// 			email: userData.email,
// 			otp_code: userData.otp_code,
// 		});

// 		logger.info(response.body.data.verify_token)
// 		verifyToken = response.body.data.verify_token;
// 	});

// 	afterEach(async () => {
// 		await UserTest.deleteUserTest();
// 	});

// 	it("Should reject if request header verify_token not found", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/reset").send({
// 			password: "",
// 			confirm_password: "",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(401);

// 		expect(response.body.errors).toBeDefined();
// 	});

// 	it("Should reject if token invalid", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/reset").set("Authorization", `Bearer hdeudhe9272gduhd9whduwh`).send({
// 			password: "",
// 			confirm_password: "",
// 		});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(401);

// 		expect(response.body.errors).toBeDefined();
// 	});

// 	it("Should reject if password and confirm_password not match", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/reset").set("Authorization", `Bearer ${verifyToken}`).send({
// 			password: "paswooord123hhd",
// 			confirm_password: "confirmpasswoej2032",
// 		});

// 		logger.debug(response.body)
// 		expect(response.status).toBe(400)

// 		expect(response.body.errors).toBeDefined()
// 	});

// 	it("Should be able success reset-password", async () => {
// 		const response = await supertest(app).post("/api/v1/auth/forgot-password/reset").set("Authorization", `Bearer ${verifyToken}`).send({
// 			password: "newpassword123",
// 			confirm_password: "newpassword123"
// 		})

// 		logger.debug(response.body)
// 		expect(response.status).toBe(200)

// 		expect(response.body).toHaveProperty("data")
// 		expect(response.body.status).toBe("success")
// 		expect(response.body.code).toBe(200)
// 		expect(response.body.message).toBe("Password berhasil di ubah, harap login kembali")

// 		expect(response.body.data).not.toHaveProperty("password")
// 	})
// });
