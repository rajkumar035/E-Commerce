import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const Storage = new GraphQLObjectType({
  name: "Storage",
  fields: () => ({
    item_img: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
    item_type: { type: new GraphQLNonNull(GraphQLString) },
    item_name: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: new GraphQLNonNull(GraphQLString) },
    units_in_measure: { type: new GraphQLNonNull(GraphQLString) },
    price_per_unit: { type: new GraphQLNonNull(GraphQLString) },
    _id: { type: new GraphQLNonNull(GraphQLID) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const StorageWareHouse = new GraphQLObjectType({
  name: "StorageWarehouse",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    items_name: { type: new GraphQLNonNull(GraphQLString) },
    quanity: { type: new GraphQLNonNull(GraphQLString) },
    units_in_measure: { type: new GraphQLNonNull(GraphQLString) },
    price_per_unit: { type: new GraphQLNonNull(GraphQLString) },
    created_at: { type: new GraphQLNonNull(GraphQLString) },
    last_update: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const StorageList = new GraphQLObjectType({
  name: "StorageListByUser",
  fields: () => ({
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    item_img: { type: new GraphQLNonNull(GraphQLString) },
    item_type: { type: new GraphQLNonNull(GraphQLString) },
    warehouse: { type: new GraphQLList(StorageWareHouse) },
  }),
});

export const StorageDeleteMessage = new GraphQLObjectType({
  name: "StorageDeletedSuccessfully",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
  }),
});
