import { Router } from "express"
import { authenticatedResetPassword, authenticatedUser } from "../../../middlewares/auth"
import { publicRateLimit } from "../../../middlewares/rateLimit"
import { AuthController, UserController } from "../controllers"

const route = Router()

route.post("/signin", publicRateLimit, AuthController.signin)

route.post("/verify-account/verify", publicRateLimit, AuthController.verifyAccount)
route.post("/verify-account/resend-token", publicRateLimit, AuthController.resendTokenVerifyAccount)
route.post("/verify-account/resend-otp", publicRateLimit, AuthController.resendOtpVerifyAccount)

route.post("/forgot-password/request", publicRateLimit, AuthController.forgotPassword)
route.post("/forgot-password/resend-otp", publicRateLimit, AuthController.resendOtpForgotPassword)
route.post("/forgot-password/verify-otp", publicRateLimit, AuthController.verifyOtpForgotPassword)
route.post("/forgot-password/reset", authenticatedResetPassword, publicRateLimit, AuthController.resetPassword)

route.get("/profile/detail", authenticatedUser, publicRateLimit, UserController.getProfile)
route.get("/profile/password", authenticatedUser, publicRateLimit, UserController.changePassword);

export default route
