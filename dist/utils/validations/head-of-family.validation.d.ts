import z from "zod";
export declare const HeadOfFamilyValidation: {
    CREATE: z.ZodObject<{
        user_id: z.ZodString;
        identity_number: z.ZodOptional<z.ZodString>;
        gender: z.ZodOptional<z.ZodString>;
        date_of_birth: z.ZodOptional<z.ZodString>;
        phone_number: z.ZodOptional<z.ZodString>;
        occupation: z.ZodOptional<z.ZodString>;
        marital_status: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    GETALL: z.ZodObject<{
        keyword: z.ZodOptional<z.ZodString>;
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
        sort: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            asc: "asc";
            desc: "desc";
        }>>>;
    }, z.core.$strip>;
    GETONE: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=head-of-family.validation.d.ts.map