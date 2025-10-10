import express from "express"
import cors from "cors"
import { errorMiddleware } from "./middlewares/handler-error"
import notfound from "./middlewares/notfound"
import mainRoute from "./api/v1/routes"

export const app = express()

app.use(express.json())
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true
}))

const V1 = "/api/v1"

app.use(V1, mainRoute)

app.use(errorMiddleware)
app.use(notfound)
