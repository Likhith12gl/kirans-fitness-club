import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gym Membership Plans & Pricing — Monthly, Quarterly, Annual",
  description:
    "Affordable gym membership plans at Kiran's Fitness Club, Anjananagar. Monthly (₹1,500), Quarterly (₹4,000), and Annual (₹12,000) plans with personal training and group classes in Bangalore.",
  alternates: { canonical: "https://kiransfitnessclub.com/services" },
  openGraph: {
    title: "Gym Membership Plans & Pricing | Kiran's Fitness Club",
    description: "Affordable gym plans in Anjananagar, Bangalore — Monthly ₹1,500, Quarterly ₹4,000, Annual ₹12,000. Personal training and group classes included.",
    url: "https://kiransfitnessclub.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gym Membership Pricing | Kiran's Fitness Club, Bangalore",
    description: "Monthly, Quarterly, and Annual gym plans in Anjananagar, Bangalore. No hidden fees.",
  },
};

export default function ServicesPage() {
  const plans = [
    {
      name: "1 Day Pass",
      price: "₹200",
      period: "/ day",
      popular: false,
      features: ["Gym + Cardio included", "One-time entry", "Locker facility"],
    },
    {
      name: "1 Month",
      price: "₹1,500",
      period: "/ month",
      popular: false,
      features: ["Gym + Cardio included", "Locker facility", "General diet plan"],
    },
    {
      name: "3 Months",
      price: "₹3,000",
      period: "/ 3 months",
      popular: true,
      features: ["Gym + Cardio included", "Locker facility", "Custom diet plan"],
    },
    {
      name: "6 Months",
      price: "₹5,000",
      period: "/ 6 months",
      popular: false,
      features: ["Gym + Cardio included", "Premium locker", "Custom diet & workout plan"],
    },
    {
      name: "12 Months",
      price: "₹8,000",
      period: "/ 1 year + 1 MONTH FREE",
      popular: false,
      features: ["13 Months Gym + Cardio Access", "Premium locker", "Custom diet & workout plan"],
    },
  ];

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Our <span className="text-accent">Memberships</span></h1>
          <p className="text-text-secondary text-lg">Choose a plan that fits your goals. No hidden fees, no complicated contracts. Just pure fitness.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {plans.map((plan, i) => (
            <div key={i} className={`card p-8 relative flex flex-col ${plan.popular ? 'border-accent shadow-[0_0_15px_rgba(245,197,24,0.15)]' : 'border-border'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-background font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl text-white font-heading font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-accent">{plan.price}</span>
                <span className="text-text-secondary">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={plan.popular ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}>
                Join Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
