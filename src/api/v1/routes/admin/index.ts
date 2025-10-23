import { Router } from "express";
import userRouteAdmin from "./user.route";
import villageProfileRouteAdmin from "./village-profile.route";

const adminRoute = Router()

	adminRoute.use("/users", userRouteAdmin)
	adminRoute.use("/village/profile", villageProfileRouteAdmin)

export default adminRoute
