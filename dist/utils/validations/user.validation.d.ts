import z from "zod";
export declare class UserValidation {
    static readonly GETALL: z.ZodObject<{
        keyword: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodString>;
        is_active: z.ZodOptional<z.ZodBoolean>;
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    static readonly CHANGEPASSWORD: z.ZodObject<{
        password: z.ZodString;
        confirm_password: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=user.validation.d.ts.map