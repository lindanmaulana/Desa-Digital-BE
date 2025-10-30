import { StaffResponse, UpdateStaffRequest } from "../models/staff.model";
import { TokenUser } from "../types/token.type";
export declare class StaffService {
    static update(user: TokenUser, req: UpdateStaffRequest): Promise<StaffResponse>;
}
//# sourceMappingURL=staff.service.d.ts.map