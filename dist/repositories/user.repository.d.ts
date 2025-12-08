import { Prisma, UserOtpPurpose } from "@prisma/client";
import { UserWithRelations } from "../models/user.model";
export declare const USER_OMIT: Prisma.UserOmit;
export declare class UserRepository {
    static findCount(args: Prisma.UserCountArgs): Promise<$Public.PrismaPromise<T>>;
    static findAll(args: Prisma.UserFindManyArgs): Promise<UserWithRelations[]>;
    static findById(id: string): Promise<any>;
    static findByEmail(email: string): Promise<any>;
    static findUserForActivation(id: string): Promise<any>;
    static create(args: Prisma.UserCreateArgs): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    static updatePassword(id: string, password: string): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static updateProfile(args: Prisma.UserUpdateArgs): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static updateIsFirstLogin(id: string): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static updateIsActive(id: string): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static updateOtp(id: string, otp: string, otp_purpose: UserOtpPurpose): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static updateVerifyToken(id: string, jti: string): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static updateResetToken(id: string, jti: string): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static deleteAll(): Promise<$Public.PrismaPromise<T>>;
    static deleteById(id: string): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>>;
    static deleteOtp(id: string): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static deleteResetToken(id: string): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static isEmailTaken(email: string): Promise<boolean>;
}
//# sourceMappingURL=user.repository.d.ts.map