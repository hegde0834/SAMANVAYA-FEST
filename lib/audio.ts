// Anime Synthesizer Audio Engine (Zero external assets, 0ms latency, Web Audio API)

class AnimeAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Default muted for smooth UX, user toggles in 1 click
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("samanvaya_anime_sfx_muted");
      if (saved !== null) {
        this.isMuted = saved === "true";
      }
    }
  }

  private initContext() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("samanvaya_anime_sfx_muted", String(this.isMuted));
    }
    this.listeners.forEach((l) => l(this.isMuted));
    if (!this.isMuted) {
      this.playPowerUpSound();
    }
    return this.isMuted;
  }

  public subscribe(callback: (muted: boolean) => void): () => void {
    this.listeners.add(callback);
    callback(this.isMuted);
    return () => this.listeners.delete(callback);
  }

  // Anime hover blip (soft high chime)
  public playHoverSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08); // E6

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio context restricted or unavailable
    }
  }

  // Anime click confirmation sound
  public playClickSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.04); // A5
      osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.08); // D6

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // Audio context restricted
    }
  }

  // Anime power-up / Ki aura activation sound
  public playPowerUpSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.35);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2500, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.38);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.38);
    } catch {
      // Audio context restricted
    }
  }

  // Anime victory fanfare (for registration pass and S-Rank completion)
  public playVictoryFanfare() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + i * 0.09;
        gain.gain.setValueAtTime(0.07, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // Audio context restricted
    }
  }
}

export const animeAudio = new AnimeAudioEngine();
