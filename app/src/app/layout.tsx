import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "@/components/session-wrapper";
import SessionCheck from "@/components/SessionCheck";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

// mondogb setup
import { connectDB } from "@/db/connect";
connectDB();

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "All.Ai",
  description: "Multi modal AI app client",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionWrapper>
            <SessionCheck>
              {children}
            </SessionCheck>
          </SessionWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
