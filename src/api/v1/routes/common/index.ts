import { Router } from "express";
import userRouteCommon from "./user.route";
import socialAssistanceRouteCommon from "./social-assistance.route";

const commonRoute = Router()

	commonRoute.use("/users", userRouteCommon)
	commonRoute.use("/social-assistance", socialAssistanceRouteCommon)

export default commonRoute
