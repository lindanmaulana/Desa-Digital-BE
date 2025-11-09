import supertest from "supertest";
import { app } from "../../src/web";

export class AuthTest {
	static async signinAdmin() {
		const result = await supertest(app).post("/auth/signin").send({
			email: "admin_testing@gmail.com",
			password: "usertest123",
		});

		return result;
	}
}
