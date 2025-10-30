import z from "zod";

export class AuthValidation {
	static readonly SIGNUP = z.object({
		name: z.string().nonempty({ error: "Nama tidak boleh kosong!" }),
		email: z.email({ error: "Email tidak valid!" }).nonempty({ error: "Email tidak boleh kosong!" }),
		password: z.string().min(8, { error: "Password minimal 8 karakter" }),
	});

	static readonly SIGNIN = z.object({
		email: z.email({ error: "Email tidak valid!" }).nonempty({ error: "Email tidak boleh kosong!" }),
		password: z.string().nonempty({ error: "password tidak boleh kosong!" }),
	});

	static readonly ACTIVATION = z.object({
		email: z.email({ error: "Format email tidak valid" }).nonempty({ error: "Email tidak boleh kosong" }),
		otp_code: z.string().nonempty({ error: "Kode OTP tidak boleh kosong" }),
	});

	static readonly RESENDOTP = z.object({
		token: z.string().nonempty({ error: "Token tidak boleh kosong" }),
	});

	static readonly FORGOTPASSWORD = z.object({
		email: z.email({error: "Format email tidak valid"}).nonempty({error: "Email tidak boleh kosong"})
	})

	static readonly MATCHOTP = z.object({
		email: z.email({error: "Format email tidak valid"}).nonempty({error: "Email tidak boleh kosong"}),
		otp_code: z.string().nonempty({error: "Kode OTP tidak boleh kosong"})
	})

	static readonly RESETPASSWORD = z.object({
		password: z.string().min(8, {error: "Password minimal 8 karakter"}),
		confirm_password: z.string().min(8, {error: "Konfirm password minimal 8 karakter"})
	})
}
