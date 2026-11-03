// Anime Synthesizer Audio Engine & Hiroyuki Sawano (澤野 弘之) BGM Controller

export interface BgmState {
  isPlaying: boolean;
  volume: number;
  title: string;
  composer: string;
}

class AnimeAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // SFX muted state
  private listeners: Set<(muted: boolean) => void> = new Set();

  // Hiroyuki Sawano BGM Controller
  private bgmAudio: HTMLAudioElement | null = null;
  private isBgmPlaying: boolean = false;
  private bgmVolume: number = 0.45;
  private bgmListeners: Set<(state: BgmState) => void> = new Set();
  public readonly bgmTitle = "attack ON titan (Vocal: Mika Kobayashi)";
  public readonly bgmComposer = "Hiroyuki Sawano // 澤野 弘之";

  constructor() {
    if (typeof window !== "undefined") {
      const savedSfx = localStorage.getItem("samanvaya_anime_sfx_muted");
      if (savedSfx !== null) {
        this.isMuted = savedSfx === "true";
      }

      const savedVol = localStorage.getItem("samanvaya_bgm_volume");
      if (savedVol !== null) {
        const v = parseFloat(savedVol);
        if (!isNaN(v) && v >= 0 && v <= 1) {
          this.bgmVolume = v;
        }
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

  // --- SFX Controls ---
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

  // --- Hiroyuki Sawano BGM Controller ---
  private initBgmAudio(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    if (!this.bgmAudio) {
      const audio = new Audio("/audio/sawano-bgm.mp3");
      audio.loop = true;
      audio.volume = this.bgmVolume;
      audio.preload = "auto";

      audio.addEventListener("play", () => {
        this.isBgmPlaying = true;
        this.notifyBgmListeners();
      });

      audio.addEventListener("pause", () => {
        this.isBgmPlaying = false;
        this.notifyBgmListeners();
      });

      audio.addEventListener("ended", () => {
        this.isBgmPlaying = false;
        this.notifyBgmListeners();
      });

      audio.addEventListener("error", (e) => {
        console.warn("Sawano BGM playback notice:", e);
        this.isBgmPlaying = false;
        this.notifyBgmListeners();
      });

      this.bgmAudio = audio;
    }
    return this.bgmAudio;
  }

  private notifyBgmListeners() {
    const state: BgmState = {
      isPlaying: this.isBgmPlaying,
      volume: this.bgmVolume,
      title: this.bgmTitle,
      composer: this.bgmComposer,
    };
    this.bgmListeners.forEach((fn) => fn(state));
  }

  public subscribeBgm(callback: (state: BgmState) => void): () => void {
    this.bgmListeners.add(callback);
    callback({
      isPlaying: this.isBgmPlaying,
      volume: this.bgmVolume,
      title: this.bgmTitle,
      composer: this.bgmComposer,
    });
    return () => this.bgmListeners.delete(callback);
  }

  public async playBgm(): Promise<boolean> {
    try {
      const audio = this.initBgmAudio();
      if (!audio) return false;
      audio.volume = this.bgmVolume;
      await audio.play();
      this.isBgmPlaying = true;
      this.notifyBgmListeners();
      return true;
    } catch (err) {
      console.warn("Audio autoplay policy: interaction required before playback", err);
      this.isBgmPlaying = false;
      this.notifyBgmListeners();
      return false;
    }
  }

  public pauseBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.isBgmPlaying = false;
      this.notifyBgmListeners();
    }
  }

  public toggleBgm(): Promise<boolean> {
    if (this.isBgmPlaying) {
      this.pauseBgm();
      return Promise.resolve(false);
    } else {
      return this.playBgm();
    }
  }

  public setBgmVolume(val: number) {
    const clamped = Math.max(0, Math.min(1, val));
    this.bgmVolume = clamped;
    if (this.bgmAudio) {
      this.bgmAudio.volume = clamped;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("samanvaya_bgm_volume", clamped.toString());
    }
    this.notifyBgmListeners();
  }

  public getBgmState(): BgmState {
    return {
      isPlaying: this.isBgmPlaying,
      volume: this.bgmVolume,
      title: this.bgmTitle,
      composer: this.bgmComposer,
    };
  }

  // --- Sound Effects Synthesis ---
  public playHoverSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio context restricted
    }
  }

  public playClickSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.04);
      osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.08);

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

  public playVictoryFanfare() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
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
