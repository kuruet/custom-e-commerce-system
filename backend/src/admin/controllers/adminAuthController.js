import { generateAdminToken } from "../utils/generateAdminToken.js";

export const adminLogin = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials"
      });
    }

    const token = generateAdminToken();

    res.json({
      success: true,
      token
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Admin login failed"
    });

  }

};