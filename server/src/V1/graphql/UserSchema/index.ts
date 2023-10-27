import { GraphQLSchema } from "graphql";
import { userRetrieve } from "./retrieve";
import { userMutuation } from "./mutation";

export default new GraphQLSchema({
  query: userRetrieve,
  mutation: userMutuation,
});
