"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, GraduationCap } from "lucide-react";

const navLinks = [
  { name: "Beranda", path: "/" },
  {
    name: "Profil",
    path: "/profil",
    children: [
      { name: "Visi & Misi", path: "/profil#visi-misi" },
      { name: "Sejarah", path: "/profil#sejarah" },
      { name: "Akreditasi", path: "/profil#akreditasi" },
    ],
  },
  { name: "Akademik", path: "/akademik" },
  { name: "Admisi", path: "/admisi" },
  { name: "Kampus Virtual", path: "https://sibermu.ac.id/versimu/", external: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-xl shadow-2xl shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-teal to-teal-light rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              Siber<span className="text-gold">Mu</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.external ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.path}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    {link.name}
                    {link.children && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                )}

                <AnimatePresence>
                  {link.children && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-56 bg-navy-light/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.path}
                          className="block px-4 py-3 text-sm text-white/80 hover:bg-teal/20 hover:text-teal-light transition-colors font-medium"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/admisi"
            className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold-light text-navy px-6 py-3 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
          >
            <GraduationCap className="w-4 h-4" />
            Daftar Sekarang
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-navy/98 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 rounded-lg text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.path}
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 rounded-lg text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.path}
                          onClick={closeMobileMenu}
                          className="block px-4 py-2 text-sm text-white/60 hover:text-teal-light transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/admisi"
                onClick={closeMobileMenu}
                className="block text-center bg-gradient-to-r from-gold to-gold-light text-navy px-6 py-3 rounded-full text-sm font-bold mt-4"
              >
                Daftar Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
