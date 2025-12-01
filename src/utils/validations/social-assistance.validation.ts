import z from "zod";
import { VALID_CATEGORY_SOCIAL_ASSISTANCE, VALID_SORT } from "./validation";

export class SocialAssistanceValidation {
	static readonly IS_ACTIVE = z.preprocess((val) => {
		if (typeof val === "string") {
			const lowerCaseVal = val.toLowerCase()

			return lowerCaseVal === "true"
		}

		return val
	}, z.boolean({error: "Opsi ketersediaan harus Tersedia atau Tidak Tersedia"}))

	static readonly INDEX = z.object({
		thumbnail: z.string().nullable(),
		name: z.string().nonempty({error: "Nama tidak boleh kosong"}),
		category: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_CATEGORY_SOCIAL_ASSISTANCE)),
		amount: z.coerce.number({error: "Nominal harus berupa angka"}).int({error: "Nominal bantuan harus berupa angka"}).positive({error: "Nominal bantuan tidak valid"}).min(1, "Nominal bantuan tidak boleh kosong"),
		provider: z.string().nonempty({error: "Nama pemberi bantuan tidak boleh kosong"}),
		description: z.string().nullable(),
		is_active: this.IS_ACTIVE
	})

	static readonly GETALL = z.object({
		keyword: z.string().optional(),
		sort: z.string().transform((val) => val.toLowerCase()).pipe(z.enum(VALID_SORT, {error: "Nilai parameter 'sort' tidak valid. Nilai yang diizinkan hanya 'asc' atau 'desc'."})).optional(),
		page: z.string().optional(),
		limit: z.string().optional(),
	})

	static readonly GETONE = z.object({
		id: z.string().nonempty({error: "Id tidak boleh kosong!"})
	})

	static readonly CREATE = this.INDEX.extend({
		thumbnail: z.string().nullable().default(null),
		description: z.string().nullable().default(null)
	})

	static readonly UPDATE = this.INDEX.partial()

	static readonly DELETE = z.object({
		id: z.string().nonempty({error: "Id tidak boleh kosong!"})
	})
}
