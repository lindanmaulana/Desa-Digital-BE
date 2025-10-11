import z from "zod";
export declare class AuthValidation {
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
    static readonly RESENDOTP: z.ZodObject<{
        email: z.ZodEmail;
    }, z.core.$strip>;
    static readonly FORGOTPASSWORD: z.ZodObject<{
        email: z.ZodEmail;
    }, z.core.$strip>;
    static readonly MATCHOTP: z.ZodObject<{
        email: z.ZodEmail;
        otp_code: z.ZodString;
    }, z.core.$strip>;
    static readonly RESETPASSWORD: z.ZodObject<{
        password: z.ZodString;
        confirm_password: z.ZodString;
    }, z.core.$strip>;
}
//# sourceMappingURL=auth.validation.d.ts.map