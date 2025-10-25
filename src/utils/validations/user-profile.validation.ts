import z from "zod";
import { VALID_GENDER, VALID_MARITAL } from "./validation";

export class UserProfileValidation {
	static readonly CHANGEPASSWORD = z.object({
		password: z.string({ error: "Password tidak boleh kosong" }).min(8, "Password minimal 8 karakter"),
		confirm_password: z.string({ error: "Konfirm password tidak boleh kosong" }).min(8, "Confirm Password minimal 8 karakter"),
	});

	static readonly UPDATE = z.object({
		profile_picture: z.string().optional(),
		identity_number: z.string().optional(),
		gender: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_GENDER)).optional(),
		date_of_birth: z.coerce.date().optional(),
		phone_number: z.string().optional(),
		occupation: z.string().optional(),
		marital_status: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_MARITAL)).optional()
	})
}
