import User from "./user.model.js";
import { hashPassword, comparePassword, generateToken } from "./auth.utils.js";

export const signupUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    /* Validate input */
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    /* Check if user already exists */
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    /* Hash password */
    const hashedPassword = await hashPassword(password);

    /* Create new user */
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    /* Generate JWT token */
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token
    });

  } catch (error) {

    console.error("Signup error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};
 

export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    /* Validate input */
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    /* Find user */
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    /* Compare password */
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    /* Generate token */
    const token = generateToken(user._id);

    res.json({
      success: true,
      token
    });

  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};