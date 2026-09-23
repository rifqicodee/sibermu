"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Clock, Users, Coins } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Kuliah Online",
    desc: "Pembelajaran online yang efektif dan inovatif. Akses materi kapan saja dan di mana saja.",
    color: "from-teal to-teal-light",
    bgColor: "bg-teal/10",
  },
  {
    icon: Clock,
    title: "Sangat Fleksibel",
    desc: "Belajar kapan pun dan di mana pun Anda berada. Sesuaikan dengan jadwal Anda.",
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Terbimbing",
    desc: "Sistem pembelajaran mandiri namun tetap dalam bimbingan dosen pakar.",
    color: "from-emerald-500 to-green-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Coins,
    title: "Biaya Terjangkau",
    desc: "Biaya kuliah sangat terjangkau dan dapat dicicil. Investasi masa depan yang bijak.",
    color: "from-gold to-gold-light",
    bgColor: "bg-gold/10",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-teal font-bold text-sm tracking-wider uppercase mb-4">
            Keunggulan
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-6">
            Mengapa Memilih{" "}
            <span className="text-gradient">SiberMu?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai keunggulan yang membuat SiberMu menjadi pilihan tepat untuk pendidikan tinggi Anda
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 card-hover overflow-hidden h-full">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full`} />
                
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <feature.icon className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text`} style={{ color: "currentColor" }} />
                </div>

                <h3 className="text-xl font-bold text-navy mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
