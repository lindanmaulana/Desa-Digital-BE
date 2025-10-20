import z from "zod";
import { VALID_CATEGORY_SOCIAL_ASSISTANCE } from "./validation";

export class SocialAssistanceValidation {
	static readonly IS_ACTIVE = z.preprocess((val) => {
		if (typeof val === "string") {
			const lowerCaseVal = val.toLowerCase()

			return lowerCaseVal === "true"
		}

		return val
	}, z.boolean({error: "Opsi ketersediaan harus Tersedia atau Tidak Tersedia"}))

	static readonly SOCIALASSISTANCE = z.object({
		thumbnail: z.string().nullable().default(null),
		name: z.string().nonempty({error: "Nama tidak boleh kosong"}),
		category: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_CATEGORY_SOCIAL_ASSISTANCE)),
		amount: z.coerce.number({error: "Nominal harus berupa angka"}).int().positive().min(1, "Nominal bantuan tidak boleh kosong"),
		provider: z.string().nonempty({error: "Nama pemberi bantuan tidak boleh kosong"}),
		description: z.string().nullable().default(null),
		is_active: this.IS_ACTIVE
	})

	static readonly GETALL = z.object({
		keyword: z.string().optional(),
		category: z.string().transform((v) => v.toUpperCase()).pipe(z.enum(VALID_CATEGORY_SOCIAL_ASSISTANCE)).optional(),
		is_active: this.IS_ACTIVE.optional(),
		page: z.string().optional(),
		limit: z.string().optional()
	})

	static readonly CREATE = this.SOCIALASSISTANCE
	// static readonly CREATE = z.object({
	// 	thumbnail: z.string().nullable().default(null),
	// 	name: z.string().nonempty({error: "Nama tidak boleh kosong"}),
	// 	category: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_CATEGORY_SOCIAL_ASSISTANCE)),
	// 	amount: z.string().nonempty({error: "Nomimal bantuan tidak boleh kosong"}),
	// 	provider: z.string().nonempty({error: "Nama pemberi bantuan tidak boleh kosong"}),
	// 	description: z.string().nullable().default(null),
	// 	is_active: this.IS_ACTIVE
	// })

	static readonly UPDATE = z.object({
		thumbnail: z.string().optional(),
		name: z.string().nonempty({error: "Nama tidak boleh kosong"}),
		category: z.string().transform((val) => val.toUpperCase()).pipe(z.enum(VALID_CATEGORY_SOCIAL_ASSISTANCE)).optional(),
		amount: z.coerce.number({error: "Nomimal harus berupa angka"}).int().positive().min(1, "Nominal bantuan tidak boleh kosong").optional(),
		provider: z.string().nonempty({error: "Nama pemberi bantuan tidak boleh kosong"}),
		description: z.string().optional(),

		is_active: this.IS_ACTIVE.optional()
	})

}

export type ValidatedFieldsUpdate = z.infer<typeof SocialAssistanceValidation.UPDATE>

		// is_active: z.string().refine((val) => val.toLocaleLowerCase() === "true" || val.toLocaleLowerCase() === "false", {
		// 	error: "Opsi ketersediaan harus Tersedia atau Tidak Tersedia"
		// })
