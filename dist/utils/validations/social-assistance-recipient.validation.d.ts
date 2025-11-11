import z from "zod";
export declare const SocialAssistanceRecipientValidation: {
    CREATE: z.ZodObject<{
        social_assistance_id: z.ZodString;
        head_of_family_id: z.ZodString;
        amount: z.ZodCoercedNumber<unknown>;
        reason: z.ZodString;
        bank: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            BCA: "BCA";
            BNI: "BNI";
            BRI: "BRI";
            MANDIRI: "MANDIRI";
        }>>;
        account_number: z.ZodString;
        proof: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=social-assistance-recipient.validation.d.ts.map