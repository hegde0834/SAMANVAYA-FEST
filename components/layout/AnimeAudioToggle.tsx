"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { animeAudio } from "@/lib/audio";

export default function AnimeAudioToggle() {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    return animeAudio.subscribe((muted) => setIsMuted(muted));
  }, []);

  const handleToggle = () => {
    animeAudio.toggleMute();
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all duration-300 focus:outline-none ${
        isMuted
          ? "bg-[#050918]/80 border-[#182752] text-gray-400 hover:text-gray-200 hover:border-gray-600"
          : "bg-gradient-to-r from-[#ff007f]/20 to-[#00f3ff]/20 border-[#00f3ff]/60 text-[#00f3ff] shadow-neon-cyan"
      }`}
      title={isMuted ? "Enable Anime Sound Effects" : "Mute Sound Effects"}
      aria-label="Toggle Anime Sound Effects"
    >
      {isMuted ? (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">SFX OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#00f3ff]" />
          <span className="hidden sm:inline text-[11px] glow-text-cyan">SFX ON</span>
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f3ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00f3ff]"></span>
          </span>
        </>
      )}
    </button>
  );
}
