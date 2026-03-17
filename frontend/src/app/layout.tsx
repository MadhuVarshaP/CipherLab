import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const neueMachina = localFont({
  src: [
    {
      path: "../fonts/NeueMachina-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/NeueMachina-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NeueMachina-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-neue-machina",
});

export const metadata: Metadata = {
  title: "CipherLab | Privacy-Preserving Research Collaboration",
  description:
    "Securely share datasets, run computations in TEEs, and track research contributions with CipherLab.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${neueMachina.variable} ${inter.variable} ${spaceMono.variable} antialiased font-sans`}
      >
        <Providers>
          <Navbar />
          <div className="pt-16 min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

