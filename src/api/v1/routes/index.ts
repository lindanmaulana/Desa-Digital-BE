import { Router } from "express"
import authRoute from "../routes/auth.routes"
import adminRoute from "./admin"
import headOfFamilyRoute from "./admin/head-of-family.route"
import commonRoute from "./common"
import managementRoute from "./management"
import socialAssistanceRoutePublic from "./social-assistance.route"
import staffRoute from "./staff"
import villageProfileRoutePublic from "./village-profile.route"

const apiRoute = Router()

	apiRoute.use("/auth", authRoute)

	apiRoute.use("/admin", adminRoute)
	apiRoute.use("/staff", staffRoute)
	apiRoute.use("/", commonRoute)
	apiRoute.use("/management", managementRoute)

	apiRoute.use("/head-of-families", headOfFamilyRoute)
	apiRoute.use("/social-assistances", socialAssistanceRoutePublic)
	apiRoute.use("/village-profiles", villageProfileRoutePublic)

export default apiRoute
