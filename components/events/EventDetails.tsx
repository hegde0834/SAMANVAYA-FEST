"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  MapPin,
  Calendar,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Trophy,
  Maximize2,
  X,
  ChevronDown,
  Layers,
  ShieldCheck,
  Flame,
  Sword,
} from "lucide-react";
import { FestEvent, FEST_EVENTS } from "@/lib/events";
import EventContact from "./EventContact";
import { animeAudio } from "@/lib/audio";

interface EventDetailsProps {
  event: FestEvent;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const [posterZoomed, setPosterZoomed] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const relatedEvents = FEST_EVENTS.filter((e) => e.slug !== event.slug);

  const handleHover = () => {
    animeAudio.playHoverSound();
  };

  const handleClick = () => {
    animeAudio.playClickSound();
  };

  return (
    <div className="pt-28 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8" aria-label="Breadcrumb">
          <Link href="/" onClick={handleClick} className="hover:text-[#00f3ff] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#events" onClick={handleClick} className="hover:text-[#00f3ff] transition-colors">
            Events
          </Link>
          <span>/</span>
          <span className="text-[#00f3ff] font-semibold">{event.name}</span>
        </nav>

        {/* Hero Section of Event Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Official Poster Preview */}
          <div className="lg:col-span-5 relative">
            <div className="anime-manga-card rounded-2xl overflow-hidden p-2 group relative border border-[#182752] hover:border-[#00f3ff]/70 transition-all duration-300">
              <div className="relative aspect-[3/4.2] w-full rounded-xl overflow-hidden bg-[#050918]">
                <Image
                  src={event.posterImage}
                  alt={`${event.name} Official Poster - NIE Samanvaya 2.0`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <button
                  onClick={() => {
                    animeAudio.playClickSound();
                    setPosterZoomed(true);
                  }}
                  className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-[#030612]/85 backdrop-blur-md border border-white/20 text-white hover:text-[#00f3ff] transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  title="View full poster"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Enlarge Poster</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & Overview */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#091029] border border-[#00f3ff]/40 text-xs font-mono font-bold text-[#00f3ff]">
                  <Flame className="w-3.5 h-3.5 text-[#00f3ff]" />
                  <span>{event.category}</span>
                </span>
                <span className="font-kanji text-[10px] px-2 py-1 rounded-full bg-[#ff007f]/20 border border-[#ff007f]/40 text-[#ff85a2] font-bold">
                  決戦競技
                </span>
              </div>

              <h1 className="font-anime font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
                {event.name}
              </h1>

              <div className="text-sm sm:text-base font-bold text-[#ff007f] tracking-wide mb-4">
                &ldquo;{event.tagline}&rdquo;
              </div>

              {event.theme && (
                <div className="p-4 rounded-xl bg-[#091029]/80 border border-[#182752] text-xs sm:text-sm text-gray-300 mb-6 flex items-start gap-2.5">
                  <span className="text-[#00f3ff] font-bold uppercase tracking-wider shrink-0 font-mono">
                    Theme:
                  </span>
                  <span>{event.theme}</span>
                </div>
              )}

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                {event.detailedDescription || event.description}
              </p>

              {/* Event Metadata Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="p-3.5 rounded-xl bg-[#050918] border border-[#182752]">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono font-bold uppercase mb-1">
                    <Users className="w-3.5 h-3.5 text-[#00f3ff]" />
                    Team Size
                  </div>
                  <div className="font-anime font-bold text-sm text-white">
                    {event.teamSize} Members
                  </div>
                  {event.genderRule && (
                    <div className="text-[10px] text-cyan-400 mt-0.5 font-medium">
                      {event.genderRule}
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-[#050918] border border-[#182752]">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono font-bold uppercase mb-1">
                    <Trophy className="w-3.5 h-3.5 text-[#ff007f]" />
                    Registration
                  </div>
                  <div className="font-anime font-bold text-sm text-white">
                    {event.entryFee}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#050918] border border-[#182752]">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono font-bold uppercase mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#9d4edd]" />
                    Date
                  </div>
                  <div className="font-anime font-bold text-sm text-white">
                    {event.date}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#050918] border border-[#182752]">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono font-bold uppercase mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ffb703]" />
                    Venue
                  </div>
                  <div className="font-anime font-bold text-xs text-white truncate" title={event.venue}>
                    {event.venue}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={`/register?event=${event.slug}`}
                id={`register-cta-${event.slug}`}
                onClick={handleClick}
                onMouseEnter={handleHover}
                className="cyber-button-cyan w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-anime font-black tracking-wider shadow-neon-cyan"
              >
                <Sparkles className="w-4 h-4 text-[#030612]" />
                <span>Register Your Team for {event.name} // ギルド登録</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Challenge Stages / Formats */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-5 h-5 text-[#00f3ff]" />
            <h2 className="font-anime font-black text-2xl text-white">
              Quest Format & Stages // 競技段階
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.stages.map((stage) => (
              <div
                key={stage.number}
                onMouseEnter={handleHover}
                className="anime-manga-card p-6 rounded-2xl border border-[#182752] hover:border-[#00f3ff]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-anime font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#9d4edd]">
                    {stage.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#050918] border border-[#182752] flex items-center justify-center text-[#00f3ff]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-anime font-bold text-lg text-white mb-2">
                  {stage.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Highlights (If Available, e.g. Kairos) */}
        {event.keyHighlights && event.keyHighlights.length > 0 && (
          <section className="mb-16">
            <h2 className="font-anime font-black text-2xl text-white mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#ffb703]" />
              <span>Event Highlights // 見どころ</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {event.keyHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#091029] border border-[#182752] flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00f3ff] shrink-0" />
                  <span className="text-xs font-semibold text-gray-200">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Official Rules & Guidelines */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-[#ff007f]" />
            <h2 className="font-anime font-black text-2xl text-white">
              Official Quest Guidelines // 規約
            </h2>
          </div>

          <div className="anime-manga-card p-6 sm:p-8 rounded-2xl border border-[#182752]">
            <ol className="space-y-4">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-sm text-gray-200 font-normal">
                  <span className="w-6 h-6 rounded-md bg-[#00f3ff]/15 border border-[#00f3ff]/40 flex items-center justify-center text-xs font-mono font-bold text-[#00f3ff] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Event-Specific Contact Details: STRICTLY shown only if poster contained numbers! */}
        <EventContact contacts={event.contacts} eventName={event.name} />

        {/* FAQs Section */}
        {event.faqs && event.faqs.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-[#9d4edd]" />
              <h2 className="font-anime font-black text-2xl text-white">
                Frequently Asked Questions // よくある質問
              </h2>
            </div>

            <div className="space-y-4">
              {event.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="cyber-card rounded-xl border border-[#182752] overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        animeAudio.playClickSound();
                        setActiveFaq(isOpen ? null : idx);
                      }}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="font-semibold text-sm sm:text-base text-gray-200">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#00f3ff] transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-gray-400 border-t border-[#182752] pt-4 leading-relaxed font-normal">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Events Carousel / Links */}
        <section className="border-t border-[#182752] pt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-anime font-bold text-xl text-white">
              Other Arenas at Samanvaya 2.0 // 他の競技
            </h3>
            <Link
              href="/#events"
              onClick={handleClick}
              className="text-xs font-semibold text-[#00f3ff] hover:underline flex items-center gap-1"
            >
              <span>View All Events</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedEvents.map((rel) => (
              <Link
                key={rel.slug}
                href={`/events/${rel.slug}`}
                onClick={handleClick}
                onMouseEnter={handleHover}
                className="anime-manga-card p-4 rounded-xl border border-[#182752] hover:border-[#00f3ff]/50 transition-all group flex items-center gap-4"
              >
                <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-[#050918]">
                  <Image
                    src={rel.posterImage}
                    alt={rel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-anime font-bold text-sm text-white group-hover:text-[#00f3ff] transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-1 font-normal">
                    {rel.tagline}
                  </p>
                  <span className="text-[10px] text-[#00f3ff] font-mono font-semibold mt-2 inline-block">
                    {rel.teamSize} Members →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Poster Lightbox Modal */}
      {posterZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPosterZoomed(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                animeAudio.playClickSound();
                setPosterZoomed(false);
              }}
              className="absolute top-2 right-2 z-10 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:text-[#00f3ff] focus:outline-none"
              aria-label="Close poster preview"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full max-h-[85vh]">
              <Image
                src={event.posterImage}
                alt={`${event.name} Full Poster`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
