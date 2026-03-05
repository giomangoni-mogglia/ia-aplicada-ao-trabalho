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
      <body>{children}</body>
    </html>
  );
}
