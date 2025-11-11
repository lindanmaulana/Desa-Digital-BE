import z from "zod";
export declare class StaffValidation {
    static readonly INDEX: z.ZodObject<{
        user_id: z.ZodString;
        identity_number: z.ZodOptional<z.ZodString>;
        gender: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            MALE: "MALE";
            FEMALE: "FEMALE";
        }>>;
        date_of_birth: z.ZodOptional<z.ZodString>;
        phone_number: z.ZodOptional<z.ZodString>;
        occupation: z.ZodOptional<z.ZodString>;
        marital_status: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            SINGLE: "SINGLE";
            MARRIED: "MARRIED";
        }>>;
    }, z.core.$strip>;
    static readonly CREATE: z.ZodObject<{
        user_id: z.ZodString;
        identity_number: z.ZodOptional<z.ZodString>;
        gender: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            MALE: "MALE";
            FEMALE: "FEMALE";
        }>>;
        date_of_birth: z.ZodOptional<z.ZodString>;
        phone_number: z.ZodOptional<z.ZodString>;
        occupation: z.ZodOptional<z.ZodString>;
        marital_status: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            SINGLE: "SINGLE";
            MARRIED: "MARRIED";
        }>>;
    }, z.core.$strip>;
    static readonly UPDATE: z.ZodObject<{
        identity_number: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        gender: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            MALE: "MALE";
            FEMALE: "FEMALE";
        }>>>;
        date_of_birth: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        phone_number: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        occupation: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        marital_status: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            SINGLE: "SINGLE";
            MARRIED: "MARRIED";
        }>>>;
    }, z.core.$strip>;
}
//# sourceMappingURL=staff.validation.d.ts.map