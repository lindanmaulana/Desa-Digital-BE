import { User } from "@prisma/client";
export declare class EmailService {
    static SendOtpMails(email: string, title: string, message: string, data: User): Promise<void>;
    static ResendOtpVerifyAccountMail(email: string, data: User): Promise<void>;
    static SendVerifyAccountMail(email: string, token: string, data: User): Promise<void>;
    static ResendVerifyAccountMail(email: string, token: string, data: User): Promise<void>;
    static SendOtpResetPasswordMail(email: string, data: User): Promise<void>;
    static ReSendOtpResetPasswordMail(email: string, data: User): Promise<void>;
    static SendTokenForgotPasswordMail(): Promise<void>;
}
//# sourceMappingURL=email.service.d.ts.map