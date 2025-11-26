import { GetAllStaffRequest, GetAllStaffResponse, GetOneStaffRequest, GetOneStaffResponse } from "../../models/staff.model";
import { TokenUser } from "../../types/token.type";
export declare const StaffCrudService: {
    getAll: (req: GetAllStaffRequest, context: TokenUser) => Promise<GetAllStaffResponse>;
    getOne: (req: GetOneStaffRequest, context: TokenUser) => Promise<GetOneStaffResponse>;
};
//# sourceMappingURL=staff-crud.service.d.ts.map