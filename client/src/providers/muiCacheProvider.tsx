import { IReactNode } from "@/interfaces/ICommon";
import createCache, { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React from "react";

const MuiCacheProvider: React.FunctionComponent<IReactNode> = ({ children }) => {
  // Styles Caching
  const createEmotionCache: () => EmotionCache = () => {
    return createCache({ key: "css" });
  };

  //   Getting the intance of caching
  const cache: EmotionCache = createEmotionCache();

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default MuiCacheProvider;
