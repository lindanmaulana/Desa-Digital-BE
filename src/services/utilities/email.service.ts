import { User } from "@prisma/client";
import fs from "fs";
import mustache from "mustache";
import nodemailer from "nodemailer";
import { BASEURL_AUTHENTICATION, BASEURL_CLIENT, MAIL_PASSWORD, MAIL_USERNAME } from "../../config";
import { logger } from "../../logging";
import { InternalServerError } from "../../utils/errors";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: MAIL_USERNAME,
		pass: MAIL_PASSWORD,
	},
});

export const EmailService = {
	SendOtpMails: async (email: string, title: string, message: string, data: User) => {
		try {
			const view = {
				user_name: data.name,
				otp_code: data.otp,
				title: title,
				description: message,
				app_name: "Desa Digital",
				app_website: "https://desadigital.com",
			};

			let template = fs.readFileSync("src/utils/views/example.html", "utf-8");

			const htmlOutput = mustache.render(template, view);

			await transporter.sendMail({
				from: MAIL_USERNAME,
				to: email,
				subject: "Kode Verifikasi Akun Anda",
				html: htmlOutput,
			});
		} catch (err) {
			logger.error(err);

			throw new InternalServerError("Terjadi kesalahan sistem saat mengirim OTP, please try again later");
		}
	},

	ResendOtpVerifyAccountMail: async (email: string, data: User) => {
		try {
			const view = {
				user_name: data.name,
				otp: data.otp,
				app_name: "Desa Digital",
				expiry_minutes: "15 menit",
				app_website: "https://desadigital.com",
			};

			let template = fs.readFileSync("src/utils/views/resend-otp-verify-account-mail.html", "utf-8");
			const htmlOutput = mustache.render(template, view);

			await transporter.sendMail({
				from: MAIL_USERNAME,
				to: email,
				subject: "Kode Verifikasi Akun Anda",
				html: htmlOutput,
			});
		} catch (err) {
			logger.error(err);

			throw new InternalServerError("Terjadi kesalahan sistem saat mengirim OTP, please try again later");
		}
	},

	SendTokenVerifyAccountMail: async (email: string, token: string, data: User) => {
		try {
			const view = {
				user_name: data.name,
				otp: data.otp,
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

			throw new InternalServerError("Terjadi kesalahan sistem saat mengirim TOKEN, please try again later");
		}
	},

	ResendTokenVerifyAccountMail: async (email: string, token: string, data: User) => {
		try {
			const view = {
				user_name: data.name,
				otp_code: data.otp,
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

			throw new InternalServerError("Terjadi kesalahan sistem saat mengirim TOKEN, please try again later");
		}
	},

	SendOtpForgotPasswordMail: async (email: string, data: User) => {
		try {
			const view = {
				user_name: data.name,
				otp: data.otp,
				app_name: "Desa Digital",
				expiry_minutes: "15 menit",
				app_website: "https://desadigital.com",
			};

			let template = fs.readFileSync("src/utils/views/forgot-password-otp-mail.html", "utf-8");
			const htmlOutput = mustache.render(template, view);

			await transporter.sendMail({
				from: MAIL_USERNAME,
				to: email,
				subject: "Kode Reset Password Akun Anda",
				html: htmlOutput,
			});
		} catch (err) {
			logger.error(err);

			throw new InternalServerError("Terjadi kesalahan sistem saat mengirim OTP, please try again later");
		}
	},

	ReSendOtpForgotPasswordMail: async (email: string, data: User) => {
		try {
			const view = {
				user_name: data.name,
				otp: data.otp,
				app_name: "Desa Digital",
				expiry_minutes: "15 menit",
				app_website: "https://desadigital.com",
			};

			let template = fs.readFileSync("src/utils/views/resend-forgot-password-otp-mail.html", "utf-8");
			const htmlOutput = mustache.render(template, view);

			await transporter.sendMail({
				from: MAIL_USERNAME,
				to: email,
				subject: "Kode Reset Password Akun Anda",
				html: htmlOutput,
			});
		} catch (err) {
			logger.error("Resend OTP forgot password", err);

			throw new InternalServerError("Terjadi kesalahan sistem saat mengirim OTP, please try again later");
		}
	},

	SendTokenForgotPasswordMail: async (email: string, token: string, data: User) => {
		try {
			const view = {
				user_name: data.name,
				otp: data.otp,
				app_name: "Desa Digital",
				expiry_minutes: "15 menit",
				app_website: "https://desadigital.com",
				reset_link: `${BASEURL_AUTHENTICATION}/forgot-password/reset?token=${token}`,
			};

			let template = fs.readFileSync("src/utils/views/forgot-password-token-mail.html", "utf-8");
			const htmlOutput = mustache.render(template, view);

			await transporter.sendMail({
				from: MAIL_USERNAME,
				to: email,
				subject: "Kode Reset Password Akun Anda",
				html: htmlOutput,
			});
		} catch (err) {
			logger.error("Send TOKEN forgot-password", err);

			throw new InternalServerError("Terjadi kesalahan sistem saat mengirim TOKEN, please try again later");
		}
	},
};
