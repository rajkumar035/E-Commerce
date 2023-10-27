import { JwtPayload, sign, verify } from "jsonwebtoken";

export const createJsonWebTokenOnSignIn: (id: string, secret: string) => string = (id: string, secret: string) => {
  return sign({ id }, secret, { expiresIn: process.env.JWT_MAX_AGE });
};

export const createRefreshTokenOnSigin: (id: string, secret: string) => string = (id: string, secret: string) => {
  return sign({ id }, secret);
};

export const verifyJsonWebToken: (token: string, secret: string) => JwtPayload | string = (token: string, secret: string) => {
  return verify(token, secret);
};
