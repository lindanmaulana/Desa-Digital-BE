import { Router } from "express";
import { authenticatedUser } from "../../../middlewares/auth";
import { publicRateLimit } from "../../../middlewares/rateLimit";
import { VillageProfileController } from "../controllers";

const villageProfileRoutePublic = Router()

export default villageProfileRoutePublic
