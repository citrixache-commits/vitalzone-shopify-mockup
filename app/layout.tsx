import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VitalZone.ro — Sănătatea Ta, Prioritatea Noastră",
  description:
    "Magazin online de produse medicale și wellness. Orteze, aparate de masaj, fitness și încălțăminte ortopedică. Livrare rapidă în toată România.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${poppins.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-[var(--font-poppins)]">
        {children}
      </body>
    </html>
  );
}
