import z from "zod";
export declare class UserProfileValidation {
    static readonly CHANGEPASSWORD: z.ZodObject<{
        password: z.ZodString;
        confirm_password: z.ZodString;
    }, z.core.$strip>;
    static readonly UPDATE: z.ZodObject<{
        head_of_family_id: z.ZodOptional<z.ZodString>;
        identity_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        gender: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            MALE: "MALE";
            FEMALE: "FEMALE";
        }>>;
        date_of_birth: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
        phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        occupation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        marital_status: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            SINGLE: "SINGLE";
            MARRIED: "MARRIED";
        }>>;
        relation: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            HUSBAND: "HUSBAND";
            WIFE: "WIFE";
            CHILD: "CHILD";
        }>>;
    }, z.core.$strip>;
}
//# sourceMappingURL=user-profile.validation.d.ts.map