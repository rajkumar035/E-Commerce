"use client";

import React from "react";
import { IReactNode } from "@/interfaces/ICommon";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import MuiCacheProvider from "@/providers/muiCacheProvider";

const inter = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

const SideNavigation = React.lazy(() => import("@/components/SideNavigation/index"));

export const metadata: Metadata = {
  title: "Cart",
  description: "BuyAny",
};

const RootLayout: React.FunctionComponent<IReactNode> = ({ children }) => {
  return (
    <section className={inter.className}>
      <MuiCacheProvider>
        <SideNavigation>
          <React.Suspense fallback={<h6>Loading....</h6>}>
            <div className="pt-4">{children}</div>
          </React.Suspense>
        </SideNavigation>
      </MuiCacheProvider>
    </section>
  );
};

export default RootLayout;
