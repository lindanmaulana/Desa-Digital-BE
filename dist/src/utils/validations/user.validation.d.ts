import z from "zod";
export declare class UserValidation {
    static readonly SIGNUP: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
    static readonly SIGNIN: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
    static readonly CHANGEPASSWORD: z.ZodObject<{
        password: z.ZodString;
        confirmPassword: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=user.validation.d.ts.map