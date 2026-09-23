"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";

const gelombang = [
  { name: "Gelombang 1", date: "1 Januari - 31 Maret 2026", status: "closed" },
  { name: "Gelombang 2", date: "1 April - 19 September 2026", status: "open" },
];

const steps = [
  { step: 1, title: "Kunjungi Website", desc: "Buka website admisi SiberMu" },
  { step: 2, title: "Isi Formulir", desc: "Lengkapi data diri dan dokumen" },
  { step: 3, title: "Bayar Biaya", desc: "Transfer biaya pendaftaran" },
  { step: 4, title: "Konfirmasi", desc: "Tunggu konfirmasi dari kami" },
];

const benefits = [
  "Kuliah 100% online",
  "Biaya terjangkau",
  "Bisa dicicil 2x/semester",
  "Kurikulum Kampus Merdeka",
  "Dosen berpengalaman",
  "Sertifikat resmi",
];

export default function AdmisiPage() {
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
            <h1 className="text-4xl md:text-6xl font-black mb-4">Admisi SiberMu</h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Pendaftaran Mahasiswa Baru Universitas Siber Muhammadiyah 2026/2027
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gelombang + Cara Mendaftar */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gelombang */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black mb-8 text-navy">Gelombang Pendaftaran</h2>
              <div className="space-y-4">
                {gelombang.map((g, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl p-6 border-2 ${
                      g.status === "open"
                        ? "border-teal bg-teal/5"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-navy">{g.name}</h3>
                        <p className="text-gray-600 flex items-center gap-2 mt-1 text-sm">
                          <Calendar className="w-4 h-4" />
                          {g.date}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                          g.status === "open"
                            ? "bg-teal text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {g.status === "open" ? "Dibuka" : "Ditutup"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-teal/5 rounded-2xl p-6 border border-teal/10">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-navy">
                  <Clock className="w-5 h-5 text-teal" />
                  Jadwal Penting
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal" />
                    Perkuliahan Mulai: 21 September 2026
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal" />
                    Registrasi Ulang: 1 - 20 September 2026
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Cara Mendaftar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black mb-8 text-navy">Cara Mendaftar</h2>
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal to-teal-light rounded-2xl flex items-center justify-center text-white font-bold shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-navy">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <a
                  href="https://api.whatsapp.com/send?phone=+6289531851105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href="tel:+6289531851105"
                  className="flex items-center justify-center gap-2 bg-teal text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-dark transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Telepon
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Keuntungan */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-12 text-navy">
            Keuntungan <span className="text-gradient">Kuliah di SiberMu</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 card-hover"
              >
                <CheckCircle className="w-8 h-8 text-teal mx-auto mb-3" />
                <p className="font-bold text-navy">{benefit}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Link
              href="/admisi"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold-light text-navy px-8 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105 group"
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
