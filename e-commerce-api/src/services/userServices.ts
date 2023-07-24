import { Document, isObjectIdOrHexString } from "mongoose";
import { userModel } from "../models/userModel";
import { IUser } from "../interfaces/user";

export default class UserServices {
  static async createUser(body: IUser) {
    const UserSchema = new userModel(body);
    const userData = await UserSchema.save();
    if (userData.id) {
      return userData.id;
    } else {
      return null;
    }
  }

  static async getAllUser() {
    const userData: Array<IUser> = await userModel.find();
    return userData;
  }

  static async getUserById(id: String) {
    const userData: Document<IUser> | null = await userModel.findOne({ _id: id });
    return userData;
  }

  static async getUserByPhone(phone: String) {
    const userData: Document<IUser> | null = await userModel.findOne({ owner_mobile: phone });
    return userData;
  }

  static async getUserByRole(user_role: String) {
    const userData = await userModel.aggregate([{ $match: { role: `${user_role}` } }]);
    return userData;
  }

  static async updateUser(body: IUser, id: string) {
    const updatedData = await userModel.findByIdAndUpdate(id, body);
    return updatedData;
  }
}
