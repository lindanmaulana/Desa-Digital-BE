import dotenv from "dotenv"
dotenv.config()

const JWTSECRETKEY = process.env.JWT_SECRET
const JWTSECRETKEYREFRESH = process.env.JWT_SECRET_REFRESH
const JWTEXPIRATION = process.env.JWT_EXPIRATION

const MAIL_USERNAME = process.env.MAIL_USERNAME
const MAIL_PASSWORD = process.env.MAIL_PASSWORD

export {
    JWTSECRETKEY,
    JWTSECRETKEYREFRESH,
    JWTEXPIRATION,
	MAIL_USERNAME,
	MAIL_PASSWORD
}
