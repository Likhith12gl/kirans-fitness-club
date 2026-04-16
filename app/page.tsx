import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatCards from "@/components/home/StatCards";
import SchemaOrg from "@/components/seo/SchemaOrg";
import ServicePreviews from "@/components/home/ServicePreviews";
import Testimonials from "@/components/home/Testimonials";
import LocationCTA from "@/components/home/LocationCTA";

const SITE_URL = "https://kiransfitnessclub.com";

export const metadata: Metadata = {
  // Use the root layout default — no template applied for homepage
  title: "Kiran's Fitness Club | Best Gym in Anjananagar, Bangalore",
  description:
    "Join Kiran's Fitness Club in Anjananagar, Bangalore. Get premium equipment, expert trainers, and affordable membership plans. Start your fitness journey today!",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Kiran's Fitness Club | Best Gym in Anjananagar, Bangalore",
    description:
      "Join Kiran's Fitness Club in Anjananagar. Premium equipment, expert trainers, and flexible plans. Start your fitness journey today!",
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
