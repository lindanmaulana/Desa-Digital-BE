import z from "zod";
export declare class UserProfileValidation {
    static readonly CHANGEPASSWORD: z.ZodObject<{
        password: z.ZodString;
        confirm_password: z.ZodString;
    }, z.core.$strip>;
    static readonly UPDATE: z.ZodObject<{
        profile_picture: z.ZodOptional<z.ZodString>;
        identity_number: z.ZodOptional<z.ZodString>;
        gender: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            MALE: "MALE";
            FEMALE: "FEMALE";
        }>>>;
        date_of_birth: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        phone_number: z.ZodOptional<z.ZodString>;
        occupation: z.ZodOptional<z.ZodString>;
        marital_status: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            SINGLE: "SINGLE";
            MARRIED: "MARRIED";
        }>>>;
    }, z.core.$strip>;
}
//# sourceMappingURL=user-profile.validation.d.ts.map