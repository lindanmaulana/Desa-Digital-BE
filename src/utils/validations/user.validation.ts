import z from "zod";
import { AuthValidation } from "./auth.validation";
import { VALID_GENDER, VALID_MARITAL, VALID_RELATION, VALID_ROLE } from "./validation";

export class UserValidation {
	static readonly PROFILE = z.object({
		identity_number: z.string().length(16, "NIK harus memiliki 16 ").nullable().default(null),
		gender: z
			.string()
			.transform((val) => val.toUpperCase())
			.pipe(z.enum(VALID_GENDER))
			.default("MALE"),
		date_of_birth: z.coerce.date().nullable().default(null),
		phone_number: z.string().min(10, "Nomor handphone minimal 10 digit").max(13, "Nomor handphone maksimal 13 digit").nullable().default(null),
		occupation: z.string().nullable().default(null),
		marital_status: z
			.string()
			.transform((val) => val.toUpperCase())
			.pipe(z.enum(VALID_MARITAL))
			.default("SINGLE"),
	}).shape;

	static readonly REGISTERSTAFF = AuthValidation.SIGNUP.extend(this.PROFILE);

	static readonly REGISTERHEADOFFAMILY = AuthValidation.SIGNUP.extend(this.PROFILE);

	static readonly GETALL = z.object({
		keyword: z.string().optional(),
		role: z
			.string()
			.transform((val) => val.toUpperCase())
			.pipe(z.enum(VALID_ROLE))
			.optional(),
		is_active: z
			.preprocess((val) => {
				if (typeof val === "string") {
					const lowerCaseVal = val.toLocaleLowerCase();

					return lowerCaseVal === "true";
				}

				return val;
			}, z.boolean())
			.optional(),
		page: z.string().optional(),
		limit: z.string().optional(),
	});

	static readonly UPDATEPROFILE = z.object({
		head_of_family_id: z.string().optional(),
		identity_number: z.string().nullable().optional(),
		gender: z
			.string()
			.transform((val) => val.toUpperCase())
			.pipe(z.enum(VALID_GENDER)),
		date_of_birth: z.coerce.date().nullable().optional(),
		phone_number: z.string().nullable().optional(),
		occupation: z.string().nullable().optional(),
		marital_status: z
			.string()
			.transform((val) => val.toUpperCase())
			.pipe(z.enum(VALID_MARITAL)),
		relation: z
			.string()
			.transform((val) => val.toUpperCase())
			.pipe(z.enum(VALID_RELATION)),
	});

	static readonly CHANGEPASSWORD = z.object({
		password: z.string({ error: "Password tidak boleh kosong" }).min(8, "Password minimal 8 karakter"),
		confirm_password: z.string({ error: "Konfirm password tidak boleh kosong" }).min(8, "Confirm Password minimal 8 karakter"),
	});
}
