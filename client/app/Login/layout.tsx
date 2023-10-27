"use client";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
