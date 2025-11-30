import { Router } from "express";
import socialAssistanceRecipientHeadOfFamilyRoute from "./social-assistance-recipient.route";

const headOfFamilyRoute = Router()

	headOfFamilyRoute.use("/social-assistance-recipients", socialAssistanceRecipientHeadOfFamilyRoute)

export default headOfFamilyRoute
