import z from "zod";
import { VALID_CATEGORY_SOCIAL_ASSISTANCE } from "./validation";

export class SocialAssistanceValidation {
	static readonly CREATE = z.object({
		thumbnail: z.string().optional(),
		name: z.string().nonempty({error: "Nama tidak boleh kosong"}),
		category: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_CATEGORY_SOCIAL_ASSISTANCE)),
		amount: z.string().nonempty({error: "Nomimal bantuan tidak boleh kosong"}),
		provider: z.string().nonempty({error: "Nama pemberi bantuan tidak boleh kosong"}),
		description: z.string().optional(),
		is_active: z.string().refine((val) => val.toLocaleLowerCase() === "true" || val.toLocaleLowerCase() === "false", {
			error: "Opsi ketersediaan harus Tersedia atau Tidak Tersedia"
		})
	})
}
