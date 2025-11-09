import { Router } from "express"
import { authenticatedResetPassword, authenticatedUser } from "../../../middlewares/auth"
import { publicRateLimit } from "../../../middlewares/rateLimit"
import controllers from "../controllers"

const route = Router()

route.post("/signin", publicRateLimit, controllers.AuthController.signin)

route.post("/verify-account/verify", publicRateLimit, controllers.AuthController.verifyAccount)
route.post("/verify-account/resend-token", publicRateLimit, controllers.AuthController.resendTokenVerifyAccount)
route.post("/verify-account/resend-otp", publicRateLimit, controllers.AuthController.resendOtpVerifyAccount)

route.post("/forgot-password/request", publicRateLimit, controllers.AuthController.forgotPassword)
route.post("/forgot-password/resend-otp", publicRateLimit, controllers.AuthController.resendOtpForgotPassword)
route.post("/forgot-password/verify-otp", publicRateLimit, controllers.AuthController.verifyOtpForgotPassword)
route.post("/forgot-password/reset", authenticatedResetPassword, publicRateLimit, controllers.AuthController.resetPassword)

route.get("/profile", authenticatedUser, publicRateLimit, controllers.UserProfileController.getProfile)
route.get("/profile/password", authenticatedUser, publicRateLimit, controllers.UserProfileController.changePassword);

export default route
