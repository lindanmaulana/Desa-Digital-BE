"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const admin_1 = __importDefault(require("./admin"));
const common_1 = __importDefault(require("./common"));
const management_1 = __importDefault(require("./management"));
const social_assistance_route_1 = __importDefault(require("./social-assistance.route"));
const staff_1 = __importDefault(require("./staff"));
const village_profile_route_1 = __importDefault(require("./village-profile.route"));
const head_of_family_1 = __importDefault(require("./head-of-family"));
const apiRoute = (0, express_1.Router)();
apiRoute.use("/auth", auth_routes_1.default);
apiRoute.use("/admin", admin_1.default);
apiRoute.use("/staff", staff_1.default);
apiRoute.use("/", common_1.default);
apiRoute.use("/management", management_1.default);
apiRoute.use("/head-of-families", head_of_family_1.default);
apiRoute.use("/social-assistances", social_assistance_route_1.default);
apiRoute.use("/village-profiles", village_profile_route_1.default);
exports.default = apiRoute;
//# sourceMappingURL=index.js.map