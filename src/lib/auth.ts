
import * as  joseJWT from "jose";

export const SECRET_KEY = process.env.JWT_SECRET || "7b750d5dc078c3b11216fc1316c70c76";
export const ENCODED_SECRET_KEY = new TextEncoder().encode(SECRET_KEY);
export const SECRET_KEY_REFRESH = process.env.JWT_SECRET_REFRESH || "a603f2d0d7368cc194352cec6183a61d";
export const ENCODED_SECRET_KEY_REFRESH = new TextEncoder().encode(SECRET_KEY_REFRESH);

export const generateTokens = async (user: { id: string; username: string }) => {
  return {
    accessToken: await generateToken(user, ENCODED_SECRET_KEY, '10s'),
    refreshToken: await generateToken(user, ENCODED_SECRET_KEY_REFRESH, '1m'),
  }
}

const generateToken = async (user: { id: string; username: string }, secret: Uint8Array<ArrayBufferLike>, lifespan: string) => {
  const token = await new joseJWT.SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(lifespan)
    .sign(secret);

  return token;
};

const verifyToken = async (token: string, secret: Uint8Array<ArrayBufferLike>): Promise<{ id: string } | null> => {
  try {
    const verifyResult = (await joseJWT.jwtVerify(token, secret)).payload as { id: string };
    return verifyResult;
  } catch (err) {
    return null;
  }
}; 

export const verifyAccessToken = async (token: string) => {
  return verifyToken(token, ENCODED_SECRET_KEY);
}

export const verifyRefreshToken = async (token: string) => {
  return verifyToken(token, ENCODED_SECRET_KEY_REFRESH);
}

