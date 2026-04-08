import HeroSection from "@/components/home/HeroSection";
import StatCards from "@/components/home/StatCards";
import SchemaOrg from "@/components/seo/SchemaOrg";
import ServicePreviews from "@/components/home/ServicePreviews";
import Testimonials from "@/components/home/Testimonials";
import LocationCTA from "@/components/home/LocationCTA";

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
