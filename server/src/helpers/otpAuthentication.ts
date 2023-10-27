import speakeasy, { Algorithm, Encoding } from "speakeasy";

export const createOtp: (secret: string) => string = (secret: string) => {
  return speakeasy.totp({
    secret: secret,
    algorithm: process.env.OTP_ALGORITHM as Algorithm,
    encoding: process.env.OTP_ENCODING as Encoding,
    time: parseInt(`${process.env.OTP_TIME}`),
    digits: parseInt(`${process.env.OTP_DIGITS}`),
  });
};

export const verifyOtp: (secret: string, otp: string) => boolean = (secret: string, otp: string) => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: process.env.OTP_ENCODING as Encoding,
    algorithm: process.env.OTP_ALGORITHM as Algorithm,
    digits: parseInt(`${process.env.OTP_DIGITS}`),
    time: parseInt(`${process.env.OTP_TIME}`),
    token: otp,
  });
};

export const createSecret: (length: number, symbol: boolean) => string = (length: number, symbol: boolean) => {
  return speakeasy.generateSecret({ length: length, symbols: symbol }).ascii;
};
