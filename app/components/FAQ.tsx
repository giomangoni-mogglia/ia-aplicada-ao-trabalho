"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Quanto tempo vou precisar para fazer o curso?",
    a: "O curso tem ~2 horas de conteúdo estruturado. Você pode fazer de uma vez ou dividir em blocos de 30 min. A maioria das pessoas termina em um fim de semana.",
  },
  {
    q: "Preciso saber programar?",
    a: "Não. Este curso é para profissionais não-técnicos. Zero código, zero configuração técnica. Tudo o que você precisa é acesso a uma ferramenta de IA — que você provavelmente já tem.",
  },
  {
    q: "Já uso ChatGPT no trabalho. Esse curso ainda é para mim?",
    a: "Sim — especialmente para você. O curso resolve exatamente a situação de quem já usa mas sente que poderia extrair muito mais. Você vai sair com um framework, não só com dicas soltas.",
  },
  {
    q: "Qual a diferença entre ChatGPT, Claude e Gemini? O curso ensina isso?",
    a: "Sim. Um dos módulos é dedicado a entender quando usar cada ferramenta para cada tipo de tarefa. Você não vai mais testar no escuro.",
  },
  {
    q: "O acesso expira?",
    a: "Não. Você tem acesso vitalício ao material. E todas as atualizações futuras do curso são inclusas sem custo adicional.",
  },
  {
    q: "Como funciona a garantia?",
    a: "Você tem 7 dias a partir da compra. Se não aplicar nada, manda um e-mail e eu devolvo 100% do valor — sem perguntas, sem burocracia.",
  },
  {
    q: "Tem certificado?",
    a: "Sim. Ao concluir, você recebe um certificado de conclusão que pode adicionar ao seu LinkedIn ou currículo.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
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
          className="font-heading font-semibold text-parchment text-base md:text-lg group-hover:text-goldenrod transition-colors duration-200"
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
            <p className="pb-5 font-body text-parchment/60 text-base leading-relaxed">
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
      className="relative bg-[#1A1A2E] py-20 md:py-32 overflow-hidden"
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
          <p className="text-cerulean text-sm font-body font-medium uppercase tracking-widest mb-3">
            Dúvidas frequentes
          </p>
          <h2
            className="font-heading font-bold text-[clamp(1.8rem,4vw,3rem)] text-parchment"
            style={{ letterSpacing: "-0.04em" }}
          >
            Perguntas &{" "}
            <span className="font-serif italic text-goldenrod">respostas</span>
          </h2>
        </motion.div>

        <div className="rounded-3xl p-6 md:p-10 glass-card">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0a18] pointer-events-none" />
    </section>
  );
}
