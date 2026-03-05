import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "space-indigo": "#1A1A2E",
        parchment: "#F5F2EC",
        cerulean: "#2D6A8A",
        goldenrod: "#D4A017",
        tomato: "#F95738",
      },
      fontFamily: {
        heading: ["Space Grotesk", "Helvetica Neue", "Arial", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.03em",
        snug: "-0.02em",
      },
      animation: {
        aurora: "aurora 18s ease infinite",
        float: "float 6s ease-in-out infinite",
        "orbit-slow": "orbit-rotate 25s linear infinite",
        "orbit-medium": "orbit-rotate 18s linear infinite",
        "orbit-fast": "orbit-rotate 12s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-border": "gradient-border 4s linear infinite",
        "noise-drift": "noise-drift 8s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease forwards",
      },
      keyframes: {
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "orbit-rotate": {
          from: { transform: "rotateX(72deg) rotate(0deg)" },
          to: { transform: "rotateX(72deg) rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.15)", opacity: "0.4" },
          "100%": { transform: "scale(1)", opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "gradient-border": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
        "noise-drift": {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-2%,-2%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundSize: {
        "400%": "400%",
        "300%": "300%",
      },
    },
  },
  plugins: [],
};

export default config;
