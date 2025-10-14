import z from "zod";
import { AuthValidation } from "./auth.validation";
import { StaffValidation } from "./staff.validation";
import { VALID_GENDER, VALID_MARITAL, VALID_ROLE } from "./validation";

export class UserValidation {
	static readonly REGISTERSTAFF = AuthValidation.SIGNUP.extend(z.object({
			profile_picture: z.string().optional(),
			identity_number: z.string().optional(),
			gender: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_GENDER)).optional(),
			date_of_birth: z.string().optional(),
			phone_number: z.string().optional(),
			occupation: z.string().optional(),
			marital_status: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_MARITAL)).optional()
	}).shape)

	static readonly GETALL = z.object({
		keyword: z.string().optional(),
		role: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_ROLE)).optional(),
		is_active: z.string().optional(),
		page: z.string().optional(),
		limit: z.string().optional()
	})

	static readonly CHANGEPASSWORD = z.object({
		password: z.string({ error: "Password tidak boleh kosong" }).min(8, "Password minimal 8 karakter"),
		confirm_password: z.string({ error: "Konfirm password tidak boleh kosong" }).min(8, "Confirm Password minimal 8 karakter"),
	});
}
