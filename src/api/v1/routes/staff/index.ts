import { Router } from "express";
import socialAssistanceRouteStaff from "./social-assistance.route";
import villageProfileRouteStaff from "./village-profile.route";
import userRouteStaff from "./user.route";

const staffRoute = Router()

	staffRoute.use("/users", userRouteStaff)
	staffRoute.use("/village-profiles", villageProfileRouteStaff)
	staffRoute.use("/social-assistances", socialAssistanceRouteStaff)

export default staffRoute
