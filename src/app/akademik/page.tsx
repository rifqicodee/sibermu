"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const programs = [
  {
    title: "S1 PJJ Informatika",
    faculty: "Fakultas Teknologi dan Ilmu Kesehatan",
    duration: "8 Semester",
    desc: "Mempelajari pengembangan perangkat lunak, keamanan siber, kecerdasan buatan, dan teknologi informasi terkini.",
    color: "from-teal to-cyan-400",
    icon: "💻",
  },
  {
    title: "S1 PJJ Sistem Informasi",
    faculty: "Fakultas Teknologi dan Ilmu Kesehatan",
    duration: "8 Semester",
    desc: "Mengembangkan dan mengelola sistem informasi organisasi berbasis teknologi digital.",
    color: "from-violet-500 to-purple-400",
    icon: "📊",
  },
  {
    title: "S1 PJJ Administrasi Kesehatan",
    faculty: "Fakultas Teknologi dan Ilmu Kesehatan",
    duration: "8 Semester",
    desc: "Mengelola administrasi dan manajemen fasilitas pelayanan kesehatan.",
    color: "from-emerald-500 to-green-400",
    icon: "🏥",
  },
  {
    title: "S1 PJJ Hukum",
    faculty: "Fakultas Bisnis dan Humaniora",
    duration: "8 Semester",
    desc: "Mempelajari hukum Indonesia dan hukum internasional dengan pendekatan digital.",
    color: "from-orange-500 to-red-400",
    icon: "⚖️",
  },
  {
    title: "S1 PJJ Manajemen",
    faculty: "Fakultas Bisnis dan Humaniora",
    duration: "8 Semester",
    desc: "Mengelola organisasi dan bisnis dengan strategi manajemen modern.",
    color: "from-amber-500 to-yellow-400",
    icon: "📈",
  },
  {
    title: "S1 PJJ Akuntansi",
    faculty: "Fakultas Bisnis dan Humaniora",
    duration: "8 Semester",
    desc: "Mengelola keuangan, pembukuan, dan audit berbasis teknologi informasi.",
    color: "from-indigo-500 to-blue-400",
    icon: "💰",
  },
];

const faculties = [
  {
    name: "Fakultas Bisnis dan Humaniora",
    programs: ["S1 Hukum", "S1 Manajemen", "S1 Akuntansi"],
    icon: "💼",
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Fakultas Teknologi dan Ilmu Kesehatan",
    programs: ["S1 Informatika", "S1 Sistem Informasi", "S1 Administrasi Kesehatan"],
    icon: "🔬",
    color: "from-teal to-cyan-500",
  },
];

export default function AkademikPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-gradient py-32 pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4">Akademik SiberMu</h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Program studi berkualitas dengan kurikulum kampus merdeka
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 card-hover h-full flex flex-col">
                  <div
                    className={`h-32 bg-gradient-to-br ${prog.color} relative overflow-hidden flex items-center justify-center`}
                  >
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {prog.icon}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-bold text-teal bg-teal/10 px-3 py-1 rounded-full self-start mb-3">
                      {prog.faculty}
                    </span>
                    <h3 className="text-xl font-bold text-navy mb-2">{prog.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {prog.desc}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {prog.duration}
                      </span>
                      <span className="flex items-center gap-1 text-teal text-sm font-semibold group-hover:gap-2 transition-all cursor-pointer">
                        Selengkapnya <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fakultas */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-12 text-navy">
            Fakultas <span className="text-gradient">SiberMu</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faculties.map((fakultas, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 card-hover"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${fakultas.color} rounded-2xl flex items-center justify-center text-3xl`}
                  >
                    {fakultas.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy">{fakultas.name}</h3>
                </div>
                <ul className="space-y-3">
                  {fakultas.programs.map((p, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-600">
                      <BookOpen className="w-4 h-4 text-teal" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
