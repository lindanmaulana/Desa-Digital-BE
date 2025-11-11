import { Router } from "express"
import authRoute from "../routes/auth.routes"
import adminRoute from "./admin"
import commonRoute from "./common"
import headOfFamilyRoute from "./admin/head-of-family.route"

const apiRoute = Router()

	apiRoute.use("/auth", authRoute)
	apiRoute.use("/admin", adminRoute)
	apiRoute.use("/head-of-family", headOfFamilyRoute)
	apiRoute.use("/", commonRoute)

export default apiRoute
