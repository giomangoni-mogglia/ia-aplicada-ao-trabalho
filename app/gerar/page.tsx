'use client'

import { useState, useCallback, useRef } from 'react'
import ProposalForm from '@/app/components/proposal/ProposalForm'
import LoadingScreen from '@/app/components/proposal/LoadingScreen'
import ProposalView from '@/app/components/proposal/ProposalView'
import ActionBar from '@/app/components/proposal/ActionBar'
import { ProposalFormData, ProposalContent, EditState } from '@/lib/types'

type AppState = 'password' | 'form' | 'loading' | 'editing'

const ACCESS_PASSWORD = process.env.NEXT_PUBLIC_ACCESS_PASSWORD ?? 'mogglia2024'

export default function GerarPage() {
  const [appState, setAppState] = useState<AppState>('password')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const [formData, setFormData] = useState<ProposalFormData | null>(null)
  const [content, setContent] = useState<ProposalContent | null>(null)
  const [editState, setEditState] = useState<EditState | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  const [slug, setSlug] = useState<string | null>(null)
  const [proposalId, setProposalId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  const currentCompany = formData?.clientCompany

  // ── Password ────────────────────────────────────────────────────────────
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ACCESS_PASSWORD) {
      setAppState('form')
    } else {
      setPasswordError(true)
      setTimeout(() => setPasswordError(false), 2000)
    }
  }

  // ── Form submit / generate ───────────────────────────────────────────────
  const handleFormSubmit = async (fd: ProposalFormData, pdf: File | null) => {
    setFormData(fd)
    setAppState('loading')
    setGenError(null)

    try {
      const body = new FormData()
      body.append('data', JSON.stringify(fd))
      if (pdf) body.append('pdf', pdf)

      const res = await fetch('/api/generate', { method: 'POST', body })
      const json = await res.json()

      if (!res.ok || json.error) {
        throw new Error(json.error ?? 'Erro ao gerar proposta')
      }

      setContent(json.content)
      setAppState('editing')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro desconhecido'
      setGenError(msg)
      setAppState('form')
    }
  }

  // ── Edit state change ────────────────────────────────────────────────────
  const handleEditStateChange = useCallback(
    (state: EditState, dirty: boolean) => {
      setEditState(state)
      setIsDirty(dirty)
    },
    []
  )

  // ── Save ─────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!formData || !content || !editState) return
    setIsSaving(true)

    try {
      if (!proposalId) {
        // First save — create new record
        const res = await fetch('/api/proposals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData, content, editedContent: editState }),
        })
        const json = await res.json()
        if (json.error) throw new Error(json.error)
        setSlug(json.slug)
        setProposalId(json.id)
      } else {
        // Update existing
        const res = await fetch(`/api/proposals/${slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ editedContent: editState }),
        })
        const json = await res.json()
        if (json.error) throw new Error(json.error)
      }
      setIsDirty(false)
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Erro ao salvar')
    } finally {
      setIsSaving(false)
    }
  }

  // ── Print ────────────────────────────────────────────────────────────────
  const handlePrint = () => {
    window.print()
  }

  // ── Render ───────────────────────────────────────────────────────────────
  if (appState === 'password') {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#F7F3EA' }}
      >
        <div
          style={{
            background: '#FFF',
            border: '1px solid #E8E4DB',
            borderRadius: 16,
            padding: '40px 48px',
            width: '100%',
            maxWidth: 380,
          }}
        >
          <p
            style={{
              fontFamily: 'Lora, Georgia, serif',
              fontSize: 26,
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#222',
              marginBottom: 4,
            }}
          >
            mogglia
          </p>
          <p
            style={{
              fontSize: 14,
              color: '#888',
              fontFamily: 'Helvetica, Arial, sans-serif',
              marginBottom: 28,
            }}
          >
            Gerador de Propostas — uso interno
          </p>

          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha de acesso"
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px',
                border: passwordError ? '1px solid #F97477' : '1px solid #E8E4DB',
                borderRadius: 8,
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: 15,
                color: '#222',
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: 8,
                transition: 'border-color 0.2s',
              }}
            />
            {passwordError && (
              <p style={{ color: '#F97477', fontSize: 13, marginBottom: 12 }}>
                Senha incorreta
              </p>
            )}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#F97477',
                color: '#FFF',
                border: 'none',
                borderRadius: 8,
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
                marginTop: 8,
              }}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (appState === 'loading') {
    return <LoadingScreen company={currentCompany} />
  }

  if (appState === 'form') {
    return (
      <ProposalForm
        onSubmit={handleFormSubmit}
        error={genError}
      />
    )
  }

  // Editing state
  if (appState === 'editing' && formData && content) {
    return (
      <>
        <ActionBar
          hasUnsavedChanges={isDirty}
          slug={slug}
          onSave={handleSave}
          onPrint={handlePrint}
          isSaving={isSaving}
        />
        {/* Spacer for action bar */}
        <div style={{ height: 56 }} className="print:hidden" />
        <div style={{ minHeight: '100vh', background: '#F7F3EA', padding: '32px 24px' }}>
          <ProposalView
            formData={formData}
            content={content}
            editing
            onEditStateChange={handleEditStateChange}
          />
        </div>
      </>
    )
  }

  return null
}
