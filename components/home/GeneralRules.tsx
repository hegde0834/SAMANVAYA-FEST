"use client";

import React from "react";
import { ShieldAlert, Users, Award, Clock, Scroll } from "lucide-react";
import { animeAudio } from "@/lib/audio";

export default function GeneralRules() {
  const guidelines = [
    {
      icon: Users,
      kanji: "資格",
      title: "Team Composition & Eligibility",
      description:
        "All bona fide students from recognized institutions are welcome. Teams must adhere to the exact team size specified for their registered event.",
    },
    {
      icon: Award,
      kanji: "公正",
      title: "Fair Play & Originality",
      description:
        "All work submitted must be original. Any form of malpractice, plagiarism, or unauthorized external assistance leads to immediate disqualification.",
    },
    {
      icon: Clock,
      kanji: "厳守",
      title: "Punctuality & Reporting",
      description:
        "Participants must report to their respective venues at NIE North Campus, Mysuru, on time. Detailed round schedules will be published prior to fest day.",
    },
    {
      icon: ShieldAlert,
      kanji: "決定",
      title: "Judges' Decision",
      description:
        "The decision of the judges and organizing committee is final and binding for all events and evaluation stages.",
    },
  ];

  return (
    <section id="rules" className="py-24 relative overflow-hidden bg-[#02040a]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#091029] border border-[#9d4edd]/50 text-xs font-mono font-bold text-[#c084fc] mb-4 shadow-neon-purple">
            <Scroll className="w-3.5 h-3.5 text-[#9d4edd]" />
            <span>SCROLL OF RULES // 規約の巻物</span>
          </div>
          <h2 className="font-anime font-black text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Code of Conduct & Fest Honor
          </h2>
          <p className="text-base text-gray-300 leading-relaxed font-normal">
            Essential guidelines to ensure fairness, safety, and an honorable spirit of sportsmanship across all SAMANVAYA 2.0 arena battles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guidelines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => animeAudio.playHoverSound()}
                className="anime-manga-card p-6 rounded-2xl border border-[#182752] hover:border-[#9d4edd]/60 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#091029] border border-[#182752] flex items-center justify-center text-[#9d4edd]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-kanji font-bold text-sm text-purple-400/60 px-2 py-0.5 rounded bg-purple-900/20">
                    {item.kanji}
                  </span>
                </div>
                <h3 className="font-anime font-bold text-base text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
