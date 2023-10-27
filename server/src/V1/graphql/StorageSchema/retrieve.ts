import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Storage, StorageList } from "./schema";
import StorageServices from "../../../services/storageServices";

export const storageRetrieve = new GraphQLObjectType({
  name: "storageRetrieve",
  fields: () => ({
    Storages: {
      type: new GraphQLList(Storage),
      async resolve() {
        return await StorageServices.getAllStorage();
      },
    },
    Storage: {
      type: Storage,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        return await StorageServices.getStorageById(args.id);
      },
    },
    StorageByUserId: {
      type: new GraphQLList(Storage),
      args: { user_id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        return await StorageServices.getRawStorageByUserId(args.user_id);
      },
    },
    StorageByUserIdWarehouse: {
      type: new GraphQLList(StorageList),
      args: { user_id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        const data = await StorageServices.getStorageByUserId(args.user_id);
        return data;
      },
    },
    StoragesByUserIdAndItemName: {
      type: StorageList,
      args: { user_id: { type: new GraphQLNonNull(GraphQLID) }, item_type: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parent, args) {
        const data = await StorageServices.getStorageByItemName(args.user_id, args.item_type);
        return data[0];
      },
    },
  }),
});
