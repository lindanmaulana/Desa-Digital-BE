import z from "zod";
import { VALID_BANK, VALID_SORT, VALID_STATUS_SOCIAL_ASSISTANCE_RECIPIENT } from "./validation";

export const SocialAssistanceRecipientValidation = {
	CREATE: z.object({
		social_assistance_id: z.string().nonempty({error: "Bantuan sosial tidak boleh kosong!"}),
		amount: z.coerce.number({error: "Nominal harus berupa angka"}).int({error: "Nominal pengajuan harus berupa angka"}).positive({error: "Nominal pengajuan tidak valid"}).min(1, "Nominal pengajuan tidak boleh kosong!"),
		reason: z.string().nonempty({error: "Alasan tidak boleh kosong!"}),
		bank: z.string().transform((v) => v.toUpperCase()).pipe(z.enum(VALID_BANK)),
		account_number: z.string().min(10, "Nomor rekening bank harus terdiri dari minimal 10 digit.").max(16, "Nomor rekening tidak boleh melebihi 16 digit. Mohon cek kembali bank penerbit"),
		account_name: z.string().nonempty({error: "Nama akun tidak boleh kosong!"}),
	}),

	UPDATE: z.object({
		status: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_STATUS_SOCIAL_ASSISTANCE_RECIPIENT))
	}),

	GETALL: z.object({
		keyword: z.string().optional(),
		page: z.string().optional(),
		limit: z.string().optional(),
		sort: z.string().transform((val) => val.toLowerCase()).pipe(z.enum(VALID_SORT, {error: "Nilai parameter 'sort' tidak valid. Nilai yang diizinkan hanya 'asc' atau 'desc'."})).optional()
	}),

	GETONE: z.object({
		id: z.string().nonempty({error: "ID tidak boleh kosong"})
	})
}

export type TypeSocialAssistanceRecipientCreateSchema = z.infer<typeof SocialAssistanceRecipientValidation.CREATE>
export type TypeSocialAssistanceRecipientUpdateSchema = z.infer<typeof SocialAssistanceRecipientValidation.UPDATE>
