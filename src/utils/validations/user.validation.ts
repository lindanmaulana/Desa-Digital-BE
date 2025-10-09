import z from "zod";

export class UserValidation {
	static readonly SIGNUP = z.object({
		name: z.string().nonempty({error: "Nama tidak boleh kosong!"}),
		email: z.email({error: "Email tidak valid!"}).nonempty({error: "Email tidak boleh kosong!"}),
		password: z.string().min(8, {error: "Password minimal 8 karakter"}),
	})

	static readonly SIGNIN = z.object({
		email: z
			.email({ error: "Email tidak valid!" })
			.nonempty({ error: "Email tidak boleh kosong!" }),
		password: z
			.string()
			.nonempty({ error: "password tidak boleh kosong!" }),
	});

	static readonly CHANGEPASSWORD = z.object({
		password: z.string().min(8, "Password minimal 8 karakter"),
		confirmPassword: z.string().min(8, "Confirm Password minimal 8 karakter")
	})
}
