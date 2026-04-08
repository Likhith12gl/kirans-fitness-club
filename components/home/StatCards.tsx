export default function StatCards() {
  const stats = [
    { label: "Active Members", value: "500+" },
    { label: "Years Experience", value: "10+" },
    { label: "Expert Trainers", value: "8" },
    { label: "Sqft Facility", value: "4000+" },
  ];

  return (
    <section className="py-12 bg-surface flex flex-col justify-center border-y border-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-4xl md:text-5xl font-heading font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-text-secondary text-sm md:text-base uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
