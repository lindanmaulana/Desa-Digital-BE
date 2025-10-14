import { Router } from "express";
import userRouteAdmin from "./user.route";

const adminRoute = Router()

	adminRoute.use("/users", userRouteAdmin)

export default adminRoute
