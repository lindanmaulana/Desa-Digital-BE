import z from "zod";
import { VALID_BANK } from "./validation";

export const SocialAssistanceRecipientValidation = {
	CREATE: z.object({
		social_assistance_id: z.string().nonempty({error: "Bantuan sosial tidak boleh kosong!"}),
		head_of_family_id: z.string().nonempty({error: "Kepala keluarga tidak boleh kosong!"}),
		amount: z.coerce.number({error: "Nominal harus berupa angka"}).int().positive().min(1, "Nominal pengajuan tidak boleh kosong!"),
		reason: z.string().nonempty({error: "Alasan tidak boleh kosong!"}),
		bank: z.string().transform((v) => v.toUpperCase()).pipe(z.enum(VALID_BANK)),
		account_number: z.string().nonempty({error: "Nomor akun tidak boleh kosong!"}),
		proof: z.string()
	})
}
