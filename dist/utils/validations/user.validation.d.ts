import z from "zod";
export declare class UserValidation {
    static readonly PROFILE: {
        identity_number: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        gender: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            MALE: "MALE";
            FEMALE: "FEMALE";
        }>>>;
        date_of_birth: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
        phone_number: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        occupation: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        marital_status: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            SINGLE: "SINGLE";
            MARRIED: "MARRIED";
        }>>>;
    };
    static readonly REGISTERSTAFF: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        identity_number: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        gender: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            MALE: "MALE";
            FEMALE: "FEMALE";
        }>>>;
        date_of_birth: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
        phone_number: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        occupation: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        marital_status: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            SINGLE: "SINGLE";
            MARRIED: "MARRIED";
        }>>>;
    }, z.core.$strip>;
    static readonly REGISTERHEADOFFAMILY: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        identity_number: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        gender: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            MALE: "MALE";
            FEMALE: "FEMALE";
        }>>>;
        date_of_birth: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
        phone_number: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        occupation: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        marital_status: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            SINGLE: "SINGLE";
            MARRIED: "MARRIED";
        }>>>;
    }, z.core.$strip>;
    static readonly GETALL: z.ZodObject<{
        keyword: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            ADMIN: "ADMIN";
            STAFF: "STAFF";
            HEAD_OF_FAMILY: "HEAD_OF_FAMILY";
            RESIDENT: "RESIDENT";
        }>>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}
//# sourceMappingURL=user.validation.d.ts.map