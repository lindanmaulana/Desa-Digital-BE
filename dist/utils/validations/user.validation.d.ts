import z from "zod";
export declare class UserValidation {
    static readonly REGISTERSTAFF: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        profile_picture: z.ZodOptional<z.ZodString>;
        identity_number: z.ZodOptional<z.ZodString>;
        gender: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            [x: string]: string;
        }>>>;
        date_of_birth: z.ZodOptional<z.ZodString>;
        phone_number: z.ZodOptional<z.ZodString>;
        occupation: z.ZodOptional<z.ZodString>;
        marital_status: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            [x: string]: string;
        }>>>;
    }, z.core.$strip>;
    static readonly GETALL: z.ZodObject<{
        keyword: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            [x: string]: string;
        }>>>;
        is_active: z.ZodOptional<z.ZodString>;
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    static readonly CHANGEPASSWORD: z.ZodObject<{
        password: z.ZodString;
        confirm_password: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=user.validation.d.ts.map