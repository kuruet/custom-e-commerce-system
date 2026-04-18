import * as chatService from "./chat.service.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message must be a non-empty string" });
    }
    if (message.length > 500) {
      return res.status(400).json({ success: false, message: "Message too long (max 500 chars)" });
    }

    const data = await chatService.sendMessage(userId, message.trim());
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await chatService.getChatHistory(userId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};