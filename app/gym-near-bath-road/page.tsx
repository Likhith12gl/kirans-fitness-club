import LocationPageTemplate from "@/components/seo/LocationPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gym Near Bath Road, Bangalore — Kiran's Fitness Club",
  description:
    "Looking for a top gym near Bath Road, Bangalore? Kiran's Fitness Club provides elite strength equipment, dynamic CrossFit classes, and expert personal trainers in Anjananagar.",
  alternates: { canonical: "https://kirans-fitness-club.vercel.app/gym-near-bath-road" },
  openGraph: {
    title: "Gym Near Bath Road | Kiran's Fitness Club, Bangalore",
    description: "Elite gym near Bath Road, Bangalore. CrossFit, strength training, personal coaching in Anjananagar.",
    url: "https://kirans-fitness-club.vercel.app/gym-near-bath-road",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Gym Near Bath Road | Kiran's Fitness Club", description: "Top gym near Bath Road, Bangalore. Expert coaching and premium equipment at Anjananagar." },
};

export default function BathRoadPage() {
  const paragraphs = [
    "Finding the right gym near Bath Road means looking for a facility that perfectly balances high-quality equipment with a supportive training atmosphere. At Kiran's Fitness Club, we pride ourselves on being the absolute best fitness destination for residents living in and around the Bath Road stretching corridor. We removed the intimidating commercial gym vibe and replaced it with a professional, results-oriented community.",
    "Whether your goal is to build lean muscle mass, prepare for a marathon, or simply shed stubborn body fat, our gym near Bath Road has the exact infrastructure you need. Our expansive free weight zones are stocked with premium Olympic plates, dumbbells, and squat racks so you can push your strength limits safely. For cardiovascular health, our extensive array of modern treadmills and rowers guarantees you stay in the optimal fat-burning zone.",
    "Achieving peak physical health requires more than just access to equipment; it requires specialized knowledge. That is exactly what our certified personal trainers provide to our members near Bath Road. We handle everything from detailed nutritional tracking and meal planning to advanced mobility and flexibility work. We build a customized roadmap that takes the guesswork out of your fitness journey, allowing you to focus purely on the execution.",
    "Beyond individual coaching, Kiran's Fitness Club is famous for hosting the most dynamic group fitness classes near Bath Road. Step out of your comfort zone with our high-intensity interval training (HIIT), functional CrossFit circuits, and core-blasting sessions. These classes are designed to be highly engaging and motivating, ensuring you leave every single session feeling stronger, accomplished, and ready to tackle the rest of your day."
  ];

  const features = [
    "Top-rated Olympic lifting stations",
    "Expert mobility & injury prevention",
    "Intense, community-driven group classes",
    "Advanced cardio and rowing machines",
    "Custom nutritional and meal prep advice",
    "Private, secure tracking of physical progress"
  ];

  return (
    <LocationPageTemplate
      title="The Best Gym near Bath Road"
      subtitle="Experience unmatched fitness equipment and community support right in your area."
      paragraphs={paragraphs}
      features={features}
      showMap={false}
    />
  );
}
