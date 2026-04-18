import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Sends an email asynchronously and catches errors so it NEVER blocks the main thread
 * @param {Object} options { to, subject, html }
 */
export const sendEmail = async ({ to, subject, html }) => {
  console.log("📧 Sending email to:", to);

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("❌ Missing EMAIL credentials");
      return;
    }

    const info = await transporter.sendMail({
      from: `"Nynth Studio" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
  }
};
