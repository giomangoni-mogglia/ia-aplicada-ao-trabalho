"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Guarantee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-parchment py-16 md:py-24 overflow-hidden"
    >
      {/* Subtle bg texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,106,138,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Shield icon with pulse */}
          <div className="pulse-ring-wrap rounded-full">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(45,106,138,0.15), rgba(45,106,138,0.05))",
                border: "2px solid rgba(45,106,138,0.3)",
              }}
            >
              <svg
                className="w-9 h-9 md:w-11 md:h-11 text-cerulean"
                fill="none"
                viewBox="0 0 48 56"
              >
                <path
                  d="M24 4L6 12v16c0 11 8 21.3 18 24 10-2.7 18-13 18-24V12L24 4z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 28l6 6 10-12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Badge text */}
          <div>
            <div
              className="inline-block rounded-full px-5 py-1.5 mb-4"
              style={{
                background: "rgba(45,106,138,0.1)",
                border: "1px solid rgba(45,106,138,0.25)",
              }}
            >
              <span className="text-cerulean text-xs font-heading font-bold uppercase tracking-widest">
                Garantia incondicional
              </span>
            </div>

            <h2
              className="font-heading font-bold text-[clamp(1.8rem,4vw,3rem)] text-space-indigo mb-4"
              style={{ letterSpacing: "-0.04em" }}
            >
              7 dias de garantia.{" "}
              <span className="text-tomato">Sem perguntas.</span>
            </h2>

            <p className="font-body text-space-indigo/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Se você assistir ao curso, tentar aplicar e não conseguir fazer
              nada diferente no seu trabalho em 7 dias, eu devolvo{" "}
              <span className="font-semibold text-space-indigo">100% do valor</span> — sem burocracia, sem
              justificativa.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {[
              { icon: "🔒", label: "Pagamento seguro" },
              { icon: "⚡", label: "Acesso imediato" },
              { icon: "🏅", label: "Certificado incluso" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-space-indigo/50 text-sm font-body">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
