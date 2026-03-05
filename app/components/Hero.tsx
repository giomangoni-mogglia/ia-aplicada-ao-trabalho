"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import { CHECKOUT_URL } from "../constants";

const words = ["A maioria dos cursos de IA", "te ensina a", "construir o carro.", "Esse te ensina", "a dirigir."];

function WordReveal() {
  return (
    <h1
      className="font-heading font-bold text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05] tracking-tighter text-parchment"
      style={{ letterSpacing: "-0.04em" }}
    >
      {words.map((chunk, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className={`inline ${i === 2 ? "text-goldenrod" : ""} ${
            i === 4 ? "italic font-serif text-tomato" : ""
          }`}
        >
          {chunk}{" "}
        </motion.span>
      ))}
    </h1>
  );
}

function OrbitalSystem() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      {/* Central glow */}
      <div className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full bg-[radial-gradient(circle,rgba(45,106,138,0.18)_0%,rgba(45,106,138,0.05)_60%,transparent_100%)]" />

      {/* Human silhouette (abstract) */}
      <div className="absolute w-24 h-24 md:w-36 md:h-36">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.08)_0%,transparent_70%)]" />
        <svg viewBox="0 0 80 100" className="w-full h-full opacity-20" fill="none">
          <circle cx="40" cy="18" r="12" stroke="#F5F2EC" strokeWidth="1.5" />
          <path d="M20 45 Q40 38 60 45 L62 80 Q40 88 18 80 Z" stroke="#F5F2EC" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Ring 1 */}
      <div
        className="absolute rounded-full"
        style={{
          width: "260px", height: "100px",
          border: "1px solid rgba(45,106,138,0.3)",
          transform: "rotateX(72deg)",
          animation: "orbit-rotate 22s linear infinite",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: "8px", height: "8px",
            background: "#D4A017",
            top: "-4px", left: "50%", marginLeft: "-4px",
            boxShadow: "0 0 8px #D4A017",
          }}
        />
        <div
          className="absolute rounded-lg"
          style={{
            width: "72px", height: "48px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            bottom: "-24px", left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="absolute inset-2">
            <div className="h-1.5 w-10 bg-white/20 rounded mb-1" />
            <div className="h-1 w-7 bg-white/10 rounded mb-1" />
            <div className="h-1 w-9 bg-cerulean/40 rounded" />
          </div>
        </div>
      </div>

      {/* Ring 2 */}
      <div
        className="absolute rounded-full"
        style={{
          width: "400px", height: "150px",
          border: "1px solid rgba(45,106,138,0.2)",
          transform: "rotateX(72deg) rotateZ(60deg)",
          animation: "orbit-rotate 16s linear infinite reverse",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: "6px", height: "6px",
            background: "#F95738",
            top: "-3px", left: "50%", marginLeft: "-3px",
            boxShadow: "0 0 10px #F95738",
          }}
        />
      </div>

      {/* Ring 3 */}
      <div
        className="absolute rounded-full"
        style={{
          width: "520px", height: "200px",
          border: "1px solid rgba(212,160,23,0.12)",
          transform: "rotateX(72deg) rotateZ(-40deg)",
          animation: "orbit-rotate 28s linear infinite",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: "5px", height: "5px",
            background: "#2D6A8A",
            top: "-2.5px", left: "50%", marginLeft: "-2.5px",
            boxShadow: "0 0 8px #2D6A8A",
          }}
        />
        <div
          className="absolute rounded-lg"
          style={{
            width: "80px", height: "54px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
            top: "-27px", right: "20px",
          }}
        >
          <div className="absolute inset-2">
            <div className="h-1.5 w-12 bg-white/20 rounded mb-1" />
            <div className="h-8 w-full bg-cerulean/15 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle mouse parallax on orbital system
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      const orbital = el.querySelector(".orbital-parallax") as HTMLElement;
      if (orbital) {
        orbital.style.transform = `translate(${x}px, ${y}px)`;
        orbital.style.transition = "transform 0.8s ease";
      }
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden aurora-bg noise-overlay pt-20"
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className={`particle particle-${n}`} />
        ))}
      </div>

      {/* Deep glow radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(45,106,138,0.1)_0%,transparent_70%)]" />
      </div>

      {/* Orbital — desktop only */}
      <div className="orbital-parallax hidden lg:block absolute right-0 top-0 bottom-0 w-1/2">
        <OrbitalSystem />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 py-20 lg:py-32 w-full">
        <div className="max-w-2xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-goldenrod animate-pulse-ring" />
            <span
              className="text-xs font-body font-600 uppercase tracking-widest text-goldenrod border border-goldenrod/30 rounded-full px-4 py-1.5"
              style={{ letterSpacing: "0.12em" }}
            >
              Para profissionais que já usam IA no trabalho
            </span>
          </motion.div>

          {/* Headline */}
          <WordReveal />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[clamp(1rem,2vw,1.2rem)] text-parchment/65 font-body leading-relaxed max-w-xl"
          >
            Em{" "}
            <span className="text-parchment font-semibold">2 horas</span>, você
            identifica quais tarefas do seu trabalho podem ser otimizadas com
            IA, qual ferramenta usar em cada uma — e como fazer isso{" "}
            <span className="text-goldenrod font-semibold">ainda essa semana</span>.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="pulse-ring-wrap rounded-3xl">
              <AnimatedButton href={CHECKOUT_URL} size="lg">
                Quero aplicar IA no trabalho →
              </AnimatedButton>
            </div>
            <p className="text-parchment/45 text-sm font-body">
              Acesso imediato · Aulas curtas · R$ 147,00
            </p>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-12 pt-8 border-t border-white/8 flex flex-wrap gap-6 items-center"
          >
            {[
              { value: "250+", label: "consultorias" },
              { value: "50k+", label: "seguidores" },
              { value: "Top Voice", label: "LinkedIn em IA" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="font-heading font-bold text-parchment text-base" style={{ letterSpacing: "-0.03em" }}>
                  {item.value}
                </span>
                <span className="text-parchment/40 text-sm font-body">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0f0f1f] pointer-events-none" />
    </section>
  );
}
