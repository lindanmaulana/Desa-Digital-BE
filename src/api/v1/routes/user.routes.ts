import express from "express"
import { publicRateLimit } from "../../../middlewares/rateLimit"
import { UserController } from "../controllers/user.controller"
import apicache from "apicache"

const route = express()

route.post("/auth/signup", publicRateLimit, UserController.signup)
route.post("/auth/signin", publicRateLimit, UserController.signin)

route.get("/users", apicache.middleware("5 minutes"), publicRateLimit, UserController.findAll)

export default route
