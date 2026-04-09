import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Kiran's Fitness Club",
  description: "Learn about our mission, our story, and the man completely dedicated to your physical success.",
};

export default function AboutPage() {
  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-[600px] md:h-[700px] rounded-button overflow-hidden border border-border">
            <Image 
              src="/kiran-trainer.png" 
              alt="Mr. Bangalore Kiran Kumar" 
              fill 
              className="object-cover object-top"
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Our <span className="text-accent">Story</span></h1>
            <div className="space-y-6 text-text-secondary text-lg">
              <p>Founded with a simple mission: to bring professional, elite-level fitness infrastructure to Anjananagar.</p>
              <p>We realized that local residents were traveling miles just to access quality equipment and knowledgeable trainers. We changed that by building a sanctuary for fitness enthusiasts right here in the neighborhood.</p>
              
              <div className="pt-6 mt-6 border-t border-border/50">
                <h3 className="text-2xl font-bold text-white mb-2">Meet The Founder</h3>
                <p className="text-accent font-bold mb-4">Mr. Bangalore Kiran Kumar</p>
                <p>Kiran has been entirely dedicated to this fitness industry for the past 20 years. He has personally trained 4000+ members, meticulously guiding them through transformations, whilst impressively maintaining his own flawless physique continuously till now.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
