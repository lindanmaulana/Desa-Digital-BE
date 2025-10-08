import z from "zod";
export declare class UserValidation {
    static readonly SIGNUP: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        role: z.ZodDefault<z.ZodEnum<{
            ADMIN: "ADMIN";
            STAFF: "STAFF";
            HEAD_OF_FAMILY: "HEAD_OF_FAMILY";
            RESIDENT: "RESIDENT";
        }>>;
        is_first_login: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
    static readonly SIGNIN: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=user.validation.d.ts.map