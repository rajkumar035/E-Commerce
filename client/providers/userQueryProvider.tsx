"use client";

import { ADMIN_QUERIES_ORIGIN } from "@/helpers/constants";
import { IReactNode } from "@/interfaces/ICommon";
import ApolloInterceptor, { ErrorInterceptor, getRevalidationToken } from "@/middleware/apolloInterceptor";
import { HttpLink, InMemoryCache, ApolloClient, ApolloProvider, ApolloLink } from "@apollo/client";

const UserHttp = new HttpLink({
  uri: `http://localhost:2100/${ADMIN_QUERIES_ORIGIN}`,
  credentials: "include",
});

const UserClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloInterceptor().concat(ErrorInterceptor).concat(UserHttp),
  ssrMode: true,
});

const UserApolloProvider: React.FunctionComponent<IReactNode> = ({ children }) => {
  // Token Revalidation
  getRevalidationToken();

  return <ApolloProvider client={UserClient}>{children}</ApolloProvider>;
};

export default UserApolloProvider;
