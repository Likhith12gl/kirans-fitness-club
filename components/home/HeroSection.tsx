"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Kiran's Fitness Club interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/80 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16"
      >
        <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 uppercase tracking-tight">
          Transform Your <span className="text-accent">Physique</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto font-light">
          Anjananagar&apos;s premier fitness destination. Experience elite equipment, expert guidance, and a community that pushes you further.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/services" className="btn-primary w-full sm:w-auto px-8 py-4 text-lg">
            View Memberships
          </Link>
          <Link href="/contact" className="btn-secondary w-full sm:w-auto px-8 py-4 text-lg bg-white/5 border-white/10 hover:bg-white/10 text-white">
            Free Trial Class
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
