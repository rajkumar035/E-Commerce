"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/app/global.css";
import SideNavigation from "@/components/SideNavigation";
import UserApolloProvider from "@/providers/userQueryProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SideNavigation>
      <UserApolloProvider>
        <section>{children}</section>
      </UserApolloProvider>
    </SideNavigation>
  );
}
