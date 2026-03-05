"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function VSL() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [playing, setPlaying] = useState(false);

  // Replace VIDEO_EMBED_URL with your actual embed URL
  const VIDEO_EMBED_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  return (
    <section
      ref={ref}
      className="relative bg-[#0A0A0A] py-20 md:py-32 overflow-hidden"
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,106,138,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,106,138,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <p className="text-cerulean text-sm font-medium uppercase tracking-widest mb-3">
            Antes de continuar
          </p>
          <h2
            className="font-bold text-[clamp(1.6rem,4vw,2.6rem)] text-parchment"
            style={{ letterSpacing: "-0.03em" }}
          >
            Assista.{" "}
            <span className="italic text-goldenrod font-light">
              Em 2 minutos
            </span>{" "}
            você vai entender por que chegou até aqui.
          </h2>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden gradient-border-anim"
          style={{ aspectRatio: "16/9" }}
        >
          {!playing ? (
            <div
              className="absolute inset-0 bg-[#0A0A0A] cursor-pointer group flex items-center justify-center"
              onClick={() => setPlaying(true)}
            >
              {/* Thumbnail overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2D6A8A]/20 to-[#0A0A0A]/80" />

              {/* Abstract thumbnail visual */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-full h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,106,138,0.4)_0%,transparent_70%)]" />
                </div>
              </div>

              {/* Play button */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="pulse-ring-wrap rounded-full">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-tomato/90 flex items-center justify-center transition-all duration-300 group-hover:bg-tomato group-hover:scale-105">
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <span className="text-parchment/80 text-sm">
                  Clique para assistir · ~2 minutos
                </span>
              </div>
            </div>
          ) : (
            <iframe
              src={`${VIDEO_EMBED_URL}?autoplay=1`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              frameBorder="0"
            />
          )}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none" />
    </section>
  );
}
