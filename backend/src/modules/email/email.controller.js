import * as emailService from "./email.service.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("SUBSCRIBE HIT:", email);
    console.log("🚀 FINAL EMAIL RECEIVER:", email);
    console.log("➡️ Calling subscribeEmail...");
    const userId = req.user?._id || null;


    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ success: false, message: "Valid email is required" });
    }

    const result = await emailService.subscribeEmail(email, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Subscription failed" });
  }
};

import { sendEmail } from "../../utils/email.service.js";

export const testEmail = async (req, res) => {
  try {
    const targetEmail = req.query.email;

    if (!targetEmail) {
      return res.status(400).json({ message: "Email required" });
    }

    await sendEmail({
      to: targetEmail,
      subject: "Test Email",
      html: "<h1>Test working</h1>"
    });
    res.status(200).json({ success: true, message: "Test email initiated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Test failed" });
  }
};
