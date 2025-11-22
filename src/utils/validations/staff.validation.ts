import z from "zod";
import { VALID_GENDER, VALID_MARITAL, VALID_SORT } from "./validation";

export const StaffValidation = {
	CREATE: z.object({
		user_id: z.string().nonempty({ error: "Id Pengguna tidak boleh kosong" }),
		identity_number: z.string().optional(),
		gender: z.string().transform(val => val.toUpperCase()).pipe(z.enum(VALID_GENDER)),
		date_of_birth: z.string().optional(),
		phone_number: z.string().optional(),
		occupation: z.string().optional(),
		marital_status: z.string().transform(val => val.toUpperCase()).pipe(z.enum(VALID_MARITAL)),
	}),

	GETALL: z.object({
		keyword: z.string().optional(),
		page: z.string().optional(),
		limit: z.string().optional(),
		sort: z.string().transform((val) => val.toLowerCase()).pipe(z.enum(VALID_SORT, {error: "Nilai parameter 'sort' tidak valid. Nilai yang diizinkan hanya 'asc' atau 'desc'."})).optional()
	}),

	GETONE: z.object({
		id: z.string().nonempty({error: "Id Pengguna tidak boleh kosong!"})
	}),

	DELETE: z.object({
		id: z.string().nonempty({error: "Id Pengguna tidak boleh kosong!"})
	}),
}
