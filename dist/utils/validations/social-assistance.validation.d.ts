import z from "zod";
export declare class SocialAssistanceValidation {
    static readonly IS_ACTIVE: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
    static readonly INDEX: z.ZodObject<{
        thumbnail: z.ZodNullable<z.ZodString>;
        name: z.ZodString;
        category: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            STAPLE: "STAPLE";
            CASH: "CASH";
            SUBSIDIZED_FUEL: "SUBSIDIZED_FUEL";
            HEALTH: "HEALTH";
        }>>;
        amount: z.ZodCoercedNumber<unknown>;
        provider: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
    }, z.core.$strip>;
    static readonly GETALL: z.ZodObject<{
        keyword: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            STAPLE: "STAPLE";
            CASH: "CASH";
            SUBSIDIZED_FUEL: "SUBSIDIZED_FUEL";
            HEALTH: "HEALTH";
        }>>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    static readonly CREATE: z.ZodObject<{
        name: z.ZodString;
        category: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            STAPLE: "STAPLE";
            CASH: "CASH";
            SUBSIDIZED_FUEL: "SUBSIDIZED_FUEL";
            HEALTH: "HEALTH";
        }>>;
        amount: z.ZodCoercedNumber<unknown>;
        provider: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        thumbnail: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        description: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    static readonly UPDATE: z.ZodObject<{
        thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        name: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            STAPLE: "STAPLE";
            CASH: "CASH";
            SUBSIDIZED_FUEL: "SUBSIDIZED_FUEL";
            HEALTH: "HEALTH";
        }>>>;
        amount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        provider: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
    }, z.core.$strip>;
}
//# sourceMappingURL=social-assistance.validation.d.ts.map