import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS LENGTH:", process.env.EMAIL_PASS?.length);

transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ SMTP CONNECTION FAILED:", error);
  } else {
    console.log("✅ SMTP SERVER READY");
  }
});

/**
 * SAFE NON-BLOCKING EMAIL
 */
export const sendEmail = async ({ to, subject, html }) => {
  console.log("📧 Attempting email to:", to);

  // 🔥 HARD TIMEOUT PROTECTION (IMPORTANT)
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Email timeout")), 5000)
  );

  try {
    await Promise.race([
      transporter.sendMail({
        from: `"Nynth Studio" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      }),
      timeoutPromise,
    ]);

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error.message);
  }
};
