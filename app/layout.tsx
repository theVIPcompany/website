import type { Metadata } from "next";
import { Josefin_Sans, Ubuntu, Lexend } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const default_font = Lexend({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
    title: "The Visual Identity Partners (VIP) Company",
    description: "Stand Out!"
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={default_font.className}>{children}</body>
    </html>
  );
}
