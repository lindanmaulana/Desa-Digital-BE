import { UserResponse } from "../models/user.model";
import { Token } from "../types/token.type";
export declare class UserService {
    static getAll(user: Token): Promise<UserResponse[]>;
    static getById(id: string): Promise<UserResponse>;
    static delete(id: string): Promise<UserResponse>;
}
//# sourceMappingURL=user.service.d.ts.map