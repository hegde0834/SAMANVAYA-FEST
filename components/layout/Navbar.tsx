"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Shield, Users, Sword } from "lucide-react";
import AnimeAudioToggle from "./AnimeAudioToggle";
import { animeAudio } from "@/lib/audio";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", kanji: "ホーム", href: "/" },
    { label: "About", kanji: "概要", href: "/#about" },
    { label: "Arena", kanji: "競技", href: "/#events" },
    { label: "Code", kanji: "規約", href: "/#rules" },
  ];

  const handleNavClick = () => {
    animeAudio.playClickSound();
  };

  const handleHover = () => {
    animeAudio.playHoverSound();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030612]/90 backdrop-blur-md border-b border-[#182752] shadow-[0_4px_30px_rgba(0,0,0,0.7)] py-2.5"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Anime Kanji */}
          <Link
            href="/"
            onClick={handleNavClick}
            onMouseEnter={handleHover}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#00f3ff] rounded-lg p-1"
            aria-label="SAMANVAYA 2.0 Home"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#00f3ff] via-[#9d4edd] to-[#ff007f] p-0.5 flex items-center justify-center shadow-neon-cyan group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <div className="w-full h-full bg-[#030612] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="font-kanji absolute text-[18px] font-black text-white/10 group-hover:text-cyan-400/20 transition-colors">
                  覚
                </span>
                <Sparkles className="w-5 h-5 text-[#00f3ff] animate-pulse relative z-10" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-anime font-black text-lg sm:text-xl tracking-wider text-white group-hover:text-[#00f3ff] transition-colors">
                  SAMANVAYA <span className="text-[#00f3ff] glow-text-cyan">2.0</span>
                </span>
                <span className="font-kanji text-[10px] px-1.5 py-0.5 rounded bg-[#ff007f]/20 border border-[#ff007f]/40 text-[#ff85a2] font-bold">
                  覚醒
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase font-mono text-cyan-400/80 font-semibold flex items-center gap-1">
                <span>NIE MCA FEST</span>
                <span className="text-gray-500">•</span>
                <span className="font-kanji text-gray-400 text-[9px]">サマンバヤ</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  onMouseEnter={handleHover}
                  className={`text-sm font-semibold tracking-wide transition-all relative py-1 focus:outline-none flex flex-col items-center group ${
                    isActive ? "text-[#00f3ff]" : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="font-kanji text-[9px] text-gray-400 group-hover:text-cyan-300 transition-colors -mb-1">
                    {link.kanji}
                  </span>
                  <span>{link.label}</span>
                  {isActive ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00f3ff] shadow-[0_0_10px_#00f3ff]" />
                  ) : (
                    <span className="absolute -bottom-1 left-1/2 right-1/2 h-0.5 bg-[#ff007f] opacity-0 group-hover:opacity-100 group-hover:left-0 group-hover:right-0 transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Hub (Audio SFX Toggle + Organizer + Register Party) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Anime Sound Controller */}
            <AnimeAudioToggle />

            {/* Organizer Console */}
            <Link
              href="/admin"
              onClick={handleNavClick}
              onMouseEnter={handleHover}
              className="text-xs text-gray-400 hover:text-gray-100 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#182752] hover:border-[#38bdf8]/50 bg-[#050918]/60"
              title="Fest Organizer Login"
            >
              <Shield className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="font-mono text-[11px]">Command</span>
            </Link>

            {/* Register Team Button */}
            <Link
              href="/register"
              id="navbar-register-button"
              onClick={handleNavClick}
              onMouseEnter={handleHover}
              className="cyber-button-cyan px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider inline-flex items-center gap-2 group transition-all"
            >
              <Sword className="w-4 h-4 text-[#030612] group-hover:rotate-45 transition-transform" />
              <span>Register Party</span>
              <span className="font-kanji text-[10px] bg-[#030612] text-[#00f3ff] px-1.5 py-0.2 rounded font-black">
                登録
              </span>
            </Link>
          </div>

          {/* Mobile Menu & SFX */}
          <div className="flex md:hidden items-center gap-2">
            <AnimeAudioToggle />
            <Link
              href="/register"
              onClick={handleNavClick}
              className="cyber-button-cyan px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              Register
            </Link>
            <button
              onClick={() => {
                animeAudio.playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-lg bg-[#091029] border border-[#182752] text-gray-200 hover:text-[#00f3ff] focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050918]/98 backdrop-blur-2xl border-b border-[#182752] shadow-2xl px-6 pt-4 pb-6 transition-all duration-300">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  animeAudio.playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="text-base font-semibold text-gray-200 hover:text-[#00f3ff] py-2 border-b border-gray-800/60 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="font-kanji text-xs text-gray-500">{link.kanji}</span>
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-3">
              <Link
                href="/register"
                onClick={() => {
                  animeAudio.playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="cyber-button-cyan w-full text-center py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Register Team Party (ギルド登録)</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => {
                  animeAudio.playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="text-center text-xs text-gray-400 hover:text-gray-200 py-2 flex items-center justify-center gap-1.5 bg-[#091029] rounded-lg border border-[#182752]"
              >
                <Shield className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Organizer Command Deck</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
