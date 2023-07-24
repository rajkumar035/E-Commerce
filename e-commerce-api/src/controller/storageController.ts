import { Request, Response } from "express";
import StorageServices from "../services/storageServices";
import ConsumerServices from "../services/userServices";

export default class StorageController {
  static async createStorage(req: Request, res: Response) {
    const bodyKeys = Object.keys(req.body);
    const hasKeys = bodyKeys.find((keys: string) => {
      return req.body[keys] === null;
    });
    const isDataExist = await StorageServices.getStorageByUserIdItemTypeItemName(req.body.user_id, req.body.item_type, req.body.item_name);
    try {
      if (bodyKeys.length === 6 && !hasKeys && isDataExist.length === 0) {
        const isStorageCreated = await StorageServices.createStorage(req.body);
        if (isStorageCreated === null) {
          res.status(400).json({ Message: "Storage is not saved" });
        } else {
          res.status(200).json({ Message: "Storage was saved Successfully" });
        }
      } else {
        res.status(400).json({ Message: hasKeys ? `${hasKeys} null in payload` : isDataExist.length > 0 ? "This Itemtype is Already Exist try to update it" : "Some Keys is missing in payload" });
      }
    } catch (err) {
      res.status(500).json({ Message: "Something Went Wrong" });
    }
  }

  static async updateStorage(req: Request, res: Response) {
    const { ware_house_id } = req.params;
    const bodyKeys = Object.keys(req.body);
    const hasKeys = bodyKeys.find((keys: string) => {
      return req.body[keys] === null;
    });
    const isDataExist = await StorageServices.getStorageByUserIdItemTypeItemName(req.body.user_id, req.body.item_type, req.body.item_name);
    try {
      if (bodyKeys.length === 6 && !hasKeys && ware_house_id && isDataExist.length > 0) {
        const isStorageCreated = await StorageServices.updateStorage(req.body, ware_house_id);
        if (isStorageCreated === null) {
          res.status(400).json({ Message: "Storage is not updated" });
        } else {
          res.status(200).json({ Message: "Storage was updated Successfully" });
        }
      } else {
        res.status(400).json({ Message: hasKeys ? `${hasKeys} null in payload` : isDataExist.length === 0 ? "This Itemtype is not exist try to add it" : "Some Keys is missing in payload" });
      }
    } catch (err) {
      res.status(500).json({ Message: "Something went wrong" });
    }
  }

  static async deleteStorage(req: Request, res: Response) {
    const { ware_house_id } = req.params;
    try {
      const hasData = await StorageServices.getStorageById(ware_house_id);
      if (hasData?.id) {
        await StorageServices.deleteStorage(ware_house_id)
          .then(() => {
            res.status(200).json({ Message: "Storage data is deleted" });
          })
          .catch((err) => {
            res.status(400).json({ Message: "Storage data is not deleted" });
          });
      } else {
        res.status(400).json({ Message: "Given ID has no data" });
      }
    } catch (err) {
      res.status(500).json({ Message: "Something Went wrong" });
    }
  }

  static async getStorageByUserId(req: Request, res: Response) {
    const { user_id } = req.params;
    try {
      const hasUser = await ConsumerServices.getUserById(user_id);
      if (hasUser?.id) {
        const userStorage = await StorageServices.getStorageByUserId(user_id);
        if (userStorage.length > 0) {
          res.status(200).json(userStorage);
        } else {
          res.status(200).json({ Message: "User has no storage data" });
        }
      } else {
        res.status(400).json({ Message: "There is no registered used in the given ID" });
      }
    } catch (err) {
      res.status(500).json({ Message: err });
    }
  }
}
