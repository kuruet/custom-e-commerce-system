import jwt from "jsonwebtoken";

export const generateAdminToken = () => {
  return jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};