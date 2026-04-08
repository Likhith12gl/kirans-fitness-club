import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Kiran's Fitness Club",
  description: "Learn about our mission, our story, and meet the expert trainers at Kiran's Fitness Club.",
};

export default function AboutPage() {
  const trainers = [
    { name: "Kiran Kumar", role: "Head Coach & Founder", exp: "15+ Years", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop" },
    { name: "Anita S.", role: "CrossFit Specialist", exp: "8 Years", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2000&auto=format&fit=crop" },
    { name: "Vikram M.", role: "Strength & Conditioning", exp: "6 Years", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" },
  ];

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[500px] rounded-button overflow-hidden border border-border">
            <Image 
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" 
              alt="Gym floor" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Our <span className="text-accent">Story</span></h1>
            <div className="space-y-4 text-text-secondary text-lg">
              <p>Founded in 2014, Kiran&apos;s Fitness Club started with a simple mission: to bring professional, elite-level fitness infrastructure to Anjananagar.</p>
              <p>We realized that local residents were traveling miles just to access quality equipment and knowledgeable trainers. We changed that by building a 4000+ sqft sanctuary for fitness enthusiasts right here in the neighborhood.</p>
              <p>Today, with over 500 active members, we&apos;re more than just a gym. We&apos;re a community of individuals dedicated to pushing their limits and transforming their lives.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 uppercase">Meet The <span className="text-accent">Experts</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Certified professionals dedicated to your success.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((trainer, i) => (
            <div key={i} className="card overflow-hidden group">
              <div className="relative h-80 w-full overflow-hidden">
                <Image 
                  src={trainer.img} 
                  alt={trainer.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl text-white font-bold mb-1">{trainer.name}</h3>
                <p className="text-accent font-medium mb-3">{trainer.role}</p>
                <p className="text-text-secondary text-sm">Experience: {trainer.exp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
