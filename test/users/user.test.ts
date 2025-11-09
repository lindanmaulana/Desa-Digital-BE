import { logger } from "../../src/logging";
import { AuthTest } from "../auth/auth.utils";
import { authenticatedRequest } from "../index.utils";
import { UserTest } from "./user.utils";

// describe("POST /api/v1/admin/users/head-of-family/register", () => {
// 	let tokenAdmin: string;

// 	beforeAll(async () => {
// 		await UserTest.setupHashedPassword();
// 	});

// 	beforeEach(async () => {
// 		await UserTest.createAdminTest();
// 		const response = await AuthTest.signinAdmin();

// 		tokenAdmin = response.headers["set-cookie"][0];
// 	});

// 	afterEach(async () => {
// 		await UserTest.deleteUserTest();
// 		await UserTest.deleteAdminTest();
// 	});

// 	it("Should reject if request invalid", async () => {
// 		const response = await authenticatedRequest
// 			.post("/api/v1/admin/users/head-of-family/register")
// 			.set({
// 				Authorization: `Bearer ${tokenAdmin}`,
// 			})
// 			.send({
// 				name: "",
// 				email: "",
// 				password: "",
// 			});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(401);
// 		expect(response.body.errors).toBeDefined();
// 	});

// 	it("Should reject if email already axist", async () => {
// 		const response = await authenticatedRequest
// 			.post("/api/v1/admin/users/head-of-family/register")
// 			.set({
// 				Authorization: `Bearer ${tokenAdmin}`,
// 			})
// 			.send({
// 				name: "usertest",
// 				email: "lindanmaulanamagang@gmail.com",
// 				password: UserTest.HASHED_PASSWORD_USERTEST,
// 			});

// 		logger.debug(response.body);
// 		expect(response.status).toBe(401);
// 		expect(response.body.errors).toBeDefined();
// 		expect(response.body.errors).toBe("Email telah digunakan");
// 	});
// });
