"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-teal-dark/20 to-navy" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-teal/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[150px]" />
        </div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      {/* Floating Decorations */}
      <div className="absolute top-32 right-20 animate-float hidden lg:block">
        <div className="w-16 h-16 bg-teal/20 backdrop-blur-sm rounded-2xl rotate-12 flex items-center justify-center border border-teal/30">
          <Sparkles className="w-8 h-8 text-teal-light" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float-slow hidden lg:block">
        <div className="w-20 h-20 bg-gold/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-gold/30">
          <Play className="w-8 h-8 text-gold ml-1" />
        </div>
      </div>
      <div className="absolute top-1/2 right-[30%] animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl rotate-45 flex items-center justify-center border border-white/10">
          <div className="w-3 h-3 bg-teal-light rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-teal/10 backdrop-blur-sm text-teal-light px-4 py-2 rounded-full text-sm font-semibold border border-teal/20 mb-8"
            >
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Penerimaan Mahasiswa Baru 2026/2027
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6"
            >
              Pendidikan Tinggi{" "}
              <span className="text-gradient">Fleksibel</span>{" "}
              Tanpa Batas Ruang dan Waktu
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed"
            >
              Universitas Siber pertama dari Muhammadiyah. Raih gelar sarjana Anda dengan sistem
              Pembelajaran Jarak Jauh (PJJ) yang modern, interaktif, dan terjangkau.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/admisi"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold-light text-navy px-8 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105 group"
              >
                Pendaftaran 2026/2027
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://sibermu.ac.id/versimu/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                Jelajahi Kampus Virtual
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Decorative Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Glow Background */}
              <div className="absolute -inset-8 bg-gradient-to-r from-teal/30 to-gold/20 rounded-3xl blur-2xl opacity-50" />
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 animate-float">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal to-teal-light rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <div>
                      <div className="text-white font-bold">SiberMu</div>
                      <div className="text-white/60 text-xs">Universitas Siber Muhammadiyah</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { label: "Program Studi", value: "6 Program S1" },
                      { label: "Jaringan PT", value: "164+ Perguruan Tinggi" },
                      { label: "Akreditasi", value: "BAIK" },
                      { label: "Kampus", value: "100% Online" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <span className="text-white/60 text-sm">{item.label}</span>
                        <span className="text-white font-semibold text-sm">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
