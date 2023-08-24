import { Response, Request } from "express";
import { IUser, IUserRoot } from "../interfaces/user";
import { isObjectIdOrHexString } from "mongoose";
import UserServices from "../services/userServices";
import speakeasy from "speakeasy";
import { createJsonWebTokenOnSignIn, verifyJsonWebToken } from "../middleware/jwtOperators";

export default class UserControl {
  static async createUser(req: Request, res: Response) {
    const { user_name, address, age, role_types, role, district, owner_mail, owner_mobile, owner_name, state }: IUserRoot = req.body;
    try {
      if (!user_name || !address || !age || role_types.length === 0 || !district || !owner_mail || !owner_mobile || !owner_name || !state || !role) {
        res.status(400).json({ Message: "Bad Request" });
      } else {
        const existedData = await UserServices.getUserByPhone(owner_mobile);
        if (existedData.length > 0) {
          res.status(400).json({ Message: "User Already Existed" });
        } else {
          const body: IUser = { secret: speakeasy.generateSecret({ length: 64, symbols: true }).ascii, ...req.body };
          const isUserSaved: string | null = await UserServices.createUser(body);
          if (isUserSaved !== null) {
            res.status(200).json({ Message: `${role} Saved Successfully` });
          } else {
            res.status(201).json({ Message: `${role} Not Saved` });
          }
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ Message: "Something Went Wrong" });
    }
  }

  static async getAllUser(req: Request, res: Response) {
    const userData: Array<IUser> = await UserServices.getAllUser();
    if (userData.length > 0) {
      res.status(200).json(userData);
    } else {
      res.status(200).json({ message: "No Data" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    if (id) {
      isObjectIdOrHexString(id);
      const userData = await UserServices.getUserById(id);
      if (userData) {
        res.status(200).json(userData);
      } else {
        res.status(400).json({ Message: "User Not Found" });
      }
    } else {
      res.status(400).json({ Message: "No UserFound" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { user_name, role, role_types, address, age, district, owner_mail, owner_mobile, owner_name, state }: IUserRoot = req.body;
    try {
      if (!user_name || !address || !age || role_types.length === 0 || !district || !owner_mail || !owner_mobile || !owner_name || !state || !id || !role) {
        res.status(400).json({ Message: "Bad Request" });
      } else {
        const existedData = await UserServices.getUserByPhone(owner_mobile);
        if (existedData.length > 0 && existedData[0]._id === id) {
          const userUpdate = await UserServices.updateUser(req.body, id);
          if (userUpdate?.id) {
            res.status(200).json({ Message: `${role} Updated Successfully` });
          }
        } else {
          res.status(400).json({ Message: "Registered Phone Number is already registered" });
        }
      }
    } catch (err) {
      res.status(500).json({ Message: "Something went wrong" });
    }
  }

  static async getUserByRole(req: Request, res: Response) {
    const { user_role } = req.params;
    if (user_role === "CONSUMER" || user_role === "PROVIDER") {
      const userData = await UserServices.getUserByRole(user_role);
      if (userData.length > 0) {
        res.status(200).json(userData);
      } else {
        res.status(400).json({ Message: "User Not Found" });
      }
    } else {
      res.status(400).json({ Message: `Available roles - CONSUMER and PROVIDER` });
    }
  }

  static async loginByOtp(req: Request, res: Response) {
    const { phoneNumber, role } = req.body;
    const roleVerify = role === "CONSUMER" || role === "PROVIDER";
    if (phoneNumber && phoneNumber.length >= 7 && phoneNumber.length <= 12 && roleVerify) {
      const hasUser = await UserServices.getUserByNumber(phoneNumber, role);
      if (hasUser.length > 0) {
        const otp = speakeasy.totp({
          secret: hasUser[0].secret,
          algorithm: "sha256",
          encoding: "base32",
          step: 30,
          digits: 6,
        });
        const jwt = createJsonWebTokenOnSignIn(hasUser[0]._id, hasUser[0].secret);
        res.status(200).json({
          otp: otp,
          jwt: jwt,
        });
      } else {
        res.status(200).json({
          Message: "User Not Found",
        });
      }
    } else {
      res.status(400).json({ Message: "Invalid Phone Number" });
    }
  }

  static async verifyOtpRole(req: Request, res: Response) {
    const { otp, phoneNumber, jwt } = req.body;
    if (otp && phoneNumber && phoneNumber.length >= 7 && phoneNumber.length <= 12) {
      const hasUser = await UserServices.getUserByPhone(phoneNumber);
      if (hasUser.length > 0) {
        var tokenValidate = speakeasy.totp.verify({
          secret: `${hasUser[0].secret}`,
          encoding: "base32",
          algorithm: "sha256",
          digits: 6,
          step: 30,
          token: otp,
        });
        if (tokenValidate) {
          const decodeTkt = verifyJsonWebToken(jwt, hasUser[0].secret);
          if (decodeTkt) {
            res.status(200).json(hasUser[0]);
          }
        } else {
          res.status(200).json({ Message: false });
        }
      } else {
        res.status(400).json({ Message: "User Did not found" });
      }
    } else {
      res.status(400).json({ Message: "Invalid Payload" });
    }
  }
}
