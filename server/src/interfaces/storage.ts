import { Document } from "mongoose";

export interface IStorageRoot {
  item_type: String;
  user_id: String;
  item_name: String;
  quantity: Number;
  units_in_measure: String; //"Mg" | "Kg" | "Ml" | "L" | "Nos";
  price_per_unit: Number;
}

export interface IStorage extends Document {
  item_type: String;
  user_id: String;
  item_name: String;
  quantity: Number;
  units_in_measure: String; //"Mg" | "Kg" | "Ml" | "L" | "Nos";
  price_per_unit: Number;
}
