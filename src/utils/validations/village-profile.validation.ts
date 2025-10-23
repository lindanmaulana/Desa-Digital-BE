import z from "zod";

export class VillageProfileValidation {
	static readonly INDEX = z.object({
		thumbnail: z.string().nonempty({error: "Thumbnail tidak boleh kosong"}),
		name: z.string().nonempty({error: "Nama Desa tidak boleh kosong"}),
		about: z.string().nonempty({error: "Tentang Desa tidak boleh kosong"}),
		headman: z.string().nonempty({error: "Kepala Desa tidak boleh kosong"}),
		people: z.coerce.number({error: "Jumlah Penduduk tidak valid"}).int().positive().min(1, {error: "Jumlah penduduk tidak boleh kurang dari 0"}),
		agricultural_area: z.coerce.number({error: "Luas pertanian Desa tidak valid"}).int().positive(),
		total_area: z.coerce.number({error: "Luas area Desa tidak valid"}).int().positive(),
	})

	static readonly CREATE = this.INDEX

	static readonly UPDATE = this.INDEX.partial()
}
