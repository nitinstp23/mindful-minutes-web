import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindful Minutes",
  description: "Track your meditation sessions and build a mindful habit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${montserrat.variable} ${geistMono.variable} antialiased`}
        >
          <header className="fixed top-0 right-0 p-4 z-50">
            <SignedIn>
              <div className="flex items-center gap-4">
                <div className="border-2 border-emerald-600 rounded-full bg-white flex items-center justify-center">
                  <UserButton />
                </div>
              </div>
            </SignedIn>
          </header>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
