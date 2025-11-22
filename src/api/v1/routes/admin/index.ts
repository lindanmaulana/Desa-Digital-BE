import { Router } from "express";
import headOfFamilyRouteAdmin from "./head-of-family.route";
import userRouteAdmin from "./user.route";
import villageProfileRouteAdmin from "./village-profile.route";
import staffRouteAdmin from "./staff.route";

const adminRoute = Router()

	adminRoute.use("/users", userRouteAdmin)
	adminRoute.use("/staffs", staffRouteAdmin)
	adminRoute.use("/head-of-families", headOfFamilyRouteAdmin)
	adminRoute.use("/village/profiles", villageProfileRouteAdmin)

export default adminRoute
