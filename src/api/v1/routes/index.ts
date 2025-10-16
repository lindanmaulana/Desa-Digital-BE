import { Router } from "express"
import authRoute from "../routes/auth.routes"
import adminRoute from "./admin"
import commonRoute from "./common"
import headOfFamilyRoute from "./head-of-family"
import staffRoute from "./staff"

const apiRoute = Router()

	apiRoute.use("/auth", authRoute)
	apiRoute.use("/admin", adminRoute)
	apiRoute.use("/staff", staffRoute)
	apiRoute.use("/head-of-family", headOfFamilyRoute)
	apiRoute.use("/", commonRoute)

export default apiRoute
