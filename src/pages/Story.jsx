// src/pages/Story.jsx
import React, { useEffect, useRef, useState } from "react";

const base = import.meta.env.BASE_URL;

const items = [
  {
    year: "2016 — First date",
    label: "Coffee date",
    icon: "☕",
    text:
      "Whether it was August or September depends on who you ask, but we do agree that a quick coffee somehow turned into hours of talking about travel, languages, German literature and Austrian dialects. Looking back, that was the moment, even if neither of us realised it at the time, and before long Melbourne became the first of many places we would travel to together.",
    img: `${base}Melbourne2016.jpg`,
    caption: "Where it all began ☕",
  },
  {
    year: "2017–present — On the trail",
    label: "Into the wild",
    icon: "⛰️",
    text:
      "Then came multi-day hikes through the Budawangs, Cradle Mountain and the Tasmanian high country. The Walls of Jerusalem and Central Plateau became one of our favourite places to return to, with plenty of off-track exploring, wrong turns, early starts for photos, and one memorable summer snowstorm that folded our tent. Somehow, it only made us want to go back.",
    img: `${base}DicksonsKingdom.jpeg`,
    caption: "Rain, mud, no regrets",
  },
  {
    year: "2017–present — The world",
    label: "Adventures abroad",
    icon: "🌏",
    text:
      "With Julia's family in Austria, Europe became somewhere we returned to often. Karlstetten was usually our base for trips to places like Florence, Barcelona and Iceland, while closer to home we kept finding excuses to explore Australia too, from coastlines and mountains to the outback. Wherever we were, we usually found ourselves looking for the quieter road, the longer walk, the path a little less travelled and the next landscape or waterfall Gerard would inevitably stop to photograph.",
    img: `${base}Vietnam.jpg`,
    caption: "Two people who can't sit still",
  },
  {
    year: "2020 — Apollo",
    label: "Apollo Takes Over",
    icon: "🐱",
    text:
      "In 2020, Apollo joined the family and wasted no time claiming the best spot on the couch, the bed, and any warm lap he could find. He has not given up any of them since, though he occasionally allows us to share.",
    img: `${base}familycat.jpg`,
    caption: "The real boss of the house 🐱",
  },
  {
    year: "2024 — Canberra",
    label: "New chapter",
    icon: "🏡",
    text:
      "After years in Sydney, we packed up and moved to Canberra, looking for a new city, a slower pace and a bit more room to breathe. We found four proper seasons, the Snowy Mountains within reach, endless trails, and more good food and wine than we expected. It turned out to be exactly what we needed.",
    img: `${base}MoveToCanberra.jpg`,
    caption: "New city, new view",
  },
  {
    year: "January 2025 — The proposal",
    label: "She said yes",
    icon: "❤️",
    text:
      "On our tenth trip to Tasmania, we returned to a hidden waterfall in the Tarkine, the kind of place you only reach if you know where to look. No signs, nobody else around, just the hush of the forest, the sound of water, and the two of us in muddy boots, standing in the creek beneath the falls. Gerard asked, and Julia said yes.",
    img: `${base}tassieproposal1.jpg`,
    caption: "She said yes 💍",
  },
  {
    year: "2025 — Expecting",
    label: "Growing family",
    icon: "🤍",
    text:
      "Right in the middle of planning the wedding, we found out our little family was about to get bigger. Before we make it to Kangaroo Valley, we'll be starting our biggest adventure yet, with one more little person along for the ride.",
    img: `${base}palm.jpg`,
    caption: "Our biggest adventure yet",
  },
  {
    year: "2026 — Kangaroo Valley",
    label: "Wildwood",
    icon: "✨",
    text:
      "After years of chasing waterfalls, mountain tracks and quiet corners of the bush, Wildwood feels like the right place to bring everyone together, surrounded by rainforest, sandstone cliffs, valley views and the quiet of the bush.",
    img: `${base}Wildwoodlook.jpg`,
    caption: "Where our story continues",
  },
];

const PALETTE = ["#c9742f", "#79987c", "#9e4139", "#416348", "#a8763e"];

const ORBS = [
  { cls: "o1", depth: 0.22 },
  { cls: "o2", depth: 0.4 },
  { cls: "o3", depth: 0.16 },
  { cls: "o4", depth: 0.55 },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ---------- Animated parallax + particle background ---------- */
function ParticleField() {
  const canvasRef = useRef(null);
  const orbRefs = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots = [];
    let leaves = [];
    let raf = null;
    let t = 0;

    // Eased pointer offset (mouse parallax)
    let targetMX = 0;
    let targetMY = 0;
    let mx = 0;
    let my = 0;

    // Pre-render soft glow sprites (cheaper than per-frame shadowBlur)
    const GLOW_RGB = ["227,184,115", "168,192,160", "201,116,47", "240,222,180"];
    const sprites = GLOW_RGB.map((rgb) => {
      const s = 64;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const g = c.getContext("2d");
      const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      grad.addColorStop(0, "rgba(255,255,255,0.9)");
      grad.addColorStop(0.3, `rgba(${rgb},0.6)`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, s, s);
      return c;
    });

    const LEAF_COLORS = [
      "rgba(121,152,124,0.55)",
      "rgba(101,130,96,0.5)",
      "rgba(168,140,72,0.5)",
      "rgba(158,65,57,0.4)",
    ];

    function makeDot() {
      const depth = Math.random() * 0.7 + 0.3;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: (Math.random() * 2.4 + 0.8) * depth,
        depth,
        vy: -(Math.random() * 0.22 + 0.04) * depth,
        swayAmp: Math.random() * 1.4 + 0.3,
        swayFreq: Math.random() * 0.015 + 0.004,
        phase: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.5 + 0.25,
        twinkle: Math.random() * 0.04 + 0.01,
        sprite: Math.floor(Math.random() * sprites.length),
      };
    }

    function makeLeaf() {
      const depth = Math.random() * 0.6 + 0.4;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * 9 + 6) * depth,
        depth,
        vy: (Math.random() * 0.35 + 0.12) * depth,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.012,
        swayAmp: Math.random() * 1.8 + 0.6,
        swayFreq: Math.random() * 0.012 + 0.004,
        phase: Math.random() * Math.PI * 2,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
      };
    }

    function init() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const dotCount = Math.min(75, Math.round(area / 22000));
      const leafCount = Math.min(16, Math.round(area / 95000));
      dots = Array.from({ length: dotCount }, makeDot);
      leaves = Array.from({ length: leafCount }, makeLeaf);
    }

    function drawLeaf(p, ox, oy) {
      const px = p.x + ox * p.depth;
      const py = p.y + oy * p.depth;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size * 0.62, 0, 0, p.size);
      ctx.quadraticCurveTo(-p.size * 0.62, 0, 0, -p.size);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.85);
      ctx.lineTo(0, p.size * 0.85);
      ctx.stroke();
      ctx.restore();
    }

    function frame() {
      t += 1;
      mx += (targetMX - mx) * 0.05;
      my += (targetMY - my) * 0.05;
      const scrollY = window.scrollY || 0;

      ctx.clearRect(0, 0, width, height);

      // Drifting glow motes (rise upward)
      for (const p of dots) {
        p.y += p.vy;
        p.x += Math.sin(t * p.swayFreq + p.phase) * 0.3;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        const alpha =
          p.baseAlpha * (0.55 + 0.45 * Math.sin(t * p.twinkle + p.phase));
        const px = p.x + mx * p.depth;
        const py = p.y + my * p.depth;
        const d = p.r * 7;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.drawImage(sprites[p.sprite], px - d / 2, py - d / 2, d, d);
      }
      ctx.globalAlpha = 1;

      // Falling eucalyptus leaves
      for (const p of leaves) {
        p.y += p.vy;
        p.angle += p.spin;
        p.x += Math.sin(t * p.swayFreq + p.phase) * (p.swayAmp * 0.12);
        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        drawLeaf(p, mx, my);
      }

      // Parallax orbs (mouse + scroll + gentle autonomous drift)
      orbRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = ORBS[i].depth;
        const driftX = Math.sin(t * 0.004 + i) * 18;
        const driftY = Math.cos(t * 0.003 + i * 1.5) * 14;
        const tx = mx * d * 1.6 + driftX;
        const ty = my * d * 1.6 + scrollY * d * 0.18 + driftY;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });

      raf = requestAnimationFrame(frame);
    }

    function onMouseMove(e) {
      targetMX = (e.clientX / window.innerWidth - 0.5) * 80;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 80;
    }

    init();
    frame();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="journey-bg" aria-hidden>
      {ORBS.map((orb, i) => (
        <span
          key={orb.cls}
          className={`journey-orb ${orb.cls}`}
          ref={(el) => (orbRefs.current[i] = el)}
        />
      ))}
      <canvas ref={canvasRef} className="journey-canvas" />
    </div>
  );
}

function useRevealOnScroll() {
  const [visible, setVisible] = useState(() => new Set());
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setVisible((prev) => {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -12% 0px" }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return { visible, refs };
}

export default function Story() {
  const { visible, refs } = useRevealOnScroll();
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    let raf = null;

    function measure() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const scrolled = -rect.top + window.innerHeight * 0.4;
      const pct = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(pct);
      raf = null;
    }

    function handleScroll() {
      if (raf == null) raf = requestAnimationFrame(measure);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    measure();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500;1,600&family=Caveat:wght@500;600&display=swap');

        .journey-page {
          position: relative;
          z-index: 1;
        }

        /* ===== Parallax / particle background ===== */
        .journey-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .journey-canvas {
          position: absolute;
          inset: 0;
        }

        .journey-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.45;
          will-change: transform;
          animation: orbBreathe 14s ease-in-out infinite;
        }
        .journey-orb.o1 {
          width: 420px; height: 420px;
          left: -140px; top: 4%;
          background: radial-gradient(circle, rgba(121,152,124,0.55), transparent 70%);
        }
        .journey-orb.o2 {
          width: 480px; height: 480px;
          right: -180px; top: 30%;
          background: radial-gradient(circle, rgba(201,116,47,0.4), transparent 70%);
          animation-delay: -5s;
        }
        .journey-orb.o3 {
          width: 380px; height: 380px;
          left: -120px; bottom: 6%;
          background: radial-gradient(circle, rgba(158,65,57,0.32), transparent 70%);
          animation-delay: -9s;
        }
        .journey-orb.o4 {
          width: 300px; height: 300px;
          left: 45%; top: 55%;
          background: radial-gradient(circle, rgba(234,190,115,0.4), transparent 70%);
          animation-delay: -12s;
        }

        @keyframes orbBreathe {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.55; }
        }

        /* ===== Hero ===== */
        .journey-hero {
          position: relative;
          text-align: center;
          padding: 26px 0 6px;
          animation: journeyFadeUp 0.9s ease both;
        }

        .journey-kicker {
          display: inline-block;
          font-family: "Caveat", cursive;
          font-size: 1.4rem;
          color: #c9742f;
          transform: rotate(-3deg);
          margin-bottom: 4px;
        }

        .journey-hero h2 {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(2.6rem, 2rem + 2.6vw, 4rem);
          margin: 0 0 14px;
          letter-spacing: 0.01em;
          background: linear-gradient(100deg, #2c3e50 30%, #c9742f 50%, #2c3e50 70%);
          background-size: 220% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: journeyShine 7s linear infinite;
        }

        @keyframes journeyShine {
          to { background-position: -220% center; }
        }

        .journey-hero p {
          max-width: 640px;
          margin: 0 auto;
          color: #5a636e;
          font-size: 1.08rem;
          line-height: 1.85;
        }

        @keyframes journeyFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ===== Timeline ===== */
        .journey-timeline {
          position: relative;
          margin: 60px auto 10px;
          max-width: 1140px;
          padding: 0 10px;
        }

        .journey-line-track {
          position: absolute;
          left: 50%;
          top: 6px;
          bottom: 6px;
          width: 4px;
          margin-left: -2px;
          background: rgba(123,79,63,0.12);
          border-radius: 4px;
          z-index: 0;
        }

        .journey-line-fill {
          position: absolute;
          left: 50%;
          top: 6px;
          width: 4px;
          margin-left: -2px;
          height: var(--p, 0%);
          border-radius: 4px;
          background: linear-gradient(to bottom, var(--sage, #79987c), var(--leaf, #416348), #c9742f);
          box-shadow: 0 0 16px rgba(121,152,124,0.7);
          z-index: 1;
          transition: height 0.12s linear;
        }

        .journey-line-fill::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -7px;
          width: 16px;
          height: 16px;
          margin-left: -8px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff, #c9742f 60%, transparent 72%);
          box-shadow: 0 0 18px rgba(201,116,47,0.9);
          animation: travelerPulse 1.8s ease-in-out infinite;
        }

        @keyframes travelerPulse {
          0%, 100% { transform: scale(0.85); opacity: 0.85; }
          50% { transform: scale(1.25); opacity: 1; }
        }

        .journey-row {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 48px;
          margin: 110px 0;
        }

        .journey-row.left { flex-direction: row; }
        .journey-row.right { flex-direction: row-reverse; }

        .journey-row.left .journey-card { margin-right: 28px; }
        .journey-row.right .journey-card { margin-left: 28px; }

        .journey-card,
        .journey-figure-wrap {
          flex: 1 1 0;
          min-width: 0;
        }

        .journey-card {
          background: rgba(255,250,244,0.9);
          backdrop-filter: blur(4px);
          border-radius: 4px 18px 18px 4px;
          padding: 28px 32px;
          box-shadow: 0 18px 45px rgba(0,0,0,0.08);
          border: 1px solid rgba(123,79,63,0.12);
          border-left: 3px solid var(--accent, #c9742f);
          position: relative;
          opacity: 0;
          transform: translateX(-46px) rotate(-1deg);
          transition: opacity 0.7s cubic-bezier(.21,.85,.32,1), transform 0.7s cubic-bezier(.21,.85,.32,1);
        }

        .journey-row.right .journey-card {
          border-left: none;
          border-right: 3px solid var(--accent, #c9742f);
          border-radius: 18px 4px 4px 18px;
          transform: translateX(46px) rotate(1deg);
        }

        .journey-row.is-visible .journey-card {
          opacity: 1;
          transform: translateX(0) rotate(0deg);
        }

        .journey-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .journey-icon {
          font-size: 1.5rem;
          display: inline-block;
          animation: journeyBob 3.4s ease-in-out infinite;
        }

        @keyframes journeyBob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-8deg); }
        }

        .journey-year {
          font-family: "Cormorant Garamond", serif;
          font-style: italic;
          color: var(--accent, #c9742f);
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        .journey-title {
          font-family: "Cormorant Garamond", serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 8px;
        }

        .journey-text {
          color: #5a636e;
          line-height: 1.85;
          font-size: 1.02rem;
          margin: 0;
        }

        /* Polaroid photos */
        .journey-figure-wrap {
          display: flex;
          justify-content: center;
          opacity: 0;
          transform: scale(0.82);
          transition: opacity 0.7s cubic-bezier(.21,.85,.32,1) 0.1s, transform 0.7s cubic-bezier(.21,.85,.32,1) 0.1s;
        }

        .journey-row.is-visible .journey-figure-wrap {
          opacity: 1;
          transform: scale(1);
        }

        .journey-polaroid {
          position: relative;
          background: #fffdfa;
          padding: 14px 14px 46px;
          border-radius: 6px;
          box-shadow: 0 22px 55px rgba(0,0,0,0.18);
          transform: rotate(-3deg);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          max-width: 360px;
          width: 100%;
        }

        .journey-row.right .journey-polaroid { transform: rotate(3deg); }

        .journey-polaroid:hover {
          transform: rotate(0deg) translateY(-6px) scale(1.03);
          box-shadow: 0 30px 70px rgba(0,0,0,0.24);
        }

        .journey-polaroid::before {
          content: "";
          position: absolute;
          top: -14px;
          left: 50%;
          width: 64px;
          height: 26px;
          margin-left: -32px;
          background: rgba(250, 240, 215, 0.8);
          border: 1px solid rgba(123,79,63,0.18);
          box-shadow: 0 3px 8px rgba(0,0,0,0.12);
          transform: rotate(-4deg);
        }
        .journey-row.right .journey-polaroid::before { transform: rotate(4deg); }

        .journey-polaroid .photo-frame {
          border-radius: 2px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
        }

        .journey-polaroid img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease, filter 0.6s ease;
          filter: saturate(0.92) sepia(0.08);
        }

        .journey-polaroid:hover img {
          transform: scale(1.07);
          filter: saturate(1.05) sepia(0);
        }

        .journey-caption {
          display: block;
          text-align: center;
          margin-top: 12px;
          font-family: "Caveat", cursive;
          font-size: 1.35rem;
          color: #5e3b2f;
          transform: rotate(-1deg);
        }
        .journey-row.right .journey-caption { transform: rotate(1deg); }

        .journey-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 18px;
          height: 18px;
          margin-left: -9px;
          margin-top: -9px;
          border-radius: 50%;
          background: #fbf7f1;
          border: 3px solid var(--accent, #c9742f);
          box-shadow: 0 0 0 6px rgba(65,99,72,0.10);
          z-index: 2;
          transform: scale(0.6);
          transition: transform 0.5s cubic-bezier(.34,1.56,.64,1), background 0.4s ease;
        }

        .journey-row.is-visible .journey-dot {
          background: var(--accent, #c9742f);
          transform: scale(1);
        }

        /* Finale */
        .journey-finale {
          position: relative;
          text-align: center;
          padding: 60px 20px 80px;
          opacity: 0;
          transform: translateY(28px) scale(0.97);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }

        .journey-finale.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .journey-finale h3 {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(1.9rem, 1.4rem + 1.8vw, 2.8rem);
          color: #2c3e50;
          margin-bottom: 12px;
        }

        .journey-finale p {
          color: #5a636e;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.85;
        }

        .journey-finale .heart {
          display: inline-block;
          color: #c9742f;
          animation: journeyPulseHeart 1.8s ease-in-out infinite;
        }

        .journey-finale .sparkle-row {
          margin-top: 18px;
          font-size: 1.3rem;
          letter-spacing: 0.4em;
          opacity: 0.7;
        }

        .journey-finale .sparkle-row span {
          display: inline-block;
          animation: journeyTwinkle 2.4s ease-in-out infinite;
        }
        .journey-finale .sparkle-row span:nth-child(2) { animation-delay: 0.3s; }
        .journey-finale .sparkle-row span:nth-child(3) { animation-delay: 0.6s; }
        .journey-finale .sparkle-row span:nth-child(4) { animation-delay: 0.9s; }

        @keyframes journeyTwinkle {
          0%, 100% { opacity: 0.25; transform: translateY(0) scale(0.9); }
          50% { opacity: 1; transform: translateY(-5px) scale(1.15); }
        }

        @keyframes journeyPulseHeart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-orb,
          .journey-hero h2,
          .journey-icon,
          .journey-line-fill::after,
          .journey-finale .heart,
          .journey-finale .sparkle-row span {
            animation: none !important;
          }
        }

        @media (max-width: 860px) {
          .journey-line-track,
          .journey-line-fill { left: 22px; margin-left: 0; }

          .journey-row,
          .journey-row.left,
          .journey-row.right {
            flex-direction: column;
            align-items: stretch;
            margin-left: 52px;
            gap: 20px;
            margin-bottom: 80px;
            margin-top: 0;
          }

          .journey-card,
          .journey-row.right .journey-card,
          .journey-row.left .journey-card {
            margin-left: 0;
            margin-right: 0;
            transform: translateX(0) rotate(0deg);
            border-radius: 4px 18px 18px 4px;
            border-left: 3px solid var(--accent, #c9742f);
            border-right: none;
          }

          .journey-row.is-visible .journey-card { transform: none; }

          .journey-polaroid,
          .journey-row.right .journey-polaroid { transform: rotate(-2deg); }

          /* Anchor the dot to the trail's vertical rhythm, not the
             card's variable height — fixed offset from the row's top
             so it lines up with the dashed/glowing track consistently */
          .journey-dot {
            left: 22px;
            top: 38px;
            margin-top: 0;
          }
        }
      `}</style>

      <ParticleField />

      <div className="journey-page">
        <section className="journey-hero">
          <span className="journey-kicker">a little detour through the past decade</span>
          <h2>Our Journey</h2>
          <p>
            A lot of our favourite memories have come from travelling together:
            long drives, questionable directions, muddy boots, waterfall walks,
            and the views that made every bit of it worth it. Here's a little of
            how we got from a chance meeting in Sydney to a wedding in the
            Kangaroo Valley bush.
          </p>
        </section>

        <section
          className="journey-timeline"
          ref={sectionRef}
          style={{ "--p": `${progress * 100}%` }}
        >
          <div className="journey-line-track" />
          <div className="journey-line-fill" />

          {items.map((it, i) => {
            const left = i % 2 === 0;
            const accent = PALETTE[i % PALETTE.length];
            return (
              <div
                key={it.year}
                ref={(el) => (refs.current[i] = el)}
                data-index={i}
                className={`journey-row ${left ? "left" : "right"}${visible.has(i) ? " is-visible" : ""}`}
                style={{ "--accent": accent, transitionDelay: `${Math.min(i, 5) * 70}ms` }}
              >
                <span className="journey-dot" aria-hidden />

                <article className="journey-card">
                  <div className="journey-meta">
                    <span className="journey-icon" aria-hidden>{it.icon}</span>
                    <span className="journey-year">{it.year}</span>
                  </div>
                  <h3 className="journey-title">{it.label}</h3>
                  <p className="journey-text">{it.text}</p>
                </article>

                <div className="journey-figure-wrap">
                  <figure className="journey-polaroid">
                    <div className="photo-frame">
                      <img src={it.img} alt={it.label} loading="lazy" />
                    </div>
                    <figcaption className="journey-caption">{it.caption}</figcaption>
                  </figure>
                </div>
              </div>
            );
          })}
        </section>

        <section
          className={`journey-finale${visible.has(items.length - 1) ? " is-visible" : ""}`}
        >
          <h3>And now, the next adventure <span className="heart">♥</span></h3>
          <p>
            Thank you for being part of our story so far. We can't wait to
            celebrate this next part with you all in Kangaroo Valley.
          </p>
          <div className="sparkle-row" aria-hidden>
            <span>✦</span><span>✦</span><span>✦</span><span>✦</span>
          </div>
        </section>
      </div>
    </main>
  );
}
