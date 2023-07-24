import { Response, Request } from "express";
import { IUser, IUserRoot } from "../interfaces/user";
import { Document, isObjectIdOrHexString } from "mongoose";
import UserServices from "../services/userServices";

export default class UserControl {
  static async createUser(req: Request, res: Response) {
    const { user_name, address, age, role_types, role, district, owner_mail, owner_mobile, owner_name, state }: IUserRoot = req.body;
    try {
      if (!user_name || !address || !age || role_types.length === 0 || !district || !owner_mail || !owner_mobile || !owner_name || !state || !role) {
        res.status(400).json({ Message: "Bad Request" });
      } else {
        const existedData: Document<IUser> | null = await UserServices.getUserByPhone(owner_mobile);
        if (existedData === null) {
          const isUserSaved: string | null = await UserServices.createUser(req.body);
          if (isUserSaved !== null) {
            res.status(200).json({ Message: `${role} Saved Successfully` });
          } else {
            res.status(201).json({ Message: `${role} Not Saved` });
          }
        } else {
          res.status(400).json({ Message: "User Already Existed" });
        }
      }
    } catch (err) {
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
        const existedData: Document<IUser> | null = await UserServices.getUserByPhone(owner_mobile);
        if (existedData?.id === id || existedData === null) {
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
      console.log(user_role);
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
}
