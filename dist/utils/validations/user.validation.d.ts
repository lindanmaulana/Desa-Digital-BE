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
        confirm_password: z.ZodString;
    }, z.core.$strip>;
    static readonly ACTIVATION: z.ZodObject<{
        email: z.ZodEmail;
        otp_code: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=user.validation.d.ts.map