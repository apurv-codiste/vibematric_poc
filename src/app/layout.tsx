import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeMatric | One-Click Supabase Connect",
  description: "Connect your Supabase database in seconds and chat with your data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
