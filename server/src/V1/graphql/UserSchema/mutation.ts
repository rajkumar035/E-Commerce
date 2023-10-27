import { GraphQLError, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { User, UserType } from "./schema";
import UserServices from "../../../services/userServices";
import { createSecret } from "../../../helpers/otpAuthentication";

export const userMutuation = new GraphQLObjectType({
  name: "userMutuation",
  fields: () => ({
    createUser: {
      type: User,
      args: {
        address: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLString) },
        user_name: { type: new GraphQLNonNull(GraphQLString) },
        role_types: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
        district: { type: new GraphQLNonNull(GraphQLString) },
        owner_mail: { type: new GraphQLNonNull(GraphQLString) },
        owner_mobile: { type: new GraphQLNonNull(GraphQLString) },
        owner_name: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: new GraphQLNonNull(GraphQLString) },
        usertype: { type: new GraphQLNonNull(UserType) },
        admin: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const isUserDataExist = await UserServices.getUserByPhone(args.owner_mobile);
        if (isUserDataExist) {
          throw new GraphQLError("User Already Exist", {
            extensions: {
              code: 409,
            },
          });
        }
        if (args.usertype === "USER" && (!args.admin || args.admin === "")) {
          throw new GraphQLError("Provide a admin ID", {
            extensions: {
              code: 400,
            },
          });
        }
        const isAdmin = await UserServices.getUserById(args.admin);
        if (isAdmin?.usertype !== "ADMIN") {
          throw new GraphQLError("Provided ID is not belongs to admin", {
            extensions: {
              code: 400,
            },
          });
        }
        const payload = { ...args, refresh: createSecret(32, false), secret: createSecret(64, true) };
        const createUser = await UserServices.createUser(payload);
        if (!createUser) {
          throw new GraphQLError("User not saved", {
            extensions: {
              code: 201,
            },
          });
        }
        return createUser;
      },
    },
    updateUser: {
      type: User,
      args: {
        address: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLString) },
        user_name: { type: new GraphQLNonNull(GraphQLString) },
        role_types: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
        district: { type: new GraphQLNonNull(GraphQLString) },
        owner_mail: { type: new GraphQLNonNull(GraphQLString) },
        owner_mobile: { type: new GraphQLNonNull(GraphQLString) },
        owner_name: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const isUserDataExist = await UserServices.getUserByPhone(args.owner_mobile);
        if (isUserDataExist && isUserDataExist?._id.toString() !== args.id) {
          throw new GraphQLError("User already exist with the registered mobile number", {
            extensions: {
              code: 409,
            },
          });
        }
        const payload = { ...args };
        const createUser = await UserServices.updateUser(payload, args.id);
        return createUser;
      },
    },
  }),
});
