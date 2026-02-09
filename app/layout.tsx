import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // Agar path error aaye toh ../components/Navbar use karna
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext"; // <-- STEP A: Import kiya

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MontPharmacy",
  description: "Trusted Online Medicine Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider> {/* <-- STEP B: Wrap kar diya */}
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}