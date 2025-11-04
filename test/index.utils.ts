import supertest from "supertest";
import { app } from "../src/web";

const agent = supertest.agent(app)


export const authenticatedRequest = agent
