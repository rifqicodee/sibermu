"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const quickLinks = [
  { name: "Beranda", path: "/" },
  { name: "Profil", path: "/profil" },
  { name: "Admisi", path: "/admisi" },
  { name: "Akademik", path: "/akademik" },
];

const programs = [
  "S1 Informatika",
  "S1 Sistem Informasi",
  "S1 Administrasi Kesehatan",
  "S1 Hukum",
  "S1 Manajemen",
  "S1 Akuntansi",
];

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon fill="#fff" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
);

const socials = [
  { icon: FacebookIcon, href: "https://www.facebook.com/sibermu", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/sibermu/", label: "Instagram" },
  { icon: YoutubeIcon, href: "https://www.youtube.com/channel/UCeyzSDwnAzK3Hfza5hMcICw", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-4">
              Siber<span className="text-gold">Mu</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Universitas Siber Muhammadiyah - Universitas online pertama di Indonesia yang didukung penuh oleh Muhammadiyah.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-white/60 hover:text-white flex items-center gap-2 text-sm transition-colors group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://sibermu.ac.id/berita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white flex items-center gap-2 text-sm transition-colors group"
                >
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Berita
                </a>
              </li>
              <li>
                <a
                  href="https://sibermu.ac.id/karir/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white flex items-center gap-2 text-sm transition-colors group"
                >
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Karir
                </a>
              </li>
              <li>
                <a
                  href="https://sibermu.ac.id/repository/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white flex items-center gap-2 text-sm transition-colors group"
                >
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Repository
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-bold mb-6">Program Studi</h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program}>
                  <span className="text-white/60 text-sm hover:text-white transition-colors cursor-pointer">
                    {program}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-5 h-5 text-teal-light shrink-0 mt-0.5" />
                <span>Jalan HOS Cokroaminoto No. 17, Kota Yogyakarta, DIY 55253</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-5 h-5 text-teal-light shrink-0" />
                <span>+6289531851105</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-5 h-5 text-teal-light shrink-0" />
                <span>humas@sibermu.ac.id</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; 2026 Universitas Siber Muhammadiyah. All Rights Reserved.
          </p>
          <p className="text-white/40 text-sm">
            Izin Operasional: Keputusan Mendikbudristek No 430/E/O/2021 | Akreditasi: BAIK
          </p>
        </div>
      </div>
    </footer>
  );
}
