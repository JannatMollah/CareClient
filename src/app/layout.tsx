import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Care.xyz - Care Services Platform",
  description: "Reliable and trusted care services for children, elderly, and family members.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${outfit.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        <AuthProvider>
          <Navbar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
