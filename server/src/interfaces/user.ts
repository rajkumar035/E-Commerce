export interface IUserRoot {
  user_name: String;
  role: "CONSUMER" | "PROVIDER";
  role_types: Array<String>;
  owner_mail: String;
  owner_mobile: String;
  owner_name: String;
  address: String;
  state: String;
  district: String;
  age: String;
}

export interface IUser extends Document {
  user_name: String;
  role: "CONSUMER" | "PROVIDER";
  role_types: typeof Array<String>;
  owner_mail: String;
  owner_mobile: String;
  owner_name: String;
  address: String;
  state: String;
  district: String;
  age: String;
  secret: String;
}
