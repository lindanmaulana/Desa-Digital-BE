import { UserRole } from "@prisma/client";
import z from "zod";

export class UserValidation {
	static readonly SIGNUP = z.object({
		name: z.string().nonempty({error: "Nama tidak boleh kosong!"}),
		email: z.email({error: "Email tidak valid!"}).nonempty({error: "Email tidak boleh kosong!"}),
		password: z.string().min(8, {error: "Password minimal 8 karakter"}),
		role: z.enum(UserRole).default(UserRole.RESIDENT),
		is_first_login: z.boolean().default(true)
	})

	static readonly SIGNIN = z.object({
		email: z
			.email({ error: "Email tidak valid!" })
			.nonempty({ error: "Email tidak boleh kosong!" }),
		password: z
			.string()
			.nonempty({ error: "password tidak boleh kosong!" }),
	});
}
