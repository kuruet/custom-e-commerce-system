import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📧 Sending via Resend:", to);
    console.log("🚀 FINAL EMAIL RECEIVER:", to);

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ Missing RESEND_API_KEY");
      return;
    }

    const response = await resend.emails.send({
      from: "Nynth Studio <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", response);
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
  }
};
