import z from "zod";
export declare const SocialAssistanceRecipientValidation: {
    CREATE: z.ZodObject<{
        social_assistance_id: z.ZodString;
        head_of_family_id: z.ZodString;
        amount: z.ZodCoercedNumber<unknown>;
        reason: z.ZodString;
        bank: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            BRI: "BRI";
            BNI: "BNI";
            BCA: "BCA";
            MANDIRI: "MANDIRI";
        }>>;
        account_number: z.ZodString;
        proof: z.ZodString;
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
//# sourceMappingURL=social-assistance-recipient.validation.d.ts.map