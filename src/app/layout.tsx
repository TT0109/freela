import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FacebookPixel from "./FacebookPixel";
import { Suspense } from "react";
import Head from "./head";
import path from 'path'
import fs from 'fs'
import gtmBody from "@/scripts/gtm-body";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "O Detetive do instagram",
  description: "Descubra quem está espionando seu perfil do instagram",
  icons: {
    icon: [
      {
        url: "/logo.jpg",
        sizes: "32x32",
        type: "image/jpg",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div dangerouslySetInnerHTML={{ __html: gtmBody }} />
        <Head />
        <Suspense>
          <FacebookPixel pixelId={process.env.FACEBOOK_PIXEL_ID!}/>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
