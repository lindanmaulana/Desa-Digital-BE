import z from "zod";
import { VALID_GENDER, VALID_MARITAL, VALID_RELATION } from "./validation";

export class UserProfileValidation {
	static readonly CHANGEPASSWORD = z.object({
		password: z.string({ error: "Password tidak boleh kosong" }).min(8, "Password minimal 8 karakter"),
		confirm_password: z.string({ error: "Konfirm password tidak boleh kosong" }).min(8, "Confirm Password minimal 8 karakter"),
	});

	static readonly UPDATE = z.object({
		head_of_family_id: z.string().optional(),
		identity_number: z.string().nullable().optional(),
		gender: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_GENDER)),
		date_of_birth: z.coerce.date().nullable().optional(),
		phone_number: z.string().nullable().optional(),
		occupation: z.string().nullable().optional(),
		marital_status: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_MARITAL)),
		relation: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_RELATION))
	})
}
