import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatCards from "@/components/home/StatCards";
import SchemaOrg from "@/components/seo/SchemaOrg";
import ServicePreviews from "@/components/home/ServicePreviews";
import Testimonials from "@/components/home/Testimonials";
import LocationCTA from "@/components/home/LocationCTA";

const SITE_URL = "https://kirans-fitness-club.vercel.app";

export const metadata: Metadata = {
  // Use the root layout default — no template applied for homepage
  title: "Kiran's Fitness Club | Best Gym in Anjananagar, Bangalore",
  description:
    "Kiran's Fitness Club in Anjananagar, Bangalore offers premium gym facilities near Magadi Main Road and Bath Road. Expert personal trainers, modern equipment, and affordable monthly, quarterly, and annual membership plans. Join now!",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Kiran's Fitness Club | Best Gym in Anjananagar, Bangalore",
    description:
      "Premium gym in Anjananagar near Magadi Road, Bangalore. Expert trainers, modern equipment, flexible membership plans.",
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
      <LocationCTA />
    </main>
  );
}
