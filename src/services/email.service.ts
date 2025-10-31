import { User } from "@prisma/client";
import fs from "fs";
import mustache from "mustache";
import nodemailer from "nodemailer";
import { BASEURL_CLIENT, MAIL_PASSWORD, MAIL_USERNAME } from "../config";
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
				title: "Verifikasi Akun",
				description: "Terima kasih telah mendaftar di",
				app_name: "Desa Digital",
				app_website: "https://desadigital.com",
			};

			let template = fs.readFileSync("src/utils/views/otp-mail.html", "utf-8");

			const htmlOutput = mustache.render(template, view);

			await transporter.sendMail({
				from: MAIL_USERNAME,
				to: email,
				subject: "Kode Verifikasi Akun Anda",
				html: htmlOutput,
			});
		} catch (err) {
			logger.error(err);
		}
	}

	static async ResendOtpMail(email: string, data: User) {
		try {
			const view = {
				user_name: data.name,
				otp_code: data.otp_code,
				title: "Kode Verifikasi",
				description: "Kode verifikasi baru dari",
				app_name: "Desa Digital",
				app_website: "https://desadigital.com",
			};

			let template = fs.readFileSync("src/utils/views/otp-mail.html", "utf-8");
			const htmlOutput = mustache.render(template, view);

			await transporter.sendMail({
				from: MAIL_USERNAME,
				to: email,
				subject: "Kode Verifikasi Akun Anda",
				html: htmlOutput,
			});
		} catch (err) {
			logger.error(err);
		}
	}

	static async SendVerifyAccountMail(email: string, token: string, data: User) {
		try {
			const view = {
				user_name: data.name,
				otp_code: data.otp_code,
				app_name: "Desa Digital",
				verification_link: `${BASEURL_CLIENT}?token=${token}`,
			};

			let template = fs.readFileSync("src/utils/views/verify-account-mail.html", "utf-8");

			const htmlOutput = mustache.render(template, view);

			await transporter.sendMail({
				from: MAIL_USERNAME,
				to: email,
				subject: "Verifikasi Akun Anda",
				html: htmlOutput,
			});
		} catch (err) {
			logger.error("Send verify-account mail", err);
		}
	}

	static async ResendVerifyAccountMail(email: string, token: string, data: User) {
		try {
			const view = {
				user_name: data.name,
				otp_code: data.otp_code,
				app_name: "Desa Digital",
				verification_link: `${BASEURL_CLIENT}?token=${token}`,
			};

			let template = fs.readFileSync("src/utils/views/verify-account-mail.html", "utf-8");

			const htmlOutput = mustache.render(template, view);

			await transporter.sendMail({
				from: MAIL_USERNAME,
				to: email,
				subject: "Verifikasi Akun Anda",
				html: htmlOutput,
			});
		} catch (err) {
			logger.error("Send verify-account mail", err);
		}
	}
}
