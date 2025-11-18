import z from "zod";
import { VALID_SORT } from "./validation";

export const HeadOfFamilyValidation = {
	CREATE: z.object({
		user_id: z.string().nonempty({ error: "Id Pengguna tidak boleh kosong" }),
		identity_number: z.string().optional(),
		gender: z.string().toUpperCase().optional(),
		date_of_birth: z.string().optional(),
		phone_number: z.string().optional(),
		occupation: z.string().optional(),
		marital_status: z.string().toUpperCase().optional(),
	}),

	GETALL: z.object({
		keyword: z.string().optional(),
		page: z.string().optional(),
		limit: z.string().optional(),
		sort: z.string().transform((val) => val.toLowerCase()).pipe(z.enum(VALID_SORT)).optional()
	}),

	GETONE: z.object({
		id: z.string().nonempty({error: "Id Pengguna tidak boleh kosong!"})
	})
};
