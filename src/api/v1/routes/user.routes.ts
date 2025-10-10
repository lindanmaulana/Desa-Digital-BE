import apicache from "apicache"
import { Router } from "express"
import { publicRateLimit } from "../../../middlewares/rateLimit"
import controllers from "../controllers"
import { authenticatedUser, authorizedRoles } from "../../../middlewares/auth"
import { UserRole } from "@prisma/client"

const route = Router()

route.get("/", authenticatedUser, publicRateLimit, controllers.UserController.getUsers)
route.get("/:id", authenticatedUser, publicRateLimit, controllers.UserController.getUserById)

route.delete("/:id", authenticatedUser, authorizedRoles(UserRole.ADMIN), controllers.UserController.deleteUser)

export default route
