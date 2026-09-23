"use client";

import { motion } from "framer-motion";
import { Shield, Award, Users, Target, Eye } from "lucide-react";

const visiMisi = {
  visi:
    "Menjadi universitas unggul dalam penyelenggaraan pendidikan tinggi berbasis siber yang berkualitas, berkemajuan, dan bermartabat.",
  misi: [
    "Menyelenggarakan pendidikan tinggi berbasis siber yang berkualitas dan inovatif",
    "Mengembangkan penelitian yang relevan dengan kebutuhan masyarakat",
    "Melaksanakan pengabdian kepada masyarakat melalui pemanfaatan teknologi",
    "Membina kerjasama dengan berbagai pihak untuk peningkatan mutu pendidikan",
  ],
};

const timeline = [
  { year: "2021", title: "Izin Operasional", desc: "Mendapatkan izin operasional dari Mendikbudristek No. 430/E/O/2021" },
  { year: "2022", title: "Peluncuran Kampus Virtual", desc: "Resmi melaunching kampus virtual SiberMu" },
  { year: "2023", title: "Pembukaan Program Studi", desc: "Membuka 6 program studi sarjana" },
  { year: "2025", title: "Akreditasi BAIK", desc: "Berhasil meraih akreditasi BAIK dari BAN-PT" },
];

export default function ProfilPage() {
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
            <h1 className="text-4xl md:text-6xl font-black mb-4">Profil SiberMu</h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Universitas Siber Muhammadiyah - Universitas online pertama di Indonesia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visi Misi */}
      <section id="visi-misi" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-teal" />
                <h2 className="text-3xl font-black text-navy">Visi</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg bg-gray-50 rounded-2xl p-8 border border-gray-100">
                {visiMisi.visi}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-gold" />
                <h2 className="text-3xl font-black text-navy">Misi</h2>
              </div>
              <div className="space-y-4">
                {visiMisi.misi.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold">
                      {i + 1}
                    </div>
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section id="sejarah" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-12 text-navy">
            Sejarah <span className="text-gradient">SiberMu</span>
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-teal/20" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-teal rounded-full border-4 border-white shadow-lg" />
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : ""} ml-12 md:ml-0`}>
                  <div className="inline-block bg-teal text-white text-sm font-bold px-4 py-1 rounded-full mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Akreditasi */}
      <section id="akreditasi" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-12 text-navy">
            Akreditasi <span className="text-gradient">& Legalitas</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Izin Operasional", desc: "Keputusan Mendikbudristek No. 430/E/O/2021" },
              { icon: Award, title: "Akreditasi BAIK", desc: "Dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT)" },
              { icon: Users, title: "PP Muhammadiyah", desc: "Didukung penuh oleh Pimpinan Pusat Muhammadiyah" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 card-hover"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal to-teal-light rounded-2xl flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
