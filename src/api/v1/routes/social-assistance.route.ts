import { Router } from "express";
import { authenticatedUser } from "../../../middlewares/auth";
import { publicRateLimit } from "../../../middlewares/rateLimit";
import { SocialAssistanceController } from "../controllers";


const socialAssistanceRoutePublic = Router()


export default socialAssistanceRoutePublic
