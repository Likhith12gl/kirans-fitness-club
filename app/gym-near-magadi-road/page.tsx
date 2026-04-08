import LocationPageTemplate from "@/components/seo/LocationPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Gym Near Magadi Road | Kiran's Fitness Club",
  description: "Join the most equipped gym near Magadi Road. Achieve your fitness goals with our high-end free weights, dedicated cardio zone, and certified trainers.",
};

export default function MagadiRoadPage() {
  const paragraphs = [
    "Locating a fully equipped, professional gym near Magadi Road can be incredibly difficult, especially one that isn't overwhelmingly crowded during peak hours. At Kiran's Fitness Club, we serve as the premier fitness sanctuary for the Magadi Road and surrounding communities. By providing an expansive 4000+ sqft workout floor, we ensure that you always have access to the machines and free weights you need, right when you need them.",
    "For individuals commuting along Magadi Road, convenience and facility quality are paramount. Our gym offers an elite cardiovascular zone featuring modern treadmills, stair climbers, and elliptical machines perfect for burning fat and building endurance. Alongside this, our dedicated strength and conditioning area boasts a heavy free-weight section and imported resistance machines designed to safely maximize muscle hypertrophy and power.",
    "The fitness coaching you receive at a gym near Magadi Road should do more than just make you sweat—it should educate you. Our roster of expert personal trainers doesn't just count your reps; they fundamentally redesign your approach to health. Whether you require meticulous postural correction, specialized CrossFit functional training, or a structured diet plan mapped to your lifestyle, our trainers provide the absolute highest tier of actionable guidance.",
    "We believe that community is the cornerstone of consistency. When you join our gym near Magadi Road, you instantly gain access to an uplifting, positive environment. Our members range from beginners taking their first steps to seasoned regional powerlifters. With early morning and late night flexible hours, Kiran's Fitness Club seamlessly integrates into your daily commute, making it the perfect pitstop for your daily wellness."
  ];

  const features = [
    "Uncluttered, professional gym environment",
    "Tailored 1-on-1 personal coaching",
    "Heavy free-weight & barbell sections",
    "High-energy group aerobic classes",
    "Extended flexible operating hours",
    "Clean, spacious locker and changing rooms"
  ];

  return (
    <LocationPageTemplate
      title="The Top Gym near Magadi Road"
      subtitle="Elevate your health directly along your daily commute with elite fitness guidance."
      paragraphs={paragraphs}
      features={features}
      showMap={false}
    />
  );
}
