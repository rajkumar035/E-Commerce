import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { User } from "./schema";
import UserServices from "../../../services/userServices";

export const userRetrieve = new GraphQLObjectType({
  name: "userRetrieve",
  fields: () => ({
    Users: {
      type: new GraphQLList(User),
      async resolve() {
        return await UserServices.getAllUser();
      },
    },
    User: {
      type: User,
      args: { user_id: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parent, args) {
        return await UserServices.getUserById(args.user_id);
      },
    },
    LoggedUser: {
      type: User,
      args: { user_id: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parent, args) {
        return await UserServices.getUserByStatus(args.user_id);
      },
    },
    UsersByAdmin: {
      type: new GraphQLList(User),
      args: { admin_id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        return await UserServices.getUserByAdminId(args.admin_id);
      },
    },
  }),
});
