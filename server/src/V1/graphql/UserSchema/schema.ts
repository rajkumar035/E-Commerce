import { GraphQLEnumType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLEnumType({
  name: "UserType",
  values: {
    ADMIN: { value: "ADMIN" },
    USER: { value: "USER" },
  },
});

export const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    address: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLString) },
    user_name: { type: new GraphQLNonNull(GraphQLString) },
    role_types: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
    district: { type: new GraphQLNonNull(GraphQLString) },
    owner_mail: { type: new GraphQLNonNull(GraphQLString) },
    owner_mobile: { type: new GraphQLNonNull(GraphQLString) },
    owner_name: { type: new GraphQLNonNull(GraphQLString) },
    state: { type: new GraphQLNonNull(GraphQLString) },
    secret: { type: new GraphQLNonNull(GraphQLString) },
    refresh: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    usertype: { type: new GraphQLNonNull(UserType) },
    admin: { type: GraphQLString },
    role: { type: new GraphQLNonNull(GraphQLString) },
    _id: { type: new GraphQLNonNull(GraphQLID) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
