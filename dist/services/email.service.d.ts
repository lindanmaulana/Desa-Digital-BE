import { User } from "@prisma/client";
export declare class EmailService {
    static SendOtpMails(email: string, title: string, message: string, data: User): Promise<void>;
    static ResendOtpVerifyAccountMail(email: string, data: User): Promise<void>;
    static SendTokenVerifyAccountMail(email: string, token: string, data: User): Promise<void>;
    static ResendTokenVerifyAccountMail(email: string, token: string, data: User): Promise<void>;
    static SendOtpForgotPasswordMail(email: string, data: User): Promise<void>;
    static ReSendOtpForgotPasswordMail(email: string, data: User): Promise<void>;
    static SendTokenForgotPasswordMail(email: string, token: string, data: User): Promise<void>;
}
//# sourceMappingURL=email.service.d.ts.map