import { Request, Response } from "express"

const notfound = (req: Request, res: Response) => {
    res.status(400).send({errors: "Route does not exist"})
}

export default notfound