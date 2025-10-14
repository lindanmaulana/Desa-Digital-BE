import z from "zod";

export class HeadOfFamilyValidation {
	static readonly CREATE = z.object({
		user_id: z.string().nonempty({error: "Id Pengguna tidak boleh kosong"}),
		profile_picture: z.string().optional(),
		identity_number: z.string().optional(),
		gender: z.string().toUpperCase().optional(),
		date_of_birth: z.string().optional(),
		phone_number: z.string().optional(),
		occupation: z.string().optional(),
		marital_status: z.string().toUpperCase().optional()
	})
}
