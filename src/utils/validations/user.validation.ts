import { UserRole } from "@prisma/client";
import z from "zod";

export class UserValidation {
	static readonly GETALL = z.object({
		keyword: z.string().optional(),
		role: z.string().toUpperCase().optional(),
		is_active: z.string().optional(),
		page: z.string().optional(),
		limit: z.string().optional()
	})

	static readonly CHANGEPASSWORD = z.object({
		password: z.string({ error: "Password tidak boleh kosong" }).min(8, "Password minimal 8 karakter"),
		confirm_password: z.string({ error: "Konfirm password tidak boleh kosong" }).min(8, "Confirm Password minimal 8 karakter"),
	});
}
