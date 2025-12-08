import { Router } from "express";
import socialAssistanceRouteStaff from "./social-assistance.route";
import villageProfileRouteStaff from "./village-profile.route";
import userRouteStaff from "./user.route";
import socialAssistanceRecipientRouteStaff from "./social-assistance-recipient.route";

const staffRoute = Router()

	staffRoute.use("/users", userRouteStaff)
	staffRoute.use("/village-profiles", villageProfileRouteStaff)
	staffRoute.use("/social-assistances", socialAssistanceRouteStaff)
	staffRoute.use("/social-assistance-recipients", socialAssistanceRecipientRouteStaff)

export default staffRoute
