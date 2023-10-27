import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user";

const user_model: Schema = new Schema<IUser>(
  {
    address: { type: String, required: true },
    age: { type: String, required: true },
    user_name: { type: String, required: true },
    role_types: { type: Array<String>, required: true },
    district: { type: String, required: true },
    owner_mail: { type: String, required: true },
    owner_mobile: { type: String, required: true },
    owner_name: { type: String, required: true },
    state: { type: String, required: true },
    secret: { type: String, required: true },
    refresh: { type: String, required: true },
    usertype: { type: String, enum: ["ADMIN", "USER"], required: true },
    admin: { type: String },
    role: { type: String, enum: ["CONSUMER", "PROVIDER"], default: "CONSUMER", require: true },
    status: { type: String, enum: ["LOGGEDIN", "LOGOUT"], default: "LOGOUT" },
  },
  { versionKey: false, timestamps: true }
);

const userModel = mongoose.model<IUser>("User", user_model, "User");

export { userModel };
