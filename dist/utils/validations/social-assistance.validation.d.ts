import z from "zod";
export declare class SocialAssistanceValidation {
    static readonly CREATE: z.ZodObject<{
        thumbnail: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        category: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            [x: string]: string;
        }>>;
        amount: z.ZodString;
        provider: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        is_active: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=social-assistance.validation.d.ts.map