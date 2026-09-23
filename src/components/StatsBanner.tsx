"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Award, Network } from "lucide-react";

const stats = [
  {
    icon: Shield,
    title: "Izin Operasional",
    desc: "Mendikbudristek No. 430/E/O/2021",
  },
  {
    icon: Award,
    title: "Akreditasi: BAIK",
    desc: "Badan Akreditasi Nasional Perguruan Tinggi",
  },
  {
    icon: Network,
    title: "164+ Jaringan",
    desc: "Perguruan Tinggi Muhammadiyah",
  },
];

export default function StatsBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative bg-gradient-to-r from-teal-dark via-teal to-teal-dark py-6 overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">{stat.title}</div>
                <div className="text-white/70 text-xs">{stat.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
