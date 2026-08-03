import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { CartProvider } from "@/context/CartContext";
import { CustomerProvider } from "@/context/CustomerContext";
import ScrollToTop from "@/components/layout/ScrollToTop";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SamArtify · Machine Embroidery Designs",
    template: "%s · SamArtify",
  },
  description:
    "Premium downloadable machine embroidery designs in DST, PES, JEF, EXP, VP3 and XXX formats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <CartProvider>
          <CustomerProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ScrollToTop />
          </CustomerProvider>
        </CartProvider>
      </body>
    </html>
  );
}
