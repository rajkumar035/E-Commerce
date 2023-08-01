"use client";

import Link from "next/link";
import React from "react";

const Layout = React.lazy(() => import("@/pages/Cart/layout"));

const Cart: React.FunctionComponent = () => {
  return (
    <Layout>
      <Link href={"/Storage"}>Storage</Link>
    </Layout>
  );
};

export default Cart;
