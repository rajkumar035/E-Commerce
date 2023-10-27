import { GraphQLSchema } from "graphql";
import { storageRetrieve } from "./retrieve";
import { storageMutuation } from "./mutation";

export default new GraphQLSchema({
  query: storageRetrieve,
  mutation: storageMutuation,
});
