import "../styles/globals.css";
import Header from "./Header";
import React from "react";
import { unstable_getServerSession } from "next-auth/next";
import Providers from "./providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession();

  return (
    <html>
      <head />
      <body>
        {/*@ts-ignore */}
        <Header />
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
