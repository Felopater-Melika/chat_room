import "../styles/globals.css";
import Header from "./Header";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        {/*@ts-ignore */}
        <Header />
        {children}
      </body>
    </html>
  );
}
