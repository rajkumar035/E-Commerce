"use client";

import React from "react";
import { IReactNode } from "@/interfaces/ICommon";
import { EmotionCache } from "@emotion/cache";
import createEmotionCache from "@/helpers/emotionCache";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import { CacheProvider } from "@emotion/react";

const inter = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

const SideNavigation = React.lazy(() => import("@/components/SideNavigation/index"));

export const metadata: Metadata = {
  title: "Storage",
  description: "BuyAny",
};

const RootLayout: React.FunctionComponent<IReactNode> = ({ children }) => {
  const cache: EmotionCache = createEmotionCache();
  return (
    <section className={inter.className}>
      <CacheProvider value={cache}>
        <SideNavigation>
          <React.Suspense fallback={<h6>Loading...</h6>}>
            <div className="py-4">{children}</div>
          </React.Suspense>
        </SideNavigation>
      </CacheProvider>
    </section>
  );
};

export default RootLayout;
