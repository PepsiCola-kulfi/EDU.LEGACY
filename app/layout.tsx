import localFont from "next/font/local";
import Navbar from "../components/Navbar";

import "./globals.css";
import { SmartWillProvider } from "@/context/SmartWillContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
    <SmartWillProvider>
    <body className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </SmartWillProvider>
    
    </html>
  );
}
