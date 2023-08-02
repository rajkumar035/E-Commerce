"use client";

import React from "react";
import { IReactNode } from "@/interfaces/ICommon";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CreateCache from "@/helpers/emotionCache";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

const SideNavigation = React.lazy(() => import("@/components/SideNavigation/index"));

export const metadata: Metadata = {
  title: "Cart",
  description: "BuyAny",
};

const RootLayout: React.FunctionComponent<IReactNode> = ({ children }) => {
  const cache: EmotionCache = CreateCache();
  return (
    <section className={inter.className}>
      <CacheProvider value={cache}>
        <React.Suspense>
          <SideNavigation>
            <div className="pt-4">{children}</div>
          </SideNavigation>
        </React.Suspense>
      </CacheProvider>
    </section>
  );
};

export default RootLayout;
