import { userModel } from "../models/userModel";
import { IUser } from "../interfaces/user";

export default class UserServices {
  static async createUser(body: IUser) {
    const UserSchema = new userModel(body);
    const userData = await UserSchema.save();
    return userData;
  }

  static async getAllUser() {
    const userData: Array<IUser> = await userModel.find();
    return userData;
  }

  static async getUserById(id: String) {
    const userData = await userModel.findOne({ _id: id });
    return userData;
  }

  static async getUserByPhone(phone: String) {
    const userData = await userModel.findOne({ owner_mobile: phone });
    return userData;
  }

  static async getUserByRole(user_role: String) {
    const userData = await userModel.findOne({ role: user_role });
    return userData;
  }

  static async updateUser(body: IUser, id: string) {
    const updatedData = await userModel.findByIdAndUpdate(id, body);
    return updatedData;
  }

  static async updateUserLogStatus(id: string) {
    const updatedData = await userModel.findByIdAndUpdate(id, { status: "LOGGEDIN" });
    return updatedData;
  }

  static async getUserByStatus(user_id: string) {
    const data = await userModel.findOne({ _id: user_id, status: "LOGGEDIN" });
    return data;
  }

  static async getUserByNumber(phoneNumber: string, role: "CONSUMER" | "PROVIDER") {
    const getUsers = await userModel.findOne({ owner_mobile: phoneNumber, role: role });
    return getUsers;
  }
}
