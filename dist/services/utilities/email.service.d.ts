import { User } from "@prisma/client";
export declare const EmailService: {
    SendOtpMails: (email: string, title: string, message: string, data: User) => Promise<void>;
    ResendOtpVerifyAccountMail: (email: string, data: User) => Promise<void>;
    SendTokenVerifyAccountMail: (email: string, token: string, data: User) => Promise<void>;
    ResendTokenVerifyAccountMail: (email: string, token: string, data: User) => Promise<void>;
    SendOtpForgotPasswordMail: (email: string, data: User) => Promise<void>;
    ReSendOtpForgotPasswordMail: (email: string, data: User) => Promise<void>;
    SendTokenForgotPasswordMail: (email: string, token: string, data: User) => Promise<void>;
};
//# sourceMappingURL=email.service.d.ts.map