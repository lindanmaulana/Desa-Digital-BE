import z from "zod";
export declare class VillageProfileValidation {
    static readonly INDEX: z.ZodObject<{
        thumbnail: z.ZodString;
        name: z.ZodString;
        about: z.ZodString;
        headman: z.ZodString;
        people: z.ZodCoercedNumber<unknown>;
        agricultural_area: z.ZodCoercedNumber<unknown>;
        total_area: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
    static readonly CREATE: z.ZodObject<{
        thumbnail: z.ZodString;
        name: z.ZodString;
        about: z.ZodString;
        headman: z.ZodString;
        people: z.ZodCoercedNumber<unknown>;
        agricultural_area: z.ZodCoercedNumber<unknown>;
        total_area: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
    static readonly UPDATE: z.ZodObject<{
        thumbnail: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        about: z.ZodOptional<z.ZodString>;
        headman: z.ZodOptional<z.ZodString>;
        people: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        agricultural_area: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        total_area: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}
//# sourceMappingURL=village-profile.validation.d.ts.map