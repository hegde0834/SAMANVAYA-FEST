"use client";

import React, { useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Disc3, Minimize2, Maximize2, Sparkles } from "lucide-react";
import { animeAudio, BgmState } from "@/lib/audio";

export default function SawanoBgmPlayer() {
  const [bgmState, setBgmState] = useState<BgmState>(animeAudio.getBgmState());
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const unsub = animeAudio.subscribeBgm((state) => {
      setBgmState(state);
    });

    // Gentle first-interaction auto-play listener for browsers with strict autoplay policies
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      unsub();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const handleTogglePlay = async () => {
    animeAudio.playClickSound();
    await animeAudio.toggleBgm();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    animeAudio.setBgmVolume(val);
  };

  return (
    <aside
      aria-label="Anime Background Music Player"
      className="fixed bottom-4 right-4 z-40 transition-all duration-300 font-sans"
    >
      {/* Minimized Pill Mode */}
      {!isExpanded ? (
        <div className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[#050918]/90 backdrop-blur-xl border border-[#00f3ff]/40 shadow-neon-cyan hover:border-[#ff007f]/60 transition-all">
          <button
            onClick={handleTogglePlay}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              bgmState.isPlaying
                ? "bg-gradient-to-tr from-[#00f3ff] to-[#ff007f] text-[#030612] shadow-neon-cyan animate-spin-slow"
                : "bg-[#091029] text-[#00f3ff] border border-[#182752] hover:border-[#00f3ff]"
            }`}
            title={bgmState.isPlaying ? "Pause Hiroyuki Sawano BGM" : "Play Hiroyuki Sawano BGM"}
            aria-label={bgmState.isPlaying ? "Pause BGM" : "Play BGM"}
          >
            {bgmState.isPlaying ? (
              <Pause className="w-4 h-4 fill-current text-[#030612]" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 text-left focus:outline-none group"
            title="Expand Music Player Controls"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-kanji font-black tracking-wider text-[#ff85a2] group-hover:text-pink-300 transition-colors flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#00f3ff]" />
                澤野 弘之 // HIROYUKI SAWANO
              </span>
              <span className="text-[11px] font-mono font-bold text-gray-200 group-hover:text-white transition-colors truncate max-w-[130px] sm:max-w-[160px]">
                {bgmState.isPlaying ? "♫ attack ON titan" : "Theme Music"}
              </span>
            </div>

            {/* Live Equalizer Bars */}
            <div className="flex items-end gap-0.5 h-3.5 px-1">
              <span
                className={`w-0.5 bg-[#00f3ff] rounded-full transition-all ${
                  bgmState.isPlaying ? "h-3 animate-pulse" : "h-1 opacity-40"
                }`}
              />
              <span
                className={`w-0.5 bg-[#ff007f] rounded-full transition-all ${
                  bgmState.isPlaying ? "h-4 animate-bounce" : "h-1 opacity-40"
                }`}
              />
              <span
                className={`w-0.5 bg-[#00f3ff] rounded-full transition-all ${
                  bgmState.isPlaying ? "h-2.5 animate-pulse" : "h-1 opacity-40"
                }`}
              />
            </div>
          </button>
        </div>
      ) : (
        /* Expanded Cyber Glass Card Mode */
        <div className="anime-manga-card p-4 rounded-2xl border border-[#00f3ff]/50 shadow-glass-elevated max-w-xs w-72 bg-[#050918]/95 backdrop-blur-2xl">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#182752]">
            <div className="flex items-center gap-2">
              <Disc3
                className={`w-4 h-4 text-[#00f3ff] ${
                  bgmState.isPlaying ? "animate-spin" : ""
                }`}
                style={{ animationDuration: "3s" }}
              />
              <span className="text-[10px] font-mono font-black tracking-widest text-[#00f3ff] uppercase">
                BGM DECK // サウンド
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-md text-gray-400 hover:text-white transition-colors"
              title="Minimize Player"
              aria-label="Minimize Player"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Track Information */}
          <div className="mb-4">
            <div className="text-[10px] font-kanji font-black tracking-widest text-[#ff85a2] uppercase">
              作曲: 澤野 弘之 (HIROYUKI SAWANO)
            </div>
            <div className="text-xs font-bold text-white tracking-wide truncate mt-0.5">
              attack ON titan
            </div>
            <div className="text-[10px] font-mono text-gray-400">
              Vocal: Mika Kobayashi • Epic Anime OST
            </div>
          </div>

          {/* Equalizer Visualizer */}
          <div className="flex items-end justify-center gap-1 h-6 bg-[#091029] rounded-lg p-1.5 mb-3 border border-[#182752]">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  bgmState.isPlaying
                    ? i % 2 === 0
                      ? "bg-[#00f3ff] animate-pulse"
                      : "bg-[#ff007f] animate-bounce"
                    : "bg-gray-700 h-1"
                }`}
                style={{
                  height: bgmState.isPlaying ? `${Math.sin(i + 1) * 12 + 14}px` : "3px",
                  animationDelay: `${(i % 5) * 120}ms`,
                }}
              />
            ))}
          </div>

          {/* Main Controls & Volume */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleTogglePlay}
              className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                bgmState.isPlaying
                  ? "bg-gradient-to-r from-[#ff007f] to-[#9d4edd] text-white shadow-neon-magenta"
                  : "cyber-button-cyan text-[#030612]"
              }`}
            >
              {bgmState.isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PAUSE BGM</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>PLAY SAWANO</span>
                </>
              )}
            </button>

            {/* Quick Volume Slider */}
            <div className="flex items-center gap-1.5 w-24">
              {bgmState.volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#00f3ff] shrink-0" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={bgmState.volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-[#182752] rounded-lg appearance-none cursor-pointer accent-[#00f3ff]"
                title={`Volume: ${Math.round(bgmState.volume * 100)}%`}
                aria-label="Sawano BGM Volume"
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
