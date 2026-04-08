import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    { name: "Rahul S.", text: "Best gym in Anjananagar! The equipment is top-notch and trainers are always helpful.", role: "Member for 2 years" },
    { name: "Priya M.", text: "Lost 10kg in 4 months with their personal training program. Life changing experience.", role: "Member for 6 months" },
    { name: "Karthik R.", text: "Great atmosphere, never too crowded, and the staff actually cares about your form.", role: "Member for 1 year" },
    { name: "Deepa K.", text: "The group classes are amazing. Best decision I made for my fitness journey.", role: "Member for 3 years" },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <h2 className="text-3xl md:text-5xl text-white font-heading font-bold mb-16 text-center uppercase">Success <span className="text-accent">Stories</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background p-8 rounded-button border border-border">
              <div className="flex text-accent mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-text-secondary italic mb-6">&quot;{t.text}&quot;</p>
              <div>
                <h4 className="text-white font-bold">{t.name}</h4>
                <p className="text-sm text-text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
