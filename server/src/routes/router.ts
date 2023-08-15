import express from "express";
import ConsumerControl from "../controller/userController";
import StorageController from "../controller/storageController";

const router = express.Router({ caseSensitive: true });

// Users Api's
router.post("/createuser", ConsumerControl.createUser);
router.get(
  "/getusers",
  //   (req, res, next) => {
  //     if (isreq) {
  //       return next();
  //     } else {
  //       return res.sendStatus(400);
  //     }
  //   },
  ConsumerControl.getAllUser
);
router.get("/getuser/:id", ConsumerControl.getUserById);
router.get("/getuserbyrole/:user_role", ConsumerControl.getUserByRole);
router.patch("/updateuser/:id", ConsumerControl.updateUser);

// Storage Api's
router.post("/createwarehouse", StorageController.createStorage);
router.patch("/updatewarehouse/:ware_house_id", StorageController.updateStorage);
router.delete("/deletewarehouse/:ware_house_id", StorageController.deleteStorage);
router.get("/getwarehousebyuser/:user_id", StorageController.getStorageByUserId);
router.get("/getwarehousebyuser/:item_name/:user_id", StorageController.getStorageByItemName);

export = router;
