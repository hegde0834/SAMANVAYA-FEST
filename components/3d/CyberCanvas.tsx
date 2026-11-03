"use client";

import React, { useEffect, useRef } from "react";

interface SakuraPetal {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  petalType: number; // slight shape variation
  flipAngle: number;
  vFlip: number;
  opacity: number;
  color: string;
}

interface CyberSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

interface EnergyRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

export default function CyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      ctx.fillStyle = "#030612";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Sakura Petals
    const petalColors = [
      "rgba(255, 183, 197, 0.75)", // Classic Sakura Pink
      "rgba(255, 192, 203, 0.7)",  // Soft Pastel Pink
      "rgba(255, 105, 180, 0.6)",  // Hot Anime Pink
      "rgba(254, 215, 226, 0.8)",  // Pure Blossom White-Pink
      "rgba(244, 114, 182, 0.65)", // Cyber Neon Cherry
    ];

    const petalCount = Math.min(width > 768 ? 45 : 22, 55);
    const petals: SakuraPetal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 7 + 6,
        vx: Math.random() * 0.8 + 0.4, // gentle drift right
        vy: Math.random() * 0.9 + 0.6, // downward float
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.02,
        petalType: Math.floor(Math.random() * 3),
        flipAngle: Math.random() * Math.PI,
        vFlip: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.4 + 0.5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    // Glowing Cyber Sparks & Constellations
    const sparkCount = Math.min(width > 768 ? 40 : 20, 45);
    const sparks: CyberSparkle[] = [];
    const sparkColors = ["#00f3ff", "#ff007f", "#9d4edd", "#ffb703", "#38bdf8"];

    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 1,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    // Interactive Energy Ripples
    const ripples: EnergyRipple[] = [];

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseInside = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseInside = true;
    };

    const handleMouseLeave = () => {
      isMouseInside = false;
    };

    // On-click Anime Ki Burst
    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: Math.min(width, height) * 0.25,
        color: Math.random() > 0.5 ? "#00f3ff" : "#ff007f",
        alpha: 0.9,
      });

      // Spawn 8 extra burst petals on click
      for (let i = 0; i < 8; i++) {
        const rad = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1.5;
        petals.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 5,
          vx: Math.cos(rad) * speed,
          vy: Math.sin(rad) * speed,
          angle: Math.random() * Math.PI * 2,
          vAngle: (Math.random() - 0.5) * 0.05,
          petalType: Math.floor(Math.random() * 3),
          flipAngle: Math.random() * Math.PI,
          vFlip: 0.04,
          opacity: 0.9,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
        });
      }
      // Keep petals capped
      if (petals.length > 70) {
        petals.splice(0, petals.length - 70);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    // Draw realistic Sakura Petal
    const drawPetal = (
      x: number,
      y: number,
      size: number,
      angle: number,
      flipAngle: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(1, Math.cos(flipAngle)); // 3D flip effect

      ctx.beginPath();
      // Curved heart-leaf cherry blossom petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size * 0.5, -size * 0.5, size * 0.8, -size * 0.2, size, 0);
      ctx.bezierCurveTo(size * 0.8, size * 0.2, size * 0.5, size * 0.5, 0, 0);

      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(255, 105, 180, 0.4)";
      ctx.fill();
      ctx.restore();
    };

    let tick = 0;

    const render = () => {
      tick += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Energy Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 3.5;
        rip.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color;
        ctx.globalAlpha = rip.alpha;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = rip.color;
        ctx.stroke();

        if (rip.alpha < 0.02 || rip.radius > rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // 2. Cyber Sparks & Constellation Lines
      for (let i = 0; i < sparks.length; i++) {
        const sp = sparks[i];

        sp.x += sp.vx;
        sp.y += sp.vy;

        if (sp.x < 0) sp.x = width;
        if (sp.x > width) sp.x = 0;
        if (sp.y < 0) sp.y = height;
        if (sp.y > height) sp.y = 0;

        const pulse = Math.sin(tick * 3 + i) * 0.3 + 0.7;
        const currentAlpha = sp.alpha * pulse;

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = currentAlpha * 0.7;
        ctx.shadowBlur = 10;
        ctx.shadowColor = sp.color;
        ctx.fill();

        // Connect nearby sparks with neon thread
        for (let j = i + 1; j < sparks.length; j++) {
          const sp2 = sparks[j];
          const dx = sp.x - sp2.x;
          const dy = sp.y - sp2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(sp.x, sp.y);
            ctx.lineTo(sp2.x, sp2.y);
            ctx.strokeStyle = sp.color;
            ctx.globalAlpha = (1 - dist / 90) * 0.12;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // 3. Realistic Falling Anime Sakura Petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Natural swaying oscillation
        p.angle += p.vAngle;
        p.flipAngle += p.vFlip;

        let windEffect = Math.sin(tick + i) * 0.5;

        // Interactive mouse wind deflection
        if (isMouseInside) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 160) {
            const push = (1 - mDist / 160) * 2.5;
            p.x += (mdx / mDist) * push;
            p.y += (mdy / mDist) * push;
          }
        }

        p.x += p.vx + windEffect;
        p.y += p.vy;

        // Screen wrapping with natural reset
        if (p.x > width + 40) p.x = -20;
        if (p.x < -40) p.x = width + 20;
        if (p.y > height + 40) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        drawPetal(p.x, p.y, p.size, p.angle, p.flipAngle, p.color, p.opacity);
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
