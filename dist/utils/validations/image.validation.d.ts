import z from "zod";
export declare const ImageValidation: {
    CREATE: z.ZodObject<{
        profile_id: z.ZodNullable<z.ZodString>;
        user_id: z.ZodNullable<z.ZodString>;
        social_assistance_id: z.ZodNullable<z.ZodString>;
        social_assistance_recipient_id: z.ZodNullable<z.ZodString>;
        event_id: z.ZodNullable<z.ZodString>;
        development_id: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>;
    UPLOAD_SOCIAL_ASSISTANCE: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    UPLOAD_SOCIAL_ASSISTANCE_RECIPIENT: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
};
declare const ExtendImageCreateSchema: z.ZodObject<{
    profile_id: z.ZodNullable<z.ZodString>;
    user_id: z.ZodNullable<z.ZodString>;
    social_assistance_id: z.ZodNullable<z.ZodString>;
    social_assistance_recipient_id: z.ZodNullable<z.ZodString>;
    event_id: z.ZodNullable<z.ZodString>;
    development_id: z.ZodNullable<z.ZodString>;
    path: z.ZodString;
    filename: z.ZodString;
    entity: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        USER: "USER";
        SOCIAL_ASSISTANCE: "SOCIAL_ASSISTANCE";
        SOCIAL_ASSISTANCE_RECIPIENT: "SOCIAL_ASSISTANCE_RECIPIENT";
        DEVELOPMENT: "DEVELOPMENT";
        EVENT: "EVENT";
        PROFILE: "PROFILE";
    }>>;
}, z.core.$strip>;
declare const ExtendImageUpdateSchema: z.ZodObject<{
    id: z.ZodString;
    path: z.ZodString;
    filename: z.ZodString;
}, z.core.$strip>;
export type TypeImageCreateSchema = z.infer<typeof ExtendImageCreateSchema>;
export type TypeImageUpdateSchema = z.infer<typeof ExtendImageUpdateSchema>;
export {};
//# sourceMappingURL=image.validation.d.ts.map