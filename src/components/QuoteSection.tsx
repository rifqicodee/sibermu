"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

export default function QuoteSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block text-teal font-bold text-sm tracking-wider uppercase mb-4">
            Sambutan
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-navy">
            Dari Ketua Umum{" "}
            <span className="text-gradient">PP Muhammadiyah</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal/20 to-gold/20 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-navy to-navy-light rounded-3xl p-8 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
                
                <div className="relative z-10">
                  <Quote className="w-12 h-12 text-teal-light mb-6 opacity-50" />
                  <p className="text-lg leading-relaxed mb-8 text-white/90">
                    &ldquo;SiberMu adalah jawaban atas tantangan zaman. Universitas yang dikelola dengan cara modern demi membuktikan Muhammadiyah selalu berada di depan dalam mewujudkan pendidikan bermutu.&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal to-teal-light rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      HN
                    </div>
                    <div>
                      <div className="font-bold text-lg">Prof. Dr. Haedar Nashir, M.Si.</div>
                      <div className="text-white/70 text-sm">Ketua Umum PP Muhammadiyah</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-navy mb-6">
              Komitmen Muhammadiyah dalam Pendidikan
            </h3>
            <div className="space-y-4">
              {[
                "Muhammadiyah memiliki lebih dari 164 perguruan tinggi di seluruh Indonesia",
                "Jaringan pendidikan Muhammadiyah tersebar dari tingkat dasar hingga perguruan tinggi",
                "SiberMu merupakan terobosan baru dalam dunia pendidikan tinggi Indonesia",
                "Dikelola dengan standar nasional dan visi internasional",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-teal/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-teal rounded-full" />
                  </div>
                  <p className="text-gray-600">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
