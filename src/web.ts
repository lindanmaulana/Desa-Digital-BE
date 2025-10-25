import cors from "cors"
import express from "express"
import apiRoute from "./api/v1/routes"
import { errorMiddleware } from "./middlewares/handler-error"
import notfound from "./middlewares/notfound"
import path from "path"

export const app = express()

app.use(express.json())
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true
}))

const V1 = "/api/v1"

const publicPath = path.join(__dirname, "../public")

app.use(express.static(publicPath))
app.use(V1, apiRoute)

app.use(errorMiddleware)
app.use(notfound)
