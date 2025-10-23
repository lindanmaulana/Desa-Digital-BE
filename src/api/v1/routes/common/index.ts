import { Router } from "express";
import socialAssistanceRouteCommon from "./social-assistance.route";
import userRouteCommon from "./user.route";
import VillageProfileRouteCommon from "./village-profile.route";

const commonRoute = Router()

	commonRoute.use("/users", userRouteCommon)
	commonRoute.use("/social-assistance", socialAssistanceRouteCommon)
	commonRoute.use("/village/profile", VillageProfileRouteCommon)

export default commonRoute
