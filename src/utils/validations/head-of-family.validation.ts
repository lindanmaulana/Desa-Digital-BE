import z from "zod";

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
		limit: z.string().optional()
	})
};
