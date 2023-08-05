import "../styles/globals.css";
import Header from "./Header";
import React from "react";
import Providers from "./providers";
import {getServerSession} from "next-auth/next";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html className='bg-black'>
      <head />
      <body>
        {/*@ts-ignore */}
        <Header />

        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
