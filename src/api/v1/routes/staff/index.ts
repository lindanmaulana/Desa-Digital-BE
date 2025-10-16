import { Router } from "express";
import socialAssistanceRouteStaff from "./social-assistance.route";

const staffRoute = Router()

	staffRoute.use("/social-assistance", socialAssistanceRouteStaff)

export default staffRoute
