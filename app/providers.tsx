"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export default function Providers({ session, children }: any) {
  const [queryClient] = React.useState(() => new QueryClient())
  return <SessionProvider session={session}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></SessionProvider>;
}
