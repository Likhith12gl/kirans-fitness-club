import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = "https://kiransfitnessclub.com";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kiran's Fitness Club | Best Gym in Anjananagar, Bangalore",
    // Pages must NOT already include "Kiran's Fitness Club" — template appends it
    template: "%s | Kiran's Fitness Club",
  },
  description:
    "Kiran's Fitness Club — Anjananagar's most trusted gym near Magadi Main Road, Bangalore. Expert personal trainers, modern equipment, affordable membership plans. Join today!",
  keywords: [
    "gym in Anjananagar",
    "best gym Bangalore",
    "gym near Magadi Road",
    "gym near Bath Road Bangalore",
    "gym near Rajajinagar",
    "fitness club Bangalore",
    "personal trainer Anjananagar",
    "Kiran's Fitness Club",
    "gym membership Bangalore",
  ],
  authors: [{ name: "Kiran's Fitness Club", url: SITE_URL }],
  creator: "Kiran's Fitness Club",
  publisher: "Kiran's Fitness Club",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Kiran's Fitness Club",
    title: "Kiran's Fitness Club | Best Gym in Anjananagar, Bangalore",
    description:
      "Kiran's Fitness Club — Anjananagar's most trusted gym near Magadi Main Road, Bangalore. Expert personal trainers, modern equipment, affordable plans.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Kiran's Fitness Club — Best Gym in Anjananagar, Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiran's Fitness Club | Best Gym in Anjananagar, Bangalore",
    description:
      "Anjananagar's most trusted gym. Expert trainers, modern equipment, affordable plans near Magadi Main Road, Bangalore.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
