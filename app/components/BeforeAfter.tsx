"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const rows = [
  {
    before: "Assina várias ferramentas mas não sabe qual usar para cada tarefa",
    after: "Escolhe a ferramenta certa para cada situação",
  },
  {
    before: "Passa mais tempo tentando fazer a IA funcionar do que fazendo a tarefa",
    after: "Prompts que entregam o resultado na primeira tentativa",
  },
  {
    before: "Não sabe por onde começar",
    after: "Plano de ação mapeado para o seu trabalho",
  },
];

function TiltCard({
  children,
  delay,
  side,
}: {
  children: React.ReactNode;
  delay: number;
  side: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    el.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
      el.style.transition = "transform 0.5s ease";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card radial-reveal"
      style={{ transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
    >
      {children}
    </motion.div>
  );
}

export default function BeforeAfter() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-[#1A1A2E] py-20 md:py-32 overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cerulean/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-tomato/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5">
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-cerulean text-sm font-body font-medium uppercase tracking-widest mb-3">
            Transformação
          </p>
          <h2
            className="font-heading font-bold text-[clamp(1.8rem,4vw,3rem)] text-parchment"
            style={{ letterSpacing: "-0.04em" }}
          >
            Antes e depois do curso
          </h2>
        </motion.div>

        {/* Column Headers */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 px-4"
          >
            <span className="w-5 h-5 rounded-full bg-tomato/20 border border-tomato/40 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-tomato" fill="none" viewBox="0 0 12 12">
                <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span
              className="font-heading font-bold text-parchment/50 text-sm uppercase tracking-wide"
              style={{ letterSpacing: "0.08em" }}
            >
              Antes
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 px-4"
          >
            <span className="w-5 h-5 rounded-full bg-goldenrod/20 border border-goldenrod/40 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-goldenrod" fill="none" viewBox="0 0 12 12">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span
              className="font-heading font-bold text-parchment/50 text-sm uppercase tracking-wide"
              style={{ letterSpacing: "0.08em" }}
            >
              Depois
            </span>
          </motion.div>
        </div>

        {/* Rows */}
        <div className="space-y-4">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Before */}
              <TiltCard delay={0.1 + i * 0.1} side="left">
                <div className="glass-card rounded-2xl p-5 md:p-6 h-full border-tomato/10 hover:border-tomato/25 transition-colors duration-300">
                  <div className="flex gap-3 items-start">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-tomato/10 border border-tomato/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-tomato" fill="none" viewBox="0 0 12 12">
                        <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <p className="text-parchment/60 font-body text-sm md:text-base leading-relaxed">
                      {row.before}
                    </p>
                  </div>
                </div>
              </TiltCard>

              {/* After */}
              <TiltCard delay={0.15 + i * 0.1} side="right">
                <div className="glass-card rounded-2xl p-5 md:p-6 h-full border-goldenrod/10 hover:border-goldenrod/30 transition-colors duration-300">
                  <div className="flex gap-3 items-start">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-goldenrod/10 border border-goldenrod/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-goldenrod" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-parchment font-body text-sm md:text-base leading-relaxed font-medium">
                      {row.after}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="font-serif italic text-parchment/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            &ldquo;Você não vai virar especialista em IA em 2 horas. Mas vai saber usar
            IA para trabalhar melhor —{" "}
            <span className="text-goldenrod not-italic font-heading font-semibold">
              e vai sentir isso ainda essa semana.
            </span>
            &rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
