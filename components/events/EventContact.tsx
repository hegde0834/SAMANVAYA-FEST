"use client";

import React from "react";
import { Phone, UserCheck, Shield } from "lucide-react";
import { CoordinatorContact } from "@/lib/events";
import { animeAudio } from "@/lib/audio";

interface EventContactProps {
  contacts?: CoordinatorContact[];
  eventName: string;
}

/**
 * Event-Specific Contact Component
 * STRICT RULE: Only rendered on individual event detail pages when the original poster
 * contains contact numbers. NEVER included in shared components, home, footer, navbar, or registration.
 */
export default function EventContact({ contacts, eventName }: EventContactProps) {
  if (!contacts || contacts.length === 0) {
    return null;
  }

  return (
    <div className="anime-manga-card p-6 sm:p-8 rounded-2xl border border-[#00f3ff]/40 shadow-neon-cyan/20 my-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#00f3ff]/10 border border-[#00f3ff]/40 flex items-center justify-center text-[#00f3ff]">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-anime font-bold text-lg text-white">
              Official Quest Coordinators // 運営担当者
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            Student coordinators printed on the official {eventName} poster
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
        {contacts.map((contact, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#050918] border border-[#182752] flex items-center justify-between group hover:border-[#00f3ff]/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-[#00f3ff]" />
              <span className="text-sm font-semibold text-gray-200">
                {contact.name}
              </span>
            </div>
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              onClick={() => animeAudio.playClickSound()}
              className="font-mono text-sm font-bold text-[#00f3ff] hover:underline"
            >
              {contact.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
