import { IStorageRoot } from "../interfaces/storage";
import { storageModel } from "../models/storageModel";

export default class StorageServices {
  static async createStorage(body: IStorageRoot) {
    const StorageSchema = new storageModel(body);
    const storageData = await StorageSchema.save();
    if (storageData.id) {
      return storageData.id;
    } else {
      return null;
    }
  }

  static async updateStorage(body: IStorageRoot, id: string) {
    const updatedData = await storageModel.findByIdAndUpdate(id, body);
    return updatedData;
  }

  static async deleteStorage(id: String) {
    const deletedData = await storageModel.findByIdAndDelete(id);
    return deletedData;
  }

  static async getStorageById(id: String) {
    const getStorageData = await storageModel.findById(id);
    return getStorageData;
  }

  static async getStorageByUserIdItemTypeItemName(userId: String, itemType: String, itemsName: String) {
    const getStorageData = await storageModel.aggregate([{ $match: { user_id: `${userId}`, item_type: `${itemType}`, item_name: `${itemsName}` } }]);
    return getStorageData;
  }

  static async getStorageByUserId(userId: String) {
    const getStorageData = await storageModel.aggregate([
      { $match: { user_id: `${userId}` } },
      {
        $group: {
          _id: {
            user_id: "$user_id",
            item_type: "$item_type",
            item_img: "$item_img",
          },
          WareHouse: {
            $push: {
              _id: "$_id",
              items_name: "$item_name",
              quanity: "$quantity",
              units_in_measure: "$units_in_measure",
              price_per_unit: "$price_per_unit",
              created_at: "$createdAt",
              last_update: "$updatedAt",
            },
          },
        },
      },
      {
        $project: {
          user_id: "$_id.user_id",
          item_type: "$_id.item_type",
          item_img: "$_id.item_img",
          warehouse: "$WareHouse",
          _id: 0,
        },
      },
    ]);
    return getStorageData;
  }

  static async getRawStorageByUserId(userId: string) {
    const getStorageById = await storageModel.aggregate([{ $match: { user_id: `${userId}` } }]);
    return getStorageById;
  }

  static async getStorageByItemName(userId: string, itemName: string) {
    const getStorageByItemName = await storageModel.aggregate([
      { $match: { user_id: `${userId}` } },
      {
        $group: {
          _id: {
            user_id: "$user_id",
            item_type: "$item_type",
            item_img: "$item_img",
          },
          WareHouse: {
            $push: {
              _id: "$_id",
              items_name: "$item_name",
              quanity: "$quantity",
              units_in_measure: "$units_in_measure",
              price_per_unit: "$price_per_unit",
              created_at: "$createdAt",
              last_update: "$updatedAt",
            },
          },
        },
      },
      {
        $project: {
          user_id: "$_id.user_id",
          item_type: "$_id.item_type",
          item_img: "$_id.item_img",
          warehouse: "$WareHouse",
          _id: 0,
        },
      },
      { $match: { item_type: `${itemName}` } },
    ]);
    return getStorageByItemName;
  }
}
