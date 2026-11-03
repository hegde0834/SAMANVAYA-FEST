"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Flame, Compass, Palette, ShieldAlert, Award } from "lucide-react";
import { motion } from "framer-motion";
import { animeAudio } from "@/lib/audio";

export default function Hero() {
  const [powerLevel, setPowerLevel] = useState(4800);
  const [isCharging, setIsCharging] = useState(false);
  const [limitBroken, setLimitBroken] = useState(false);

  const handleCharge = () => {
    animeAudio.playPowerUpSound();
    setIsCharging(true);
    setPowerLevel((prev) => {
      const next = prev + 1200;
      if (next >= 9001 && !limitBroken) {
        setLimitBroken(true);
        animeAudio.playVictoryFanfare();
      }
      return next > 9999 ? 9999 : next;
    });
    setTimeout(() => setIsCharging(false), 400);
  };

  const handleHover = () => {
    animeAudio.playHoverSound();
  };

  const handleClick = () => {
    animeAudio.playClickSound();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Japanese Watermarks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <span className="kanji-watermark top-10 left-[4%] text-[140px] md:text-[220px]">
          覚醒
        </span>
        <span className="kanji-watermark bottom-10 right-[4%] text-[140px] md:text-[220px]">
          無限
        </span>
        <span className="kanji-watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] md:text-[340px] text-white/[0.015]">
          技術
        </span>
      </div>

      {/* Cyber Anime Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#00f3ff]/15 via-[#9d4edd]/20 to-[#ff007f]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Anime Manga Quest Badges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Left: AI Prompting */}
        <motion.div
          animate={{ y: [-14, 14, -14], rotate: [0, 4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:flex absolute top-36 left-[8%] items-center gap-2.5 px-4 py-2 rounded-xl bg-[#091029]/85 backdrop-blur-md border border-[#00f3ff]/40 shadow-neon-cyan"
        >
          <div className="w-7 h-7 rounded-lg bg-[#00f3ff]/20 flex items-center justify-center">
            <Palette className="w-4 h-4 text-[#00f3ff]" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
              UR QUEST // 錬金術
            </div>
            <span className="text-xs font-bold text-gray-200">AI Prompt Engineering</span>
          </div>
        </motion.div>

        {/* Top Right: Clue Quests */}
        <motion.div
          animate={{ y: [16, -16, 16], rotate: [0, -4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden lg:flex absolute top-44 right-[8%] items-center gap-2.5 px-4 py-2 rounded-xl bg-[#091029]/85 backdrop-blur-md border border-[#ff007f]/40 shadow-neon-magenta"
        >
          <div className="w-7 h-7 rounded-lg bg-[#ff007f]/20 flex items-center justify-center">
            <Compass className="w-4 h-4 text-[#ff007f]" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#ff85a2] font-bold uppercase tracking-wider">
              SSS EXPEDITION // 大秘宝
            </div>
            <span className="text-xs font-bold text-gray-200">Campus Clue Quests</span>
          </div>
        </motion.div>

        {/* Bottom Left: Code Battle */}
        <motion.div
          animate={{ y: [-12, 18, -12], rotate: [0, 3, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="hidden xl:flex absolute bottom-36 left-[10%] items-center gap-2.5 px-4 py-2 rounded-xl bg-[#091029]/85 backdrop-blur-md border border-[#9d4edd]/40 shadow-neon-purple"
        >
          <div className="w-7 h-7 rounded-lg bg-[#9d4edd]/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#9d4edd]" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider">
              S-RANK CHRONO // 刻
            </div>
            <span className="text-xs font-bold text-gray-200">Logic & Speed Showdown</span>
          </div>
        </motion.div>

        {/* Bottom Right: Reel Film */}
        <motion.div
          animate={{ y: [14, -14, 14], rotate: [0, -3, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="hidden xl:flex absolute bottom-40 right-[10%] items-center gap-2.5 px-4 py-2 rounded-xl bg-[#091029]/85 backdrop-blur-md border border-[#ffb703]/40 shadow-neon-gold"
        >
          <div className="w-7 h-7 rounded-lg bg-[#ffb703]/20 flex items-center justify-center">
            <Flame className="w-4 h-4 text-[#ffb703]" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-yellow-300 font-bold uppercase tracking-wider">
              SSR CINEMA // 映像
            </div>
            <span className="text-xs font-bold text-gray-200">Cinematic Storytelling</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Department & Anime Festival Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#091029]/95 border border-[#182752] backdrop-blur-md mb-6 shadow-glass hover:border-[#00f3ff]/50 transition-colors">
          <span className="font-kanji text-xs px-2 py-0.5 rounded-full bg-[#00f3ff]/20 text-[#00f3ff] font-bold">
            国立工科大学 (NIE)
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-300">
            MCA Department • North Campus, Mysuru
          </span>
        </div>

        {/* Hero Title with Anime Typography */}
        <div className="relative mb-2">
          {/* Subtle Manga Onomatopoeia in background */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-kanji font-black tracking-[0.5em] text-[#ff007f]/40 uppercase">
            ドドドド • ゴゴゴゴ
          </div>
          <h1 className="font-anime font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white">
            SAMANVAYA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-[#9d4edd] to-[#ff007f] glow-text-cyan">2.0</span>
          </h1>
        </div>

        {/* Anime Subtitle: THE AWAKENING / 覚醒 */}
        <div className="relative inline-block mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="font-anime font-extrabold text-xl sm:text-2xl md:text-3xl tracking-[0.25em] sm:tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-white to-[#ff007f]">
              THE AWAKENING
            </span>
            <span className="font-kanji font-black text-lg sm:text-xl md:text-2xl text-[#ff007f] glow-text-magenta">
              [ 覚 醒 ]
            </span>
          </div>
          <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent" />
        </div>

        {/* Official Tagline with Cherry Blossom Accents */}
        <p className="font-display text-lg sm:text-xl md:text-2xl font-bold text-cyan-300 mb-6 tracking-wide glow-text-cyan">
          🌸 &ldquo;Four Events. Infinite Possibilities. One Unforgettable Fest.&rdquo;
        </p>

        {/* Supporting Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
          Awaken your competitive spirit in an anime-grade tech fest arena. Gather your guild party, master generative AI models, unravel labyrinthine campus mystery trails, and claim the championship crown.
        </p>

        {/* Interactive Ki Charge / Power Level Meter */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-2xl bg-[#091029]/80 border border-[#182752] backdrop-blur-md mb-10 shadow-glass">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              limitBroken
                ? "bg-gradient-to-br from-[#ff007f] to-[#ffb703] text-white shadow-neon-magenta animate-bounce"
                : "bg-[#00f3ff]/20 text-[#00f3ff]"
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                {limitBroken ? "🔥 LIMIT BREAK ACTIVATED!" : "FEST POWER LEVEL"}
              </div>
              <div className="font-mono font-black text-lg sm:text-xl text-white flex items-center gap-2">
                <span className={limitBroken ? "text-yellow-400 glow-text-gold" : "text-[#00f3ff]"}>
                  {powerLevel >= 9000 ? "OVER 9000!!" : `${powerLevel.toLocaleString()} KI`}
                </span>
                <span className="text-[11px] font-kanji font-bold px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                  {limitBroken ? "限界突破" : "戦力"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCharge}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-black tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
              isCharging
                ? "scale-95 bg-[#ff007f] text-white shadow-neon-magenta"
                : "bg-gradient-to-r from-[#00f3ff]/30 to-[#ff007f]/30 hover:from-[#00f3ff]/50 hover:to-[#ff007f]/50 border border-[#00f3ff]/50 text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00f3ff]" />
            <span>{isCharging ? "SURGING..." : "⚡ CHARGE KI"}</span>
          </button>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="#events"
            id="hero-explore-button"
            onClick={handleClick}
            onMouseEnter={handleHover}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#182752] hover:border-[#00f3ff] bg-[#091029]/80 backdrop-blur-md text-white font-bold tracking-wider hover:bg-[#0e183a] transition-all duration-300 flex items-center justify-center gap-2 group shadow-glass hover:shadow-neon-cyan"
          >
            <span>Enter Arena // 競技場</span>
            <ArrowRight className="w-4 h-4 text-[#00f3ff] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/register"
            id="hero-register-button"
            onClick={handleClick}
            onMouseEnter={handleHover}
            className="w-full sm:w-auto cyber-button-cyan px-9 py-4 rounded-xl font-anime font-bold text-sm tracking-wider flex items-center justify-center gap-2.5 shadow-neon-cyan group"
          >
            <Sparkles className="w-5 h-5 text-[#030612] group-hover:rotate-12 transition-transform" />
            <span>Form Guild Party // ギルド登録</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
