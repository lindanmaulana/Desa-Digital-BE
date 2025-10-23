"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toVillageProfileResponse = (villageProfile) => {
    return {
        id: villageProfile.id,
        thumbnail: villageProfile.thumbnail,
        name: villageProfile.name,
        about: villageProfile.about,
        headman: villageProfile.headman,
        people: villageProfile.people,
        agricultural_area: villageProfile.agricultural_area,
        total_area: villageProfile.total_area,
        created_at: villageProfile.created_at,
        updated_at: villageProfile.updated_at
    };
};
exports.default = { toVillageProfileResponse };
//# sourceMappingURL=village-profile.response.js.map