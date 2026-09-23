import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Universitas Siber Muhammadiyah (SiberMu)",
  description:
    "Universitas Siber pertama dari Muhammadiyah. Raih gelar sarjana Anda dengan sistem Pembelajaran Jarak Jauh (PJJ) yang modern, interaktif, dan terjangkau.",
  keywords: [
    "Universitas Siber Muhammadiyah",
    "SiberMu",
    "Kuliah Online",
    "PJJ",
    "Pendidikan Tinggi",
    "Muhammadiyah",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
