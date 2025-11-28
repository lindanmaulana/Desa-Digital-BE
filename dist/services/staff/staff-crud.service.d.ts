import { GetAllStaffRequest, GetOneStaffRequest, StaffGetAllResponse, StaffGetOneResponse } from "../../models/staff.model";
import { TokenUser } from "../../types/token.type";
export declare const StaffCrudService: {
    getAll: (req: GetAllStaffRequest, context: TokenUser) => Promise<StaffGetAllResponse>;
    getOne: (req: GetOneStaffRequest, context: TokenUser) => Promise<StaffGetOneResponse>;
};
//# sourceMappingURL=staff-crud.service.d.ts.map