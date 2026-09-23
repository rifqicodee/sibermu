"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    title: "S1 Informatika",
    desc: "Mempelajari pengembangan perangkat lunak, jaringan, keamanan siber, dan kecerdasan buatan.",
    color: "from-teal to-cyan-400",
    icon: "💻",
  },
  {
    title: "S1 Sistem Informasi",
    desc: "Mengembangkan dan mengelola sistem informasi organisasi berbasis teknologi digital.",
    color: "from-violet-500 to-purple-400",
    icon: "📊",
  },
  {
    title: "S1 Administrasi Kesehatan",
    desc: "Mengelola administrasi dan manajemen fasilitas pelayanan kesehatan.",
    color: "from-emerald-500 to-green-400",
    icon: "🏥",
  },
  {
    title: "S1 Hukum",
    desc: "Mempelajari hukum Indonesia dan hukum internasional dengan pendekatan digital.",
    color: "from-orange-500 to-red-400",
    icon: "⚖️",
  },
  {
    title: "S1 Manajemen",
    desc: "Mengelola organisasi dan bisnis dengan strategi manajemen modern.",
    color: "from-amber-500 to-yellow-400",
    icon: "📈",
  },
  {
    title: "S1 Akuntansi",
    desc: "Mengelola keuangan, pembukuan, dan audit berbasis teknologi informasi.",
    color: "from-indigo-500 to-blue-400",
    icon: "💰",
  },
];

export default function Programs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-teal font-bold text-sm tracking-wider uppercase mb-4">
            Program Studi
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-6">
            Program Studi S1{" "}
            <span className="text-gradient">Pembelajaran Jarak Jauh (PJJ)</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tersedia 6 program studi sarjana yang dirancang untuk masa depan
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 card-hover h-full flex flex-col">
                <div className={`h-40 bg-gradient-to-br ${program.color} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {program.icon}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-navy mb-3">{program.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{program.desc}</p>
                  <div className="flex items-center gap-2 text-teal text-sm font-semibold group-hover:gap-3 transition-all cursor-pointer pt-4 border-t border-gray-100">
                    Pelajari
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
