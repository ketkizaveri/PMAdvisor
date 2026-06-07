import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PMAdvisor",
  description: "Product management guidance grounded in trusted references.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
