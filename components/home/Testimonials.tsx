import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Anilmanasa 24",
      role: "Member",
      text: "I recently joined this new gym, and I’m honestly impressed! The equipment is brand new, modern, and top quality. The coach is super friendly, helpful, knowledgeable and motivating. Highly recommend!",
    },
    {
      name: "Hemanth Kumar",
      role: "Member",
      text: "This gym offers a well-maintained facility and a positive workout environment. The trainer is approachable, experienced, and provides personalized attention to help achieve fitness goals. Their guidance on form and diet has made a big difference.",
    },
    {
      name: "Mohit R",
      role: "Member",
      text: "Great place to workout! Trainer is the best thing about the place here. Feels like you have taken personal training even though with no extra fees. Must join to everyone and it’s affordable as well.",
    },
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
