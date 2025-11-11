import { Router } from "express";
import headOfFamilyRouteAdmin from "./head-of-family.route";
import userRouteAdmin from "./user.route";
import villageProfileRouteAdmin from "./village-profile.route";

const adminRoute = Router()

	adminRoute.use("/users", userRouteAdmin)
	adminRoute.use("/village/profile", villageProfileRouteAdmin)
	adminRoute.use("/head-of-family", headOfFamilyRouteAdmin)

export default adminRoute
