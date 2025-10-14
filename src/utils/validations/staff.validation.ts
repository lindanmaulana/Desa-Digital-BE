import z from "zod";
import { VALID_GENDER, VALID_MARITAL } from "./validation";

export class StaffValidation {
	static readonly CREATE = z.object({
		user_id: z.string().nonempty({ error: "Id Pengguna tidak boleh kosong" }),
		profile_picture: z.string().optional(),
		identity_number: z.string().optional(),
		gender: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_GENDER)),
		date_of_birth: z.string().optional(),
		phone_number: z.string().optional(),
		occupation: z.string().optional(),
		marital_status: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_MARITAL))
	});
}
