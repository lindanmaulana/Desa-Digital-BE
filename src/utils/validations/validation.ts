import { Gender, Marital, UserRole } from "@prisma/client";
import { ZodType } from "zod";

export const VALID_GENDER = Object.values(Gender) as [string, ...string[]]
export const VALID_MARITAL = Object.values(Marital) as [string, ...string[]]
export const VALID_ROLE = Object.values(UserRole) as [string, ...string[]]


export class validation {
    static validate<T>(schema: ZodType<T, any>, data: T): T {
        return schema.parse(data)
    }
}
