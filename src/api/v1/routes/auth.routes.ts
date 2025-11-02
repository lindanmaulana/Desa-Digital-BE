import { Router } from "express"
import { authenticatedResetPassword, authenticatedUser, authenticatedVerifyAccount } from "../../../middlewares/auth"
import { publicRateLimit } from "../../../middlewares/rateLimit"
import controllers from "../controllers"

const route = Router()

route.post("/signup", publicRateLimit, controllers.AuthController.signup)
route.post("/signin", publicRateLimit, controllers.AuthController.signin)

route.post("/verify-account", publicRateLimit, controllers.AuthController.verifyAccount)
route.post("/resend/verify-account/token", publicRateLimit, controllers.AuthController.resendTokenVerifyAccount)
route.post("/resend/verify-account/otp", publicRateLimit, controllers.AuthController.resendOtpVerifyAccount)

route.post("/forgot-password", publicRateLimit, controllers.AuthController.forgotPassword)
route.post("/resend/forgot-password/otp", publicRateLimit, controllers.AuthController.resendOtpForgotPassword)
route.post("/verify-otp", publicRateLimit, controllers.AuthController.matchOtp)
route.post("/reset-password", authenticatedResetPassword, publicRateLimit, controllers.AuthController.resetPassword)

route.get("/profile", authenticatedUser, publicRateLimit, controllers.UserProfileController.getProfile)
route.get("/profile/password", authenticatedUser, publicRateLimit, controllers.UserProfileController.changePassword);


export default route
