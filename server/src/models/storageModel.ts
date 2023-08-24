import mongoose, { Schema } from "mongoose";
import { IStorage } from "../interfaces/storage";

const warehouse_model: Schema = new Schema<IStorage>(
  {
    item_img: { type: String, required: true },
    user_id: { type: String, required: true },
    item_type: { type: String, required: true },
    item_name: { type: String, required: true },
    quantity: { type: String, required: true },
    units_in_measure: { type: String, required: true },
    price_per_unit: { type: String, required: true },
  },
  { versionKey: false, timestamps: true, timeseries: { timeField: "updatedAt", metaField: "quantity", granularity: "price_per_unit" } }
);

const storageModel = mongoose.model<IStorage>("WareHouse", warehouse_model, "WareHouse");
export { storageModel };
