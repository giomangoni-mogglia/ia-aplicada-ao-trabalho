'use client'

import { useEffect, useState } from 'react'

const BASE_MESSAGES = [
  'Lendo transcrição da reunião...',
  'Identificando oportunidades...',
  'Estruturando proposta personalizada...',
  'Finalizando documento...',
]

interface Props {
  company?: string
}

export default function LoadingScreen({ company }: Props) {
  const [index, setIndex] = useState(0)

  const messages = company
    ? BASE_MESSAGES.map((m) =>
        m === 'Identificando oportunidades...'
          ? `Identificando oportunidades para ${company}...`
          : m
      )
    : BASE_MESSAGES

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => Math.min(i + 1, messages.length - 1))
    }, 3200)
    return () => clearInterval(id)
  }, [messages.length])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: '#F7F3EA' }}
    >
      <div className="w-full max-w-sm text-center px-6">
        {/* Spinner */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-16 h-16">
            <div
              className="absolute inset-0 rounded-full border-4"
              style={{
                borderColor: '#E8E4DB',
                borderTopColor: '#F97477',
                animation: 'spin 1.2s linear infinite',
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
              style={{ fontFamily: 'Lora, Georgia, serif', color: '#F97477' }}
            >
              m
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-7 overflow-hidden relative mb-8">
          {messages.map((msg, i) => (
            <div
              key={msg}
              className="absolute inset-0 flex items-center justify-center text-base transition-all duration-700"
              style={{
                opacity: i === index ? 1 : 0,
                transform:
                  i === index
                    ? 'translateY(0)'
                    : i < index
                    ? 'translateY(-18px)'
                    : 'translateY(18px)',
                color: '#222222',
                fontFamily: 'Helvetica, Arial, sans-serif',
              }}
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-1 rounded-full overflow-hidden"
          style={{ background: '#E8E4DB' }}
        >
          <div
            className="h-1 rounded-full transition-all duration-[3s] ease-out"
            style={{
              background:
                'linear-gradient(90deg, #FABD7C, #FD7581, #E3876E, #87C0B2)',
              width: `${((index + 1) / messages.length) * 100}%`,
            }}
          />
        </div>

        <p
          className="mt-5 text-sm"
          style={{
            color: '#AAA',
            fontFamily: 'Helvetica, Arial, sans-serif',
          }}
        >
          Isso pode levar alguns segundos...
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
