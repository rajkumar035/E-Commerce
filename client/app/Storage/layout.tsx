"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/app/global.css";
import SideNavigation from "@/components/SideNavigation";
import StorageApolloProvider from "@/providers/storageQueryProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SideNavigation>
      <StorageApolloProvider>
        <section>{children}</section>
      </StorageApolloProvider>
    </SideNavigation>
  );
}
