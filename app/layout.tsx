import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CyberCanvas from "@/components/3d/CyberCanvas";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030612",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "SAMANVAYA 2.0 — THE AWAKENING | NIE MCA Fest",
  description:
    "Official festival portal for SAMANVAYA 2.0 — The Awakening, presented by the Department of Master of Computer Applications (MCA), The National Institute of Engineering (NIE), Mysuru. Four Events. Infinite Possibilities.",
  keywords: [
    "Samanvaya 2.0",
    "NIE Mysuru",
    "MCA Fest",
    "The National Institute of Engineering",
    "Reel Campus",
    "Prompting the Image",
    "Treasure Hunt",
    "Kairos",
    "Tech Fest 2026",
  ],
  authors: [{ name: "NIE MCA Department" }],
  openGraph: {
    title: "SAMANVAYA 2.0 — THE AWAKENING",
    description: "Four Events. Infinite Possibilities. One Unforgettable Fest at NIE North Campus, Mysuru.",
    type: "website",
    locale: "en_IN",
    siteName: "SAMANVAYA 2.0 Fest Portal",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#030612] text-gray-100 antialiased selection:bg-[#00f3ff]/30 selection:text-white">
        {/* Ambient 3D Particle Canvas Background */}
        <CyberCanvas />

        {/* Sticky Cyber Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Global Footer (Strictly without mobile numbers) */}
        <Footer />

        {/* Notification Toasts */}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#091029",
              border: "1px solid #182752",
              color: "#ffffff",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            },
          }}
        />
      </body>
    </html>
  );
}
