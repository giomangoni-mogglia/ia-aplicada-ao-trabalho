import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IA Aplicada ao Trabalho — Gio Mangoni",
  description:
    "Em 2 horas, você identifica quais tarefas do seu trabalho podem ser otimizadas com IA, qual ferramenta usar em cada uma — e como fazer isso ainda essa semana.",
  openGraph: {
    title: "IA Aplicada ao Trabalho — Gio Mangoni",
    description:
      "Em 2 horas, você identifica quais tarefas do seu trabalho podem ser otimizadas com IA, qual ferramenta usar em cada uma — e como fazer isso ainda essa semana.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
