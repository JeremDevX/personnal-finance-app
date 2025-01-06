import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.scss";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "A personal finance app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.className}`}>{children}</body>
    </html>
  );
}
