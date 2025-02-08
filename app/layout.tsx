import localFont from "next/font/local";
import { ThemeProvider } from 'next-themes'
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
    <SmartWillProvider>
      <html lang="en" >
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
         
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SmartWillProvider>
  );
}
