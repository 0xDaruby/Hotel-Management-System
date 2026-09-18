import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";

import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "XYZ Hotel | A quieter way to arrive",
  description:
    "Discover the hotel, compare room categories and begin a clear path to booking and My Stay.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
