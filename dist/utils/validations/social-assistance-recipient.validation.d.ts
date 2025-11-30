import z from "zod";
export declare const SocialAssistanceRecipientValidation: {
    CREATE: z.ZodObject<{
        social_assistance_id: z.ZodString;
        amount: z.ZodCoercedNumber<unknown>;
        reason: z.ZodString;
        bank: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            BRI: "BRI";
            BNI: "BNI";
            BCA: "BCA";
            MANDIRI: "MANDIRI";
        }>>;
        account_number: z.ZodString;
        account_name: z.ZodString;
    }, z.core.$strip>;
    UPDATE: z.ZodObject<{
        status: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            PENDING: "PENDING";
            APPROVED: "APPROVED";
            REJECTED: "REJECTED";
        }>>;
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
export type TypeSocialAssistanceRecipientCreateSchema = z.infer<typeof SocialAssistanceRecipientValidation.CREATE>;
export type TypeSocialAssistanceRecipientUpdateSchema = z.infer<typeof SocialAssistanceRecipientValidation.UPDATE>;
//# sourceMappingURL=social-assistance-recipient.validation.d.ts.map