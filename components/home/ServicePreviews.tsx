import Link from "next/link";
import { Dumbbell, HeartPulse, Activity, Trophy, Users, Clock } from "lucide-react";

export default function ServicePreviews() {
  const services = [
    { icon: Dumbbell, title: "Weight Training", desc: "Premium free weights and resistance machines." },
    { icon: HeartPulse, title: "Cardio Zone", desc: "Treadmills, ellipticals, and rowers." },
    { icon: Users, title: "Group Classes", desc: "High-energy sessions led by experts." },
    { icon: Trophy, title: "Personal Training", desc: "1-on-1 coaching to hit your goals." },
    { icon: Activity, title: "CrossFit", desc: "Functional fitness for all levels." },
    { icon: Clock, title: "Flexible Hours", desc: "Open early and late to fit your schedule." },
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
