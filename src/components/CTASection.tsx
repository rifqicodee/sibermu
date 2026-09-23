"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Download, Calendar, GraduationCap } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-navy">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-teal-dark/30 to-navy" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm text-gold px-4 py-2 rounded-full text-sm font-semibold border border-gold/30 mb-6">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Pendaftaran Dibuka
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Pendaftaran Mahasiswa Baru TA 2026/2027 Telah Dibuka!
            </h2>
            
            <p className="text-white/80 text-lg mb-8">
              Perkuliahan Mulai 21 September 2026. Jangan lewatkan kesempatan ini untuk menjadi bagian dari kampus virtual terdepan di Indonesia.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <Calendar className="w-5 h-5 text-gold" />
                <div>
                  <div className="text-xs text-white/60">Batas Pendaftaran</div>
                  <div className="text-sm font-bold text-white">19 September 2026</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <GraduationCap className="w-5 h-5 text-gold" />
                <div>
                  <div className="text-xs text-white/60">Perkuliahan Mulai</div>
                  <div className="text-sm font-bold text-white">21 September 2026</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/admisi"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold-light text-navy px-8 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105 group"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300">
                <Download className="w-5 h-5" />
                Unduh Brosur
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 to-teal/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">6 Program Studi Tersedia</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Informatika", icon: "💻" },
                    { name: "Sistem Informasi", icon: "📊" },
                    { name: "Adm. Kesehatan", icon: "🏥" },
                    { name: "Hukum", icon: "⚖️" },
                    { name: "Manajemen", icon: "📈" },
                    { name: "Akuntansi", icon: "💰" },
                  ].map((prog) => (
                    <div
                      key={prog.name}
                      className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors"
                    >
                      <span className="text-xl">{prog.icon}</span>
                      <span className="text-sm font-medium">{prog.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
