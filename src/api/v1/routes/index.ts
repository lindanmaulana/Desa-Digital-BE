import { Router } from "express"
import authRoute from "../routes/auth.routes"
import adminRoute from "./admin"
import commonRoute from "./common"
import headOfFamilyRoute from "./admin/head-of-family.route"
import socialAssistanceRoutePublic from "./social-assistance.route"
import villageProfileRoutePublic from "./village-profile.route"
import userRoutePublic from "./user.route"
import staffRoute from "./staff"

const apiRoute = Router()

	apiRoute.use("/auth", authRoute)

	apiRoute.use("/admin", adminRoute)
	apiRoute.use("/staff", staffRoute)
	apiRoute.use("/", commonRoute)

	apiRoute.use("/head-of-families", headOfFamilyRoute)
	apiRoute.use("/social-assistances", socialAssistanceRoutePublic)
	apiRoute.use("/village-profiles", villageProfileRoutePublic)

export default apiRoute
