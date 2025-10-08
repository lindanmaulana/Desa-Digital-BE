import { logger } from "./logging";
import { app } from "./web";

const PORT = 4000 as const

app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`)
})