import { Router } from "express";
import headOfFamilyRouteCommon from "./head-of-family.route";
import userRouteCommon from "./user.route";
import villageProfileRouteCommon from "./village-profile.route";
import socialAssistanceRouteCommon from "./social-assistance.route";

const commonRoute = Router()

	commonRoute.use("/users", userRouteCommon)
	commonRoute.use("/village/profiles", villageProfileRouteCommon)
	commonRoute.use("/head-of-families", headOfFamilyRouteCommon)
	commonRoute.use("/social-assistances", socialAssistanceRouteCommon)

export default commonRoute
