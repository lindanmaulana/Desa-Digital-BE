import { Router } from "express"
import userRoute from "../routes/user.routes"
import authRoute from "../routes/auth.routes"

const mainRoute = Router()

mainRoute.use("/users", userRoute)
mainRoute.use("/auth", authRoute)

export default mainRoute
