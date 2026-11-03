import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 pt-28 pb-20">
      <div className="anime-manga-card p-8 sm:p-12 rounded-2xl max-w-lg w-full text-center border border-[#ff007f]/50 shadow-neon-magenta">
        <div className="w-16 h-16 rounded-2xl bg-[#ff007f]/15 border border-[#ff007f]/50 text-[#ff007f] flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 animate-pulse" />
        </div>
        <div className="font-kanji text-xs text-[#ff85a2] font-black uppercase tracking-[0.3em] mb-1">
          虚無空間 • DIMENSIONAL RIFT
        </div>
        <h1 className="font-anime font-black text-4xl sm:text-6xl text-white mb-2">
          404 <span className="text-[#ff007f] glow-text-magenta">ERROR</span>
        </h1>
        <h2 className="font-anime font-bold text-base text-cyan-300 mb-4">
          Coordinates Lost in Cyberspace // 未知の領域
        </h2>
        <p className="text-sm text-gray-300 mb-8 leading-relaxed font-normal">
          The requested fest event or confirmation pass could not be located in the SAMANVAYA 2.0 anime dimension.
        </p>
        <Link
          href="/"
          className="cyber-button-cyan inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-anime font-black"
        >
          <ArrowLeft className="w-4 h-4 text-[#030612]" />
          <span>Return to Fest Arena // 帰還</span>
        </Link>
      </div>
    </div>
  );
}
