import getCookie from "@/helpers/cookieParser";
import { getNewToken, logoutUser } from "@/services/rest";
import { ApolloLink, NextLink, Operation } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

export const getRevalidationToken = async () => {
  let token = getCookie("token") || null;
  const userid = getCookie("cred") || null;

  if (userid === null) {
    return null;
  }

  if (token === null) {
    await getNewToken(userid);
  }
};

const ApolloInterceptor = () => {
  return new ApolloLink((operation: Operation, forward: NextLink) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${getCookie("token")}`,
      },
    }));
    return forward(operation);
  });
};

export const ErrorInterceptor = onError((error) => {
  const errorCode = (error?.networkError as any)?.statusCode;
  const errorStatus = errorCode === 401 || errorCode === 402 || errorCode === 403 || errorCode === 500;
  const userId = getCookie("cred");
  if (errorStatus) {
    logoutUser(userId)
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => {
        window.location.href = "/";
      });
  }
});

export default ApolloInterceptor;
