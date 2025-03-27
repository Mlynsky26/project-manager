import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (user: { id: string; username: string }) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "10s",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
