import { Router } from "express"
import { authenticatedUser, authenticatedVerificationUser } from "../../../middlewares/auth"
import { publicRateLimit } from "../../../middlewares/rateLimit"
import controllers from "../controllers"

const route = Router()

route.post("/signup", publicRateLimit, controllers.AuthController.signup)
route.post("/signin", publicRateLimit, controllers.AuthController.signin)
route.post("/verify-account", publicRateLimit, controllers.AuthController.activation)
route.post("/resend-otp", publicRateLimit, controllers.AuthController.resendOtp)

route.post("/forgot-password", publicRateLimit, controllers.AuthController.forgotPassword)
route.post("/verify-otp", publicRateLimit, controllers.AuthController.matchOtp)
route.post("/reset-password", publicRateLimit, authenticatedVerificationUser, controllers.AuthController.resetPassword)

route.patch("/me/password", publicRateLimit, authenticatedUser, controllers.AuthController.changePassword)

export default route
