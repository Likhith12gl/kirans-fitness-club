"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Why is Kiran's Fitness Club considered the best gym in Anjananagar?",
      answer: "We offer the perfect blend of 20+ years of experienced coaching, brand new bio-mechanical special equipment, and a spacious 4000+ sqft facility. Unlike crowded commercial gyms, we provide personalized attention, maintaining an encouraging and welcoming community for our 70+ active members."
    },
    {
      question: "What makes your gym different from others near Magadi Road?",
      answer: "Beyond our premium equipment and highly certified trainers, we heavily focus on community and outdoor fitness. We regularly organize 'off-field' team events, weekend trekking trips, CrossFit circuits, and powerlifting meets to ensure your fitness journey is dynamic and never boring."
    },
    {
      question: "Do you offer Personal Training and customized diet plans?",
      answer: "Yes! Our certified trainers offer 1-on-1 personal coaching tailored to your exact physical goals (weight loss, muscle gain, strength training). Our 3-month, 6-month, and Annual membership plans all include custom diet planning and workout roadmaps designed for your body type."
    },
    {
      question: "Can I get a 1-day pass to try the gym before committing?",
      answer: "Absolutely. We offer a 1-Day Pass for just ₹200, which includes full gym and cardio access along with locker facilities. We want you to experience our top-notch equipment and positive environment firsthand before choosing a monthly or annual plan."
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="text-text-secondary text-lg">
            Everything you need to know about joining Anjananagar&apos;s premier fitness community.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-border rounded-button overflow-hidden transition-colors ${openIndex === index ? 'bg-surface border-accent/50' : 'bg-surface-alt hover:border-border-muted'}`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-white font-bold text-lg pr-4">{faq.question}</h3>
                <ChevronDown 
                  className={`text-accent shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={24} 
                />
              </button>
              
              <div 
                className={`px-6 pb-5 text-text-secondary overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pb-0'}`}
              >
                <div className="pt-2 border-t border-border mt-2">
                  <p className="mt-4">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* FAQ Schema for SEO injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}
