import z from "zod";
import { AuthValidation } from "./auth.validation";
import { VALID_GENDER, VALID_MARITAL, VALID_ROLE } from "./validation";

export class UserValidation {
	static readonly PROFILE = z.object({
		identity_number: z.string().nullable().default(null),
		gender: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_GENDER)).default("MALE"),
		date_of_birth: z.coerce.date().nullable().default(null),
		phone_number: z.string().nullable().default(null),
		occupation: z.string().nullable().default(null),
		marital_status: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_MARITAL)).default("SINGLE")
	}).shape

	static readonly REGISTERSTAFF = AuthValidation.SIGNUP.extend(this.PROFILE)

	static readonly REGISTERHEADOFFAMILY = AuthValidation.SIGNUP.extend(this.PROFILE)

	static readonly GETALL = z.object({
		keyword: z.string().optional(),
		role: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_ROLE)).optional(),
		is_active: z.preprocess((val) => {
			if (typeof val === "string") {
				const lowerCaseVal = val.toLocaleLowerCase()

				return lowerCaseVal === "true"
			}

			return val
		}, z.boolean()).optional(),
		page: z.string().optional(),
		limit: z.string().optional()
	})
}
