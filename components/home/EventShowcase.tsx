"use client";

import React from "react";
import EventCard from "@/components/events/EventCard";
import { FEST_EVENTS } from "@/lib/events";
import { Flame, Sword, Sparkles } from "lucide-react";

export default function EventShowcase() {
  return (
    <section id="events" className="py-24 relative overflow-hidden bg-[#030612]/70">
      {/* Background Japanese Watermarks */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span className="kanji-watermark top-12 right-[6%] text-[160px] md:text-[260px]">
          決戦
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#091029] border border-[#ff007f]/50 text-xs font-mono font-bold text-[#ff85a2] mb-4 shadow-neon-magenta">
            <Sword className="w-3.5 h-3.5 text-[#ff007f] animate-pulse" />
            <span>FOUR ARENA BATTLES // 四大決戦</span>
          </div>

          <h2 className="font-anime font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
            Select Your Quest. Claim Glory.
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            Four distinct battlegrounds engineered to challenge your intellect, artistic prowess, prompt engineering mastery, and tactical team synergy.
          </p>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEST_EVENTS.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
