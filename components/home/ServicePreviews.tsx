import Link from "next/link";
import { Dumbbell, HeartPulse, Activity, Trophy, Users, Clock } from "lucide-react";

export default function ServicePreviews() {
  const services = [
    { icon: Dumbbell, title: "Strength Training & Muscle Building", desc: "Premium free weights and resistance machines for serious gains." },
    { icon: HeartPulse, title: "Weight Loss Programs Near You", desc: "Burn fat with our dedicated cardio zones and expert routines." },
    { icon: Users, title: "Group Fitness Classes", desc: "High-energy sessions led by Bangalore's best experts." },
    { icon: Trophy, title: "Personal Training in Anjananagar", desc: "1-on-1 coaching to hit your exact fitness goals." },
    { icon: Activity, title: "CrossFit & Functional", desc: "Dynamic workouts for real-world strength and stamina." },
    { icon: Clock, title: "Flexible Gym Timings", desc: "Open early and late to fit your busy Bangalore schedule." },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-white font-heading font-bold mb-4 uppercase">Our <span className="text-accent">Facilities</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Everything you need to build the body you want.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={i} className="card p-8 group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl text-white font-bold mb-3">{service.title}</h3>
                <p className="text-text-secondary">{service.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-secondary inline-block">Explore All Services</Link>
        </div>
      </div>
    </section>
  );
}
