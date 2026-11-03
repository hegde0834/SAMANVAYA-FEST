import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030612",
        foreground: "#f3f4f6",
        cyber: {
          darkest: "#02040a",
          dark: "#050918",
          card: "#091029",
          cardHover: "#0e183a",
          border: "#182752",
          borderLight: "#283e7a",
          cyan: "#00f3ff",
          cyanDark: "#0284c7",
          magenta: "#ff007f",
          magentaDark: "#be123c",
          purple: "#9d4edd",
          purpleDark: "#6b21a8",
          blue: "#1d63ff",
          gold: "#ffb703",
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 15px rgba(0, 243, 255, 0.45), 0 0 35px rgba(0, 243, 255, 0.2)",
        "neon-magenta": "0 0 15px rgba(255, 0, 127, 0.45), 0 0 35px rgba(255, 0, 127, 0.2)",
        "neon-purple": "0 0 15px rgba(157, 78, 221, 0.45), 0 0 35px rgba(157, 78, 221, 0.2)",
        "neon-gold": "0 0 15px rgba(255, 183, 3, 0.45), 0 0 35px rgba(255, 183, 3, 0.2)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        "glass-elevated": "0 12px 40px 0 rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-orbitron)", "var(--font-inter)", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "glow-line": "glowLine 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowLine: {
          "0%, 100%": { opacity: "0.4", filter: "brightness(1)" },
          "50%": { opacity: "0.9", filter: "brightness(1.5)" },
        },
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 243, 255, 0.05) 1px, transparent 1px)",
        "cyber-radial": "radial-gradient(circle at 50% 50%, rgba(29, 99, 255, 0.15) 0%, rgba(3, 6, 18, 0) 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
