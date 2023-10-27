"use client";

import { STORAGE_QUERIES_ORIGIN } from "@/helpers/constants";
import { IReactNode } from "@/interfaces/ICommon";
import ApolloInterceptor, { ErrorInterceptor, getRevalidationToken } from "@/middleware/apolloInterceptor";
import { HttpLink, InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";

const StorageHttp = new HttpLink({
  uri: `http://localhost:2100/${STORAGE_QUERIES_ORIGIN}`,
  credentials: "include",
});

const StorageClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloInterceptor().concat(ErrorInterceptor).concat(StorageHttp),
  ssrMode: true,
});

const StorageApolloProvider: React.FunctionComponent<IReactNode> = ({ children }) => {
  // Token Revalidation
  getRevalidationToken();

  return <ApolloProvider client={StorageClient}>{children}</ApolloProvider>;
};

export default StorageApolloProvider;
