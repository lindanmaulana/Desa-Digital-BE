import {Router} from "express"
import { publicRateLimit } from "../../../middlewares/rateLimit"
import { UserController } from "../controllers/user.controller"
import apicache from "apicache"

const route = Router()

route.post("/auth/signup", publicRateLimit, UserController.signup)
route.post("/auth/signin", publicRateLimit, UserController.signin)

route.get("/users", apicache.middleware("5 minutes"), publicRateLimit, UserController.getUsers)
route.get("/users/:id", apicache.middleware("5 minutes"), publicRateLimit, UserController.getUserById)

route.delete("/users/:id", UserController.deleteUser)

export default route
