"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Copy,
  Printer,
  Calendar,
  Building2,
  Users,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award,
  Crown,
} from "lucide-react";
import { toast } from "sonner";
import { animeAudio } from "@/lib/audio";

interface RegistrationSuccessProps {
  registration: {
    registrationId: string;
    teamName: string;
    eventName: string;
    eventSlug: string;
    departmentName: string;
    status: string;
    createdAt: string;
    members: {
      fullName: string;
      memberIndex: number;
    }[];
  };
}

export default function RegistrationSuccess({ registration }: RegistrationSuccessProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    animeAudio.playVictoryFanfare();
    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00f3ff", "#ff007f", "#ff85a2", "#ffb703", "#9d4edd"],
      });
    } catch {
      // Ignore if confetti not supported
    }
  }, []);

  const handleCopyId = () => {
    animeAudio.playClickSound();
    navigator.clipboard.writeText(registration.registrationId);
    setCopied(true);
    toast.success("Team ID copied! Keep this safe for festival entry verification.");
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    animeAudio.playClickSound();
    window.print();
  };

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(registration.createdAt));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      {/* Anime Victory Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00f3ff] via-[#9d4edd] to-[#ff007f] p-1 shadow-neon-cyan mb-4 animate-bounce">
          <div className="w-full h-full bg-[#030612] rounded-[12px] flex items-center justify-center">
            <Award className="w-8 h-8 text-[#00f3ff]" />
          </div>
        </div>
        <div className="font-kanji text-xs text-[#ff85a2] font-black uppercase tracking-[0.25em] mb-1">
          登録完了 • QUEST ACCEPTED
        </div>
        <h1 className="font-anime font-black text-3xl sm:text-4xl text-white tracking-tight mb-2">
          Guild Party Registered!
        </h1>
        <p className="text-sm sm:text-base text-gray-300">
          Your team is officially registered for SAMANVAYA 2.0 — THE AWAKENING [覚醒].
        </p>
      </div>

      {/* Confirmation Pass Card (Printable) */}
      <div
        id="printable-pass"
        className="anime-manga-card rounded-2xl border border-[#00f3ff]/50 p-6 sm:p-8 shadow-glass-elevated mb-8 relative overflow-hidden"
      >
        {/* Neon accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00f3ff] via-[#9d4edd] to-[#ff007f]" />

        {/* Fest Identification */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#182752]">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold flex items-center gap-1.5">
              <span>THE NATIONAL INSTITUTE OF ENGINEERING, MYSURU</span>
              <span className="text-gray-500">•</span>
              <span className="font-kanji text-gray-400">工科大学</span>
            </div>
            <div className="font-anime font-black text-xl text-white flex items-center gap-2 mt-1">
              <span>SAMANVAYA 2.0 OFFICIAL GUILD PASS</span>
              <span className="font-kanji text-xs text-[#ff007f] font-bold px-2 py-0.5 rounded bg-[#ff007f]/10 border border-[#ff007f]/30">
                通行手形
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase bg-[#00f3ff]/15 border border-[#00f3ff]/50 text-[#00f3ff] shadow-neon-cyan self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>{registration.status} // 承認済</span>
          </span>
        </div>

        {/* Unique Registration ID Box */}
        <div className="my-6 p-4 rounded-xl bg-[#050918] border border-[#182752] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-mono text-cyan-400 font-bold block mb-1">
              UNIQUE TEAM REGISTRATION ID // 固有識別番号
            </span>
            <span
              id="registration-id-display"
              className="font-mono font-black text-xl sm:text-2xl text-[#00f3ff] tracking-wider select-all glow-text-cyan"
            >
              {registration.registrationId}
            </span>
          </div>
          <button
            onClick={handleCopyId}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#091029] border border-[#182752] hover:border-[#00f3ff] text-xs font-mono font-bold text-gray-200 hover:text-white transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-[#00f3ff]" />
            <span>{copied ? "COPIED!" : "COPY ID"}</span>
          </button>
        </div>

        {/* Registration Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#182752]">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5 mb-1 font-mono">
              <Users className="w-3.5 h-3.5 text-[#ff007f]" />
              Party / Team Name
            </span>
            <div className="font-anime font-bold text-base text-white">
              {registration.teamName}
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5 mb-1 font-mono">
              <Trophy className="w-3.5 h-3.5 text-[#ffb703]" />
              Championship Arena Event
            </span>
            <div className="font-anime font-bold text-base text-white">
              {registration.eventName}
            </div>
          </div>

          {/* STRICT REQUIREMENT A: Single Department Field displayed once */}
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5 mb-1 font-mono">
              <Building2 className="w-3.5 h-3.5 text-[#00f3ff]" />
              Shared Department Name
            </span>
            <div className="text-sm font-semibold text-gray-200">
              {registration.departmentName}
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5 mb-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#9d4edd]" />
              Registration Timestamp
            </span>
            <div className="text-xs text-gray-300 font-mono">{formattedDate}</div>
          </div>
        </div>

        {/* Registered Team Members (Public Privacy: Names Only!) */}
        <div className="pt-6">
          <span className="text-xs uppercase tracking-wider font-mono font-bold text-gray-400 block mb-3">
            REGISTERED PARTY ROSTER ({registration.members.length} ADVENTURERS)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {registration.members.map((member, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#050918] border border-[#182752] flex items-center gap-2.5"
              >
                <span className="w-7 h-7 rounded-lg bg-[#00f3ff]/10 text-[#00f3ff] text-xs font-mono font-black flex items-center justify-center shrink-0">
                  {idx === 0 ? "👑" : `${idx + 1}P`}
                </span>
                <span className="text-sm font-semibold text-white truncate">
                  {member.fullName}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-500 mt-4 italic font-normal">
            Note: For participant privacy, contact numbers and email addresses are securely archived in the organizer database and omitted from public festival credentials.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#091029] border border-[#182752] hover:border-[#00f3ff] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Printer className="w-4 h-4 text-[#00f3ff]" />
          <span>PRINT PASS / SAVE PDF</span>
        </button>

        <Link
          href={`/events/${registration.eventSlug}`}
          onClick={() => animeAudio.playClickSound()}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#182752] hover:border-white/40 text-gray-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <span>View Rules & Venue</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/"
          onClick={() => animeAudio.playClickSound()}
          className="w-full sm:w-auto cyber-button-cyan px-6 py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
        >
          <span>Back to Fest Home</span>
        </Link>
      </div>
    </div>
  );
}
