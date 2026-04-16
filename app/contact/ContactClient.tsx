"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">
            Get In <span className="text-accent">Touch</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Have questions about our gym memberships, personal training, or facilities? Drop us a line or visit us at our Anjananagar location directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="card p-8">
              <h2 className="text-2xl text-white font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex shrink-0 items-center justify-center text-accent">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Gym Location</h3>
                    <p className="text-text-secondary">
                      #123, Magadi Main Road, Anjananagar<br />Bangalore, Karnataka 560091
                    </p>
                    <p className="text-text-secondary text-sm mt-1">Near Bath Road junction, Rajajinagar area</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex shrink-0 items-center justify-center text-accent">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Phone / WhatsApp</h3>
                    <a href="tel:+919019688582" className="text-text-secondary hover:text-accent transition">+91 90196 88582</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex shrink-0 items-center justify-center text-accent">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Email</h3>
                    <a href="mailto:contact@kiransfitness.com" className="text-text-secondary hover:text-accent transition">contact@kiransfitness.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex shrink-0 items-center justify-center text-accent">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Opening Hours</h3>
                    <p className="text-text-secondary">
                      Mon–Sat: 5:30 AM – 10:00 PM<br />Sunday: 6:00 AM – 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <h2 className="text-2xl text-white font-bold mb-6">Send a Message</h2>

            {status === "success" && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-button mb-6">
                Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">First Name</label>
                  <input type="text" required className="w-full bg-surface-alt border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Last Name</label>
                  <input type="text" required className="w-full bg-surface-alt border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Phone Number</label>
                <input type="tel" required className="w-full bg-surface-alt border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="+91 90000 00000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Message</label>
                <textarea required rows={4} className="w-full bg-surface-alt border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" disabled={status === "loading"} className="btn-primary w-full mt-4 py-3">
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="relative z-0 h-[400px] w-full rounded-button overflow-hidden border border-border">
          <iframe
            src="https://maps.google.com/maps?q=Kiran%27s+Fitness+Club+Anjananagar&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kiran's Fitness Club location on Google Maps"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
