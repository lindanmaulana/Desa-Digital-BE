import z from "zod";
import { VALID_ENTITY_IMAGE } from "./validation";

export const ImageValidation = {
	CREATE: z.object({
		profile_id: z.string().nullable(),
		user_id: z.string().nullable(),
		social_assistance_id: z.string().nullable(),
		social_assistance_recipient_id: z.string().nullable(),
		event_id: z.string().nullable(),
		development_id: z.string().nullable()
	}),

	UPLOAD_SOCIAL_ASSISTANCE: z.object({
		id: z.string().nonempty({error: "Id bantuan sosial tidak boleh kosong."})
	})
}

const ExtendImageCreateSchema = ImageValidation.CREATE.extend({
	path: z.string().nonempty({error: "Nama path tidak boleh kosong."}),
	filename: z.string().nonempty({error: "Nama file tidak boleh kosong."}),
	entity: z.string().transform(val => val.toUpperCase()).pipe(z.enum(VALID_ENTITY_IMAGE))
})

export type TypeImageCreateSchema = z.infer<typeof ExtendImageCreateSchema>
