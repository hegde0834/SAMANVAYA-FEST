"use client";

import React from "react";
import { Sparkles, Cpu, Users2, Trophy, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { animeAudio } from "@/lib/audio";

export default function AboutSection() {
  const highlights = [
    {
      title: "Creativity",
      kanji: "創造性",
      tagline: "Unleash Imagination",
      description:
        "Express ideas boldly through cinematic frames, neural prompt storytelling, and unique visual narratives that break conventional boundaries.",
      icon: Sparkles,
      color: "from-[#00f3ff] to-[#0284c7]",
      borderColor: "hover:border-[#00f3ff]/70",
      glowColor: "group-hover:shadow-neon-cyan",
    },
    {
      title: "Innovation",
      kanji: "革新",
      tagline: "Future Forward",
      description:
        "Harness cutting-edge generative AI models and next-generation problem-solving paradigms to engineer tomorrow's digital artistry.",
      icon: Cpu,
      color: "from-[#ff007f] to-[#be123c]",
      borderColor: "hover:border-[#ff007f]/70",
      glowColor: "group-hover:shadow-neon-magenta",
    },
    {
      title: "Teamwork",
      kanji: "団結",
      tagline: "Synergy in Action",
      description:
        "Synchronize your squad under pressure, deciphering labyrinthine campus clues and debugging mission-critical code together.",
      icon: Users2,
      color: "from-[#9d4edd] to-[#6b21a8]",
      borderColor: "hover:border-[#9d4edd]/70",
      glowColor: "group-hover:shadow-neon-purple",
    },
    {
      title: "Competition",
      kanji: "覇道",
      tagline: "Rise to Champion",
      description:
        "Test your intellectual limits, quick-witted trivia, and tactical showdown prowess among top competitive talent.",
      icon: Trophy,
      color: "from-[#ffb703] to-[#d97706]",
      borderColor: "hover:border-[#ffb703]/70",
      glowColor: "group-hover:shadow-neon-gold",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Japanese Watermarks */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span className="kanji-watermark bottom-4 left-[5%] text-[150px] md:text-[230px]">
          精神
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#091029] border border-[#00f3ff]/40 text-xs font-mono font-bold text-[#00f3ff] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-ping" />
            <span>FEST PHILOSOPHY // 理念</span>
          </div>

          <h2 className="font-anime font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
            Where Innovation Meets Imagination
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            SAMANVAYA 2.0 brings together students from across Karnataka to celebrate creativity, technology, collaboration, and high-octane competitive spirit.
          </p>
        </div>

        {/* 4 Animated Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => animeAudio.playHoverSound()}
                className={`group anime-manga-card p-6 rounded-2xl relative transition-all duration-300 ${item.borderColor} ${item.glowColor}`}
              >
                {/* Glow Icon Header */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-0.5 group-hover:scale-110 group-hover:rotate-3 transition-transform`}
                  >
                    <div className="w-full h-full bg-[#030612] rounded-[10px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="font-kanji font-black text-lg text-white/20 group-hover:text-white/60 transition-colors">
                    {item.kanji}
                  </span>
                </div>

                <div className="text-[11px] uppercase tracking-widest font-mono text-cyan-400 font-bold mb-1">
                  {item.tagline}
                </div>
                <h3 className="font-anime font-black text-xl text-white mb-2.5 group-hover:text-[#00f3ff] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
