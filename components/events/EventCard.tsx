"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Flame, Zap } from "lucide-react";
import { FestEvent } from "@/lib/events";
import { animeAudio } from "@/lib/audio";

interface EventCardProps {
  event: FestEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Manga Quest Rank styling & Kanji tags
  const getQuestTier = (slug: string) => {
    switch (slug) {
      case "reel-campus":
        return {
          rank: "SSR RANK",
          kanji: "映像",
          sub: "CINE QUEST",
          badgeClass: "badge-ssr",
          glowClass: "hover:border-[#ff85a2]/70 hover:shadow-[0_0_35px_rgba(255,133,162,0.35)]",
        };
      case "prompting-the-image":
        return {
          rank: "UR RANK",
          kanji: "錬金術",
          sub: "NEURAL QUEST",
          badgeClass: "badge-ur",
          glowClass: "hover:border-[#00f3ff]/70 hover:shadow-neon-cyan",
        };
      case "treasure-hunt":
        return {
          rank: "SSS RANK",
          kanji: "大秘宝",
          sub: "EXPEDITION",
          badgeClass: "badge-s-rank",
          glowClass: "hover:border-[#9d4edd]/70 hover:shadow-neon-purple",
        };
      case "kairos":
        return {
          rank: "S-RANK",
          kanji: "時空",
          sub: "CHRONO DUEL",
          badgeClass: "badge-s-rank",
          glowClass: "hover:border-[#ffb703]/70 hover:shadow-neon-gold",
        };
      default:
        return {
          rank: "S-RANK",
          kanji: "競技",
          sub: "ARENA QUEST",
          badgeClass: "badge-ur",
          glowClass: "hover:border-[#00f3ff]/70 hover:shadow-neon-cyan",
        };
    }
  };

  const tier = getQuestTier(event.slug);

  // 3D holographic tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleHover = () => {
    animeAudio.playHoverSound();
  };

  const handleClick = () => {
    animeAudio.playClickSound();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleHover}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`anime-manga-card rounded-2xl overflow-hidden flex flex-col group transition-transform duration-200 ease-out ${tier.glowClass}`}
    >
      {/* Corner Accents */}
      <div className="cyber-corner pointer-events-none" />

      {/* Poster Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#050918]">
        <Image
          src={event.posterImage}
          alt={`${event.name} Official Fest Poster - SAMANVAYA 2.0`}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-108"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={event.slug === "reel-campus" || event.slug === "prompting-the-image"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091029] via-[#091029]/20 to-transparent opacity-85" />

        {/* Anime Quest Rank Badge (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-anime font-black uppercase tracking-wider backdrop-blur-md flex items-center gap-1 ${tier.badgeClass}`}>
            <Flame className="w-3 h-3" />
            <span>{tier.rank}</span>
          </span>
          <span className="font-kanji text-[10px] px-1.5 py-1 rounded-md bg-[#030612]/90 border border-white/10 text-white font-bold backdrop-blur-md">
            {tier.kanji}
          </span>
        </div>

        {/* Team Size Badge (Top Right) */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-[#00f3ff]/20 border border-[#00f3ff]/50 text-[#00f3ff] backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <Users className="w-3.5 h-3.5" />
            <span>{event.teamSize}P Party</span>
          </span>
        </div>

        {/* Japanese Subtitle Overlay across bottom of poster */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-cyan-300/80">
          <span className="font-kanji">{tier.sub} // 任務</span>
          <span className="text-gray-400 font-bold">{event.category}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-anime font-black text-xl text-white group-hover:text-[#00f3ff] transition-colors">
              {event.name}
            </h3>
          </div>
          <p className="text-xs font-bold text-[#ff007f] tracking-wide mb-2.5">
            &ldquo;{event.tagline}&rdquo;
          </p>
          <p className="text-xs text-gray-300 leading-relaxed mb-4 line-clamp-3">
            {event.description}
          </p>

          {/* Quick Rules Preview */}
          <div className="space-y-1.5 mb-5 border-t border-[#182752] pt-3">
            <div className="text-[10px] uppercase tracking-wider font-mono text-gray-400 font-bold mb-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#00f3ff]" />
              <span>QUEST PARAMETERS</span>
            </div>
            {event.rules.slice(0, 2).map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00f3ff] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <Link
            href={`/events/${event.slug}`}
            onClick={handleClick}
            className="px-3 py-2.5 rounded-xl border border-[#182752] hover:border-[#00f3ff] bg-[#050918] hover:bg-[#0c1638] text-xs font-bold text-center text-gray-200 hover:text-white transition-all flex items-center justify-center gap-1.5 group/btn"
          >
            <span>Briefing</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00f3ff] group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          <Link
            href={`/register?event=${event.slug}`}
            onClick={handleClick}
            className="cyber-button-cyan px-3 py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#030612]" />
            <span>Join Quest</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
