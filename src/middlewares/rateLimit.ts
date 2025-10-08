import rateLimit from "express-rate-limit";

export const publicRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 100,
    message: "Too manny request, please try again later.",
    standardHeaders: true,
    legacyHeaders: false
})


export const adminRateLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 20,
    message: "Too many admin actions, please slow down.",
    standardHeaders: true,
    legacyHeaders: false
})