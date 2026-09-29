import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

const mono = Geist_Mono({
  variable: "--font-mono-src",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jinear",
  description: "Jinear",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
