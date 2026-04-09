"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 overflow-hidden bg-black"
      >
        <motion.div 
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="w-full h-full relative"
        >
          <Image
            src="/gym-bg.png"
            alt="Kiran's Fitness Club interior"
            fill
            priority
            quality={100}
            className="object-cover"
          />
        </motion.div>
        
        {/* Advanced Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0A0A0A_100%)] opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-accent/5 mix-blend-overlay pointer-events-none" />
      </motion.div>

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
