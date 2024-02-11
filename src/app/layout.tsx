"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../../lib/providers";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <title>my blog</title>
          <body>{children}</body>
        </html>
      </QueryClientProvider>
    </Providers>
  );
}
