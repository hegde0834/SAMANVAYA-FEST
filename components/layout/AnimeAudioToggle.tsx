"use client";

import React, { useEffect, useState } from "react";
import { Play, Pause, Music, Volume2, VolumeX, Sparkles } from "lucide-react";
import { animeAudio, BgmState } from "@/lib/audio";

export default function AnimeAudioToggle() {
  const [bgmState, setBgmState] = useState<BgmState>(animeAudio.getBgmState());
  const [sfxMuted, setSfxMuted] = useState(true);

  useEffect(() => {
    const unsubBgm = animeAudio.subscribeBgm((state) => setBgmState(state));
    const unsubSfx = animeAudio.subscribe((muted) => setSfxMuted(muted));

    return () => {
      unsubBgm();
      unsubSfx();
    };
  }, []);

  const handleToggleBgm = async () => {
    animeAudio.playClickSound();
    await animeAudio.toggleBgm();
  };

  const handleToggleSfx = (e: React.MouseEvent) => {
    e.stopPropagation();
    animeAudio.toggleMute();
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      {/* Hiroyuki Sawano BGM Main Button */}
      <button
        onClick={handleToggleBgm}
        className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all duration-300 focus:outline-none ${
          bgmState.isPlaying
            ? "bg-gradient-to-r from-[#ff007f]/25 via-[#9d4edd]/25 to-[#00f3ff]/25 border-[#00f3ff] text-white shadow-neon-cyan animate-pulse"
            : "bg-[#050918]/80 border-[#182752] text-gray-300 hover:text-white hover:border-[#00f3ff]/50"
        }`}
        title={
          bgmState.isPlaying
            ? "Pause Hiroyuki Sawano BGM (attack ON titan)"
            : "Play Hiroyuki Sawano BGM (attack ON titan)"
        }
        aria-label="Toggle Hiroyuki Sawano Background Music"
      >
        {bgmState.isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 text-[#00f3ff] fill-current animate-pulse" />
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-black text-[#00f3ff]">SAWANO BGM</span>
              {/* Equalizer animation */}
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-2.5 bg-[#00f3ff] animate-pulse" />
                <span className="w-0.5 h-3.5 bg-[#ff007f] animate-bounce" />
                <span className="w-0.5 h-2 bg-[#00f3ff] animate-pulse" />
              </span>
            </div>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00f3ff] transition-colors" />
            <span className="text-[11px] text-gray-300">♫ SAWANO BGM</span>
          </>
        )}
      </button>

      {/* Mini SFX Toggle */}
      <button
        onClick={handleToggleSfx}
        className={`p-1.5 rounded-lg border text-xs transition-colors focus:outline-none ${
          sfxMuted
            ? "border-[#182752] text-gray-500 hover:text-gray-300 hover:border-gray-600 bg-[#050918]/60"
            : "border-[#00f3ff]/50 text-[#00f3ff] bg-[#00f3ff]/10"
        }`}
        title={sfxMuted ? "Enable Sound Effects (SFX)" : "Mute Sound Effects"}
        aria-label="Toggle Sound Effects"
      >
        {sfxMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
