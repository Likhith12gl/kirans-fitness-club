import LocationPageTemplate from "@/components/seo/LocationPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Gym in Anjananagar, Bangalore — Kiran's Fitness Club",
  description:
    "Looking for the best gym in Anjananagar? Kiran's Fitness Club offers world-class equipment, certified personal trainers, and group fitness classes near Magadi Main Road. Join today!",
  alternates: { canonical: "https://kiransfitnessclub.com/gym-in-anjananagar" },
  openGraph: {
    title: "Best Gym in Anjananagar | Kiran's Fitness Club",
    description: "World-class equipment, certified trainers, and group fitness classes in Anjananagar, Bangalore.",
    url: "https://kiransfitnessclub.com/gym-in-anjananagar",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Best Gym in Anjananagar | Kiran's Fitness Club", description: "World-class facilities and expert trainers in Anjananagar, Bangalore." },
};

export default function AnjananagarPage() {
  const paragraphs = [
    "If you're searching for the premier gym in Anjananagar, Kiran's Fitness Club is your ultimate destination. We understand that finding a workout environment that balances state-of-the-art facilities with a welcoming community can be difficult. That's why we built our 4000+ sqft facility right in the heart of Anjananagar, making fitness highly accessible for all local residents.",
    "Our fitness center in Anjananagar is fully equipped with everything you need to succeed, regardless of your experience level. From extensive free weight zones and advanced resistance machines to dedicated cardiovascular areas outfitted with the latest treadmills and ellipticals, we ensure you never have to wait to get your workout done. Unlike overcrowded commercial gyms, we strictly maintain a comfortable capacity so you can focus entirely on your training.",
    "What truly separates the best gym in Anjananagar from the rest is the quality of coaching. Our certified personal trainers specialize in hyper-focused regimes spanning strength conditioning, fat loss, CrossFit basics, and functional mobility. We don't believe in one-size-fits-all routines. Instead, our team takes the time to map out bespoke workout and nutritional regimens that align perfectly with your body type and lifestyle.",
    "Beyond individual training, Kiran's Fitness Club hosts the most electric group fitness classes in Anjananagar. Whether you want to burn serious calories in high-intensity interval training (HIIT), build explosive power, or improve your core stability, our daily class schedule caters to every preference. We operate with flexible hours from early morning to late evening, so no matter how busy your daily routine is here in Anjananagar, you can always make time for your health."
  ];

  const features = [
    "Premium imported strength equipment",
    "Certified expert personal trainers",
    "Dynamic daily group fitness classes",
    "Dedicated cardio & stretching zones",
    "Spacious, hygienic locker facilities",
    "Tailored diet and nutritional tracking"
  ];

  return (
    <LocationPageTemplate
      title="The Premier Gym in Anjananagar"
      subtitle="Transform your body right in your neighborhood with world-class equipment and expert coaching."
      paragraphs={paragraphs}
      features={features}
      showMap={true}
    />
  );
}
