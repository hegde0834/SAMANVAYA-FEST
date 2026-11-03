import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Building, GraduationCap, ShieldCheck } from "lucide-react";
import { FEST_EVENTS } from "@/lib/events";

export default function Footer() {
  return (
    <footer className="relative bg-[#02040a] border-t border-[#182752] pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#00f3ff]/10 via-[#ff007f]/5 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Fest & Institution Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f3ff] via-[#9d4edd] to-[#ff007f] p-0.5 flex items-center justify-center shadow-neon-cyan">
                <div className="w-full h-full bg-[#030612] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#00f3ff]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-anime font-black text-xl tracking-wider text-white">
                    SAMANVAYA <span className="text-[#00f3ff] glow-text-cyan">2.0</span>
                  </span>
                  <span className="font-kanji text-[10px] px-1.5 py-0.5 rounded bg-[#ff007f]/20 border border-[#ff007f]/40 text-[#ff85a2] font-bold">
                    覚醒
                  </span>
                </div>
                <span className="block text-xs font-semibold tracking-widest text-[#ff85a2] uppercase">
                  THE AWAKENING // サマンバヤ
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 max-w-md leading-relaxed font-normal">
              The premier annual technical and creative fest of the Department of Master of Computer Applications (MCA), The National Institute of Engineering (NIE), Mysuru.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#00f3ff] shrink-0" />
                <span>Department of Master of Computer Applications (MCA)</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#ff007f] shrink-0" />
                <span>The National Institute of Engineering (NIE)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9d4edd] shrink-0" />
                <span>North Campus, Mysuru, Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-anime font-bold text-sm tracking-wider uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff]" />
              Navigation // 案内
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#00f3ff] transition-colors">
                  Home // ホーム
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#00f3ff] transition-colors">
                  About Samanvaya // 概要
                </Link>
              </li>
              <li>
                <Link href="/#events" className="hover:text-[#00f3ff] transition-colors">
                  All Fest Arenas // 競技一覧
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#00f3ff] transition-colors">
                  Register Your Party // ギルド登録
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#00f3ff] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Organizer Command Deck</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Individual Event Links */}
          <div>
            <h4 className="font-anime font-bold text-sm tracking-wider uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff007f]" />
              Arena Portals // 競技場
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {FEST_EVENTS.map((event) => (
                <li key={event.slug}>
                  <Link
                    href={`/events/${event.slug}`}
                    className="hover:text-[#ff007f] transition-colors block text-xs sm:text-sm font-medium"
                  >
                    {event.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: STRICT RULE: No phone numbers! */}
        <div className="border-t border-[#182752] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            © {new Date().getFullYear()} The National Institute of Engineering, Mysuru. MCA Department. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-400 font-mono text-[11px]">
            <span>SAMANVAYA 2.0</span>
            <span className="text-gray-600">•</span>
            <span className="font-kanji text-[#ff85a2]">覚醒の章</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
