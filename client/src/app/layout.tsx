"use client";

import { IReactNode } from "@/interfaces/ICommon";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buy Any",
  description: "BuyAny",
};

const RootLayout: React.FunctionComponent<IReactNode> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
