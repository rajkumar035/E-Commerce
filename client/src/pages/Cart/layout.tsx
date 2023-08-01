"use client";

import { IReactNode } from "@/interfaces/ICommon";
import { CacheProvider, EmotionCache } from "@emotion/react";
import React from "react";
import CreateCache from "@/helpers/emotionCache";
import { Metadata } from "next";

const SideNavigation = React.lazy(() => import("@/components/SideNavigation/index"));

export const metadata: Metadata = {
  title: "Cart",
  description: "BuyAny",
};

const RootLayout: React.FunctionComponent<IReactNode> = ({ children }) => {
  const cache: EmotionCache = CreateCache();
  return (
    <CacheProvider value={cache}>
      <React.Suspense>
        <SideNavigation>{children}</SideNavigation>
      </React.Suspense>
    </CacheProvider>
  );
};

export default RootLayout;
