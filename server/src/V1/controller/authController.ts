import speakeasy, { Algorithm, Encoding } from "speakeasy";
import { createJsonWebTokenOnSignIn, createRefreshTokenOnSigin, verifyJsonWebToken } from "../../helpers/jwtOperators";
import { Response, Request } from "express";
import UserServices from "../../services/userServices";

export default class AuthControl {
  static async loginByOtp(req: Request, res: Response) {
    const { phoneNumber, role } = req.body;
    const roleVerify = role === "CONSUMER" || role === "PROVIDER";
    const isValidUser = phoneNumber && phoneNumber.length >= 7 && phoneNumber.length <= 12 && roleVerify;

    if (!isValidUser) {
      return res.status(400).json({ Message: "Invalid Phone Number" });
    }

    const hasUser = await UserServices.getUserByNumber(phoneNumber, role);
    const hasValidConfigs = hasUser?._id && process.env.OTP_ALGORITHM && process.env.OTP_TIME && process.env.OTP_ENCODING && process.env.OTP_DIGITS;
    if (!hasValidConfigs) {
      return res.status(400).json({
        Message: "User Not Found",
      });
    }

    const otp = speakeasy.totp({
      secret: hasUser?.secret.toString(),
      algorithm: process.env.OTP_ALGORITHM as Algorithm,
      encoding: process.env.OTP_ENCODING as Encoding,
      time: parseInt(process.env.OTP_TIME as string),
      digits: parseInt(process.env.OTP_DIGITS as string),
    });
    const jwt = createJsonWebTokenOnSignIn(hasUser._id.toString(), hasUser.secret.toString());
    await UserServices.updateUserLogStatus(hasUser?._id.toString());
    res.status(200).json({
      otp: otp,
      jwt: jwt,
    });
  }

  static async verifyOtpRole(req: Request, res: Response) {
    const { otp, phoneNumber, jwt } = req.body;
    const hasValidPayload = otp && phoneNumber && phoneNumber.length >= 7 && phoneNumber.length <= 12;
    if (!hasValidPayload) {
      return res.status(400).json({ Message: "Invalid Payload" });
    }

    const hasUser = await UserServices.getUserByPhone(phoneNumber);
    const hasValidUser = hasUser?._id && process.env.OTP_ALGORITHM && process.env.OTP_ENCODING && process.env.OTP_TIME && process.env.OTP_DIGITS;
    if (!hasValidUser) {
      return res.status(400).json({ Message: "User Did not found" });
    }

    var tokenValidate = speakeasy.totp.verify({
      secret: `${hasUser?.secret}`,
      encoding: process.env.OTP_ENCODING as Encoding,
      algorithm: process.env.OTP_ALGORITHM as Algorithm,
      digits: parseInt(process.env.OTP_DIGITS as string),
      time: parseInt(process.env.OTP_TIME as string),
      token: otp,
    });
    const isTokenValidated = tokenValidate && hasUser;
    if (!isTokenValidated) {
      return res.status(400).json({ Message: "OTP Time out" });
    }

    const decodeTkt = verifyJsonWebToken(jwt, hasUser?.secret.toString());
    const refresh = createRefreshTokenOnSigin(hasUser?._id.toString(), hasUser?.refresh);
    if (!decodeTkt) {
      return res.status(400).json({ Message: "Invalid User" });
    }

    const minutedFromNow = new Date();
    const setNewTime = parseInt(process.env.JWT_MAX_AGE as string) / 1000 / 60;
    minutedFromNow.setMinutes(minutedFromNow.getMinutes() + setNewTime);

    res.cookie("cred", `${hasUser?._id}`);
    res.cookie("type", `${hasUser?.usertype}`);
    res.cookie("token", `${jwt}`, { expires: minutedFromNow, secure: true });
    res.status(200).json({
      jwt: jwt,
      refresh: refresh,
    });
  }

  static async logout(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.send(400).send("Bad Request");
    }

    try {
      await UserServices.updateUserLogStatus(id);
    } catch (err) {
      res.send(500).send("Something went wrong");
    }

    return res.clearCookie("token").clearCookie("cred").clearCookie("type").status(200).send("Logout Sucessfull");
  }

  static async createRefreshToken(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(403).send("Forbidden");
    }

    const hasUser = await UserServices.getUserById(id);
    if (!hasUser) {
      return res.status(403).send("Forbidden");
    }

    const newToken = createJsonWebTokenOnSignIn(hasUser?._id.toString(), hasUser?.secret.toString());

    const fiveMinutesFromNow = new Date();
    const totalExtends = parseInt(process.env.JWT_MAX_AGE as string) / 1000 / 60;
    fiveMinutesFromNow.setMinutes(fiveMinutesFromNow.getMinutes() + totalExtends);

    return res.cookie("token", `${newToken}`, { expires: fiveMinutesFromNow, secure: true }).cookie("cred", `${hasUser?._id}`).cookie("type", `${hasUser?.usertype}`).status(200).send("Success");
  }
}
