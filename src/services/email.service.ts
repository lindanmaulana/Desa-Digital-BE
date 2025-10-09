import { User } from "@prisma/client";
import fs from "fs";
import mustache from "mustache";
import nodemailer from "nodemailer";
import {MAIL_PASSWORD, MAIL_USERNAME } from "../config";
import { logger } from "../logging";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: MAIL_USERNAME,
		pass: MAIL_PASSWORD,
	},
});

export class EmailService {
	static async SendOtpMail(email: string, data: User) {
		try {
			const view = {
				user_name: data.name,
				otp_code: data.otp_code,
				app_name: "Desa Digital",
				app_website: "https://desadigital.com",
			};

			let template = fs.readFileSync(
				"src/utils/views/otp-mail.html",
				"utf-8"
			);

			const htmlOutput = mustache.render(template, view)

			await transporter.sendMail({
				from: MAIL_USERNAME,
				to: email,
				subject: "Kode Verifikasi Akun Anda",
				html: htmlOutput,
			})

		} catch (err) {
			logger.error(err)
			console.error("Gagal mengirim email!")
		}
	};
}

