import { Router } from "express"
import { authenticatedUser } from "../../../middlewares/auth"
import { publicRateLimit } from "../../../middlewares/rateLimit"
import controllers from "../controllers"

const route = Router()

route.post("/signup", publicRateLimit, controllers.AuthController.signup)
route.post("/signin", publicRateLimit, controllers.AuthController.signin)
route.post("/verify-account", publicRateLimit, controllers.AuthController.activation)

route.patch("/me/password", publicRateLimit, authenticatedUser, controllers.AuthController.changePassword)

export default route
