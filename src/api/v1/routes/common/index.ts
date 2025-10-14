import { Router } from "express";
import userRouteCommon from "./user.route";

const commonRoute = Router()

	commonRoute.use("/users", userRouteCommon)

export default commonRoute
