import { Router } from "express";
import headOfFamilyRouteCommon from "../management/head-of-family.route";
import userRouteCommon from "./user.route";
import villageProfileRouteCommon from "./village-profile.route";

const commonRoute = Router()

	commonRoute.use("/users", userRouteCommon)
	commonRoute.use("/village/profiles", villageProfileRouteCommon)
	commonRoute.use("/head-of-families", headOfFamilyRouteCommon)

export default commonRoute
