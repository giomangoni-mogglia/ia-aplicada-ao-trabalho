'use client'

import { useState } from 'react'

interface Props {
  hasUnsavedChanges: boolean
  slug: string | null
  onSave: () => void
  onPrint: () => void
  isSaving: boolean
}

export default function ActionBar({
  hasUnsavedChanges,
  slug,
  onSave,
  onPrint,
  isSaving,
}: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    if (!slug) return
    const url = `${window.location.origin}/proposta/${slug}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className="action-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 print:hidden"
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E8E4DB',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <span
          style={{
            fontFamily: 'Lora, Georgia, serif',
            fontWeight: 700,
            color: '#222222',
            fontSize: '18px',
            fontStyle: 'italic',
          }}
        >
          mogglia
        </span>
        <span
          className="text-xs px-2 py-1 rounded"
          style={{
            background: '#F7F3EA',
            color: '#666',
            fontFamily: 'Helvetica, Arial, sans-serif',
          }}
        >
          ✏️ Editando
        </span>
        {hasUnsavedChanges && (
          <span
            className="unsaved-badge text-xs px-2 py-1 rounded"
            style={{
              background: '#FFF3CD',
              color: '#856404',
              fontFamily: 'Helvetica, Arial, sans-serif',
            }}
          >
            ● Alterações não salvas
          </span>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {slug && (
          <button
            onClick={handleCopyLink}
            className="text-sm px-4 py-2 rounded-lg border transition-colors hover:bg-[#F7F3EA]"
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              borderColor: '#E8E4DB',
              color: '#222',
            }}
          >
            {copied ? '✓ Copiado!' : 'Copiar link'}
          </button>
        )}
        <button
          onClick={onPrint}
          className="text-sm px-4 py-2 rounded-lg border transition-colors hover:bg-[#F7F3EA]"
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            borderColor: '#E8E4DB',
            color: '#222',
          }}
        >
          Baixar PDF
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="text-sm px-5 py-2 rounded-lg text-white transition-opacity disabled:opacity-60"
          style={{
            background: '#F97477',
            fontFamily: 'Helvetica, Arial, sans-serif',
          }}
        >
          {isSaving ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </div>
    </div>
  )
}
