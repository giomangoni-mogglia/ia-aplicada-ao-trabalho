"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const forItems = [
  "Já usa IA, mas sente que poderia fazer muito mais com ela",
  "Ouve falar de Claude, Gemini, ChatGPT, NotebookLM e não sabe qual é a melhor para você",
  "Sente que está ficando para trás. Toda semana tem novidade e a sensação de atraso só aumenta",
  "Sabe que a IA pode se tornar seu superpoder, mas não sabe por onde começar",
];

const notForItems = [
  "Nunca abriu nenhuma ferramenta de IA e quer começar do absoluto zero",
  "Quer aprender a construir sistemas de IA do zero com programação",
  "Já é usuário avançado e quer criar automações complexas ou agentes de IA",
];

function ListItem({
  text,
  type,
  index,
}: {
  text: string;
  type: "for" | "notFor";
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: type === "for" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3 py-3.5 border-b border-white/5 last:border-0 group"
    >
      <span
        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
          type === "for"
            ? "bg-goldenrod/15 border border-goldenrod/30"
            : "bg-tomato/10 border border-tomato/25"
        }`}
      >
        {type === "for" ? (
          <svg className="w-3 h-3 text-goldenrod" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg className="w-2.5 h-2.5 text-tomato" fill="none" viewBox="0 0 12 12">
            <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <p className={`text-sm md:text-base leading-relaxed ${type === "for" ? "text-parchment" : "text-parchment/50"}`}>
        {text}
      </p>
    </motion.div>
  );
}

export default function ForWho() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-parchment py-20 md:py-32 overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cerulean/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p
            className="text-cerulean text-sm font-medium uppercase tracking-widest mb-3"
          >
            Para quem é
          </p>
          <h2
            className="font-bold text-[clamp(1.8rem,4vw,3rem)] text-space-indigo"
            style={{ letterSpacing: "-0.04em" }}
          >
            Esse curso é{" "}
            <span className="text-tomato">para você que:</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* For */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl p-6 md:p-8"
            style={{
              background: "rgba(26,26,46,0.06)",
              border: "1px solid rgba(26,26,46,0.1)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-goldenrod/20 border border-goldenrod/40 flex items-center justify-center">
                <svg className="w-4 h-4 text-goldenrod" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3
                className="font-bold text-space-indigo text-xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Esse curso é para você que:
              </h3>
            </div>
            <div>
              {forItems.map((item, i) => (
                <ListItem key={i} text={item} type="for" index={i} />
              ))}
            </div>
          </motion.div>

          {/* Not for */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl p-6 md:p-8"
            style={{
              background: "rgba(26,26,46,0.03)",
              border: "1px solid rgba(26,26,46,0.06)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-tomato/10 border border-tomato/25 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-tomato" fill="none" viewBox="0 0 16 16">
                  <path d="M4 4l8 8M12 4L4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <h3
                className="font-bold text-space-indigo/60 text-xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {"Este curso não é para quem:"}
              </h3>
            </div>
            <div>
              {notForItems.map((item, i) => (
                <ListItem key={i} text={item} type="notFor" index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
