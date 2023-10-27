import { GraphQLError, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Storage, StorageDeleteMessage } from "./schema";
import StorageServices from "../../../services/storageServices";

export const storageMutuation = new GraphQLObjectType({
  name: "storageMutuation",
  fields: () => ({
    CreateWareHouse: {
      type: Storage,
      args: {
        item_img: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: new GraphQLNonNull(GraphQLString) },
        item_type: { type: new GraphQLNonNull(GraphQLString) },
        item_name: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLString) },
        units_in_measure: { type: new GraphQLNonNull(GraphQLString) },
        price_per_unit: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const isDataExist = await StorageServices.getStorageByUserIdItemTypeItemName(args.user_id, args.item_type, args.item_name);
        if (isDataExist?._id) {
          throw new GraphQLError("Data Already Exists", {
            extensions: {
              code: 409,
            },
          });
        }
        const CreateStorage = StorageServices.createStorage({ ...args });
        return CreateStorage;
      },
    },
    // Edit Storage
    EditWareHouse: {
      type: Storage,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        item_img: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: new GraphQLNonNull(GraphQLString) },
        item_type: { type: new GraphQLNonNull(GraphQLString) },
        item_name: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLString) },
        units_in_measure: { type: new GraphQLNonNull(GraphQLString) },
        price_per_unit: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const isDataExist = await StorageServices.getStorageByUserIdItemTypeItemName(args.user_id, args.item_type, args.item_name);
        if (!isDataExist?._id) {
          throw new GraphQLError("No Data to edit", {
            extensions: {
              code: 204,
            },
          });
        }
        const editStorage = await StorageServices.updateStorage(args, args._id);
        return editStorage;
      },
    },
    // Delete Storage By Storage ID
    DeleteWareHouse: {
      type: StorageDeleteMessage,
      args: {
        ware_house_id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { ware_house_id } = args;
        const isDataExist = await StorageServices.getStorageById(ware_house_id);
        if (!isDataExist?._id) {
          throw new GraphQLError("No data", {
            extensions: {
              code: 204,
            },
          });
        }
        return await StorageServices.deleteStorage(ware_house_id)
          .then((res) => {
            return res?._id;
          })
          .catch((err) => {
            throw new GraphQLError(err);
          });
      },
    },
  }),
});
