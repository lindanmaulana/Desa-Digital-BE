import { CreateVillageProfileRequest, UpdateVillageProfileRequest, VillageProfileResponse } from "../models/village-profile";
export declare class VillageProfileService {
    static create(req: CreateVillageProfileRequest): Promise<VillageProfileResponse>;
    static get(): Promise<VillageProfileResponse>;
    static update(id: string, req: UpdateVillageProfileRequest): Promise<VillageProfileResponse>;
}
//# sourceMappingURL=village-profile.service.d.ts.map