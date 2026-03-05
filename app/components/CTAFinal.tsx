"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedButton from "./AnimatedButton";
import { CHECKOUT_URL } from "../constants";

export default function CTAFinal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a18] py-24 md:py-40 overflow-hidden"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg opacity-60" />

      {/* Radial glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(249,87,56,0.1)_0%,rgba(45,106,138,0.05)_40%,transparent_70%)] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,242,236,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,236,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className={`particle particle-${n}`} />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-cerulean text-sm font-sans font-medium uppercase tracking-widest mb-8"
        >
          A escolha é sua
        </motion.p>

        {/* Two paths */}
        <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
          {/* Path A — status quo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-5 text-left"
            style={{
              background: "rgba(249,87,56,0.04)",
              border: "1px solid rgba(249,87,56,0.12)",
            }}
          >
            <div className="w-7 h-7 rounded-full bg-tomato/10 border border-tomato/25 flex items-center justify-center mb-3">
              <svg className="w-3 h-3 text-tomato" fill="none" viewBox="0 0 12 12">
                <path d="M6 1v6M6 9.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-sans text-parchment/50 text-sm leading-relaxed">
              Você pode continuar testando sozinho nos próximos{" "}
              <span className="text-parchment/70 font-medium">6 meses</span>{" "}
              e talvez chegar lá.
            </p>
          </motion.div>

          {/* Path B — course */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl p-5 text-left"
            style={{
              background: "rgba(212,160,23,0.06)",
              border: "1px solid rgba(212,160,23,0.2)",
            }}
          >
            <div className="w-7 h-7 rounded-full bg-goldenrod/15 border border-goldenrod/35 flex items-center justify-center mb-3">
              <svg className="w-3.5 h-3.5 text-goldenrod" fill="none" viewBox="0 0 14 14">
                <path d="M3 7l4 4 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-sans text-parchment/80 text-sm leading-relaxed">
              Ou ter um caminho claro em{" "}
              <span className="text-goldenrod font-semibold">2 horas</span> e
              começar{" "}
              <span className="text-parchment font-semibold">ainda essa semana</span>.
            </p>
          </motion.div>
        </div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-bold text-[clamp(2rem,5vw,4rem)] text-parchment mb-4"
          style={{ letterSpacing: "-0.04em" }}
        >
          Pare de usar IA{" "}
          <span className="italic text-goldenrod font-light">no escuro.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-parchment/55 font-sans text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          2 horas agora. Resultado essa semana.
          <br />
          Garantia de 7 dias — sem perguntas.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <div className="pulse-ring-wrap rounded-3xl">
            <AnimatedButton href={CHECKOUT_URL} size="lg">
              Quero aplicar IA no trabalho →
            </AnimatedButton>
          </div>

          <p className="text-parchment/30 text-sm font-sans">
            R$ 147,00 · Garantia de 7 dias · Certificado incluso
          </p>
        </motion.div>

        {/* Final divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-white/6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-parchment/25 text-xs font-sans"
        >
          <span>© 2025 Gio Mangoni</span>
          <span>·</span>
          <span>mogglia</span>
          <span>·</span>
          <span>Todos os direitos reservados</span>
        </motion.div>
      </div>
    </section>
  );
}
