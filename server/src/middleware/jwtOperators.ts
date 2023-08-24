import { JwtPayload, sign, verify } from "jsonwebtoken";
const maxAge = 3 * 24 * 60 * 60 * 1000;

export const createJsonWebTokenOnSignIn: (id: string, secret: string) => string = (id: string, secret: string) => {
  return sign({ id }, secret, { expiresIn: maxAge });
};

export const verifyJsonWebToken: (token: string, secret: string) => JwtPayload | string = (token: string, secret: string) => {
  return verify(token, secret);
};
