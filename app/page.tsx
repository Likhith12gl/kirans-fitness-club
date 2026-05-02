import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatCards from "@/components/home/StatCards";
import SchemaOrg from "@/components/seo/SchemaOrg";
import ServicePreviews from "@/components/home/ServicePreviews";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import LocationCTA from "@/components/home/LocationCTA";

const SITE_URL = "https://kiransfitnessclub.in";

export const metadata: Metadata = {
  // Use the root layout default — no template applied for homepage
  title: "Kiran's Fitness Club — Best Gym in Anjananagar, Bangalore | Free Trial",
  description:
    "Join Anjananagar's top-rated gym. Personal training, weight loss programs & strength coaching. 500+ members. Walk in for a FREE trial today!",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Kiran's Fitness Club — Best Gym in Anjananagar, Bangalore | Free Trial",
    description:
      "Join Anjananagar's top-rated gym. Personal training, weight loss programs & strength coaching. 500+ members. Walk in for a FREE trial today!",
    url: SITE_URL,
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <SchemaOrg />
      <HeroSection />
      <StatCards />
      <ServicePreviews />
      <Testimonials />
      <FAQ />
      <LocationCTA />
    </main>
  );
}
