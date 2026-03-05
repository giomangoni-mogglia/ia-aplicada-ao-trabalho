"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Preciso saber programar?",
    a: "Não. O curso é para profissionais não-técnicos. Você vai usar ferramentas prontas — sem código, sem configuração.",
  },
  {
    q: "Quanto tempo dura o curso?",
    a: "Aproximadamente 2,5 horas divididas em aulas curtas. Você assiste no seu ritmo, quando quiser.",
  },
  {
    q: "Funciona para a minha área?",
    a: "Se você trabalha com marketing, vendas, RH, produto, operações, finanças, jurídico, atendimento ou gestão, sim. O curso traz casos de uso aplicáveis em diferentes contextos de trabalho.",
  },
  {
    q: "Quais ferramentas vamos usar?",
    a: "Claude, ChatGPT, Gemini, NotebookLM, Manus e outras. Cada ferramenta é mostrada no contexto em que faz mais sentido utilizar.",
  },
  {
    q: "Preciso pagar uma IA para aproveitar o curso?",
    a: "Não. Você consegue aplicar tudo com os planos gratuitos disponíveis. O curso também te ajuda a decidir qual ferramenta de IA vale mais a pena para seu trabalho.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-white/8 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span
          className="font-semibold text-parchment text-base md:text-lg group-hover:text-goldenrod transition-colors duration-200"
          style={{ letterSpacing: "-0.02em" }}
        >
          {faq.q}
        </span>
        <span
          className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            open
              ? "border-goldenrod/50 bg-goldenrod/10 rotate-180"
              : "border-white/15 bg-white/5 rotate-0"
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 transition-colors duration-300 ${open ? "text-goldenrod" : "text-parchment/50"}`}
            fill="none"
            viewBox="0 0 14 14"
          >
            <path d="M2.5 5L7 9.5 11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 text-parchment/60 text-base leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#0A0A0A] py-20 md:py-32 overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,242,236,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,236,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-cerulean text-sm font-medium uppercase tracking-widest mb-3">
            Dúvidas frequentes
          </p>
          <h2
            className="font-bold text-[clamp(1.8rem,4vw,3rem)] text-parchment"
            style={{ letterSpacing: "-0.04em" }}
          >
            Perguntas{" "}
            <span className="italic text-goldenrod font-light">frequentes</span>
          </h2>
        </motion.div>

        <div className="rounded-3xl p-6 md:p-10 glass-card">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none" />
    </section>
  );
}
