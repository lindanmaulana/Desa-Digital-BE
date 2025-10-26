import z from "zod";
export declare class HeadOfFamilyValidation {
    static readonly CREATE: z.ZodObject<{
        user_id: z.ZodString;
        identity_number: z.ZodOptional<z.ZodString>;
        gender: z.ZodOptional<z.ZodString>;
        date_of_birth: z.ZodOptional<z.ZodString>;
        phone_number: z.ZodOptional<z.ZodString>;
        occupation: z.ZodOptional<z.ZodString>;
        marital_status: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}
//# sourceMappingURL=head-of-family.validation.d.ts.map