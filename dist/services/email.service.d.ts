import { User } from "@prisma/client";
export declare class EmailService {
    static SendOtpMail(email: string, data: User): Promise<void>;
    static SendVerifyAccountMail(email: string, data: User): Promise<void>;
}
//# sourceMappingURL=email.service.d.ts.map