'use client'

import { useState, useRef } from 'react'
import {
  ProposalFormData,
  ProductType,
  AreaType,
  ProductDetail,
} from '@/lib/types'
import {
  PRODUCT_LABELS,
  PRODUCT_FORMATS,
  PRODUCT_HAS_PARTICIPANTS,
  calculatePrice,
  formatPrice,
} from '@/lib/pricing'

const ALL_PRODUCTS: ProductType[] = [
  'palestra',
  'workshop',
  'aiAdoptionProgram',
  'aiStrategySession',
  'executiveSession',
]

const ALL_AREAS: { key: AreaType; label: string }[] = [
  { key: 'marketing', label: 'Marketing' },
  { key: 'vendas', label: 'Vendas' },
  { key: 'rh', label: 'RH' },
  { key: 'operacoes', label: 'Operações' },
  { key: 'financeiro', label: 'Financeiro' },
  { key: 'juridico', label: 'Jurídico' },
  { key: 'gestao', label: 'Gestão / Liderança' },
  { key: 'outro', label: 'Outro' },
]

const STEPS = [
  { label: 'Dados do cliente' },
  { label: 'Produto(s)' },
  { label: 'Contexto' },
  { label: 'Revisão' },
]

const today = new Date().toISOString().split('T')[0]

const EMPTY_FORM: ProposalFormData = {
  clientCompany: '',
  clientContact: '',
  clientRole: '',
  clientSector: '',
  clientCity: '',
  selectedProducts: [],
  productDetails: {},
  contextSummary: '',
  selectedAreas: [],
  customArea: '',
  proposalDate: today,
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: 'block',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 700,
        fontSize: 13,
        color: '#222',
        marginBottom: 6,
      }}
    >
      {children}
    </label>
  )
}

function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      style={{
        width: '100%',
        padding: '10px 14px',
        border: '1px solid #E8E4DB',
        borderRadius: 8,
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: 14,
        color: '#222',
        background: '#FFF',
        outline: 'none',
        boxSizing: 'border-box',
      }}
      onFocus={(e) =>
        (e.currentTarget.style.borderColor = '#F97477')
      }
      onBlur={(e) =>
        (e.currentTarget.style.borderColor = '#E8E4DB')
      }
    />
  )
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '10px 14px',
        border: '1px solid #E8E4DB',
        borderRadius: 8,
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: 14,
        color: '#222',
        background: '#FFF',
        outline: 'none',
      }}
    >
      <option value="">Selecione...</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

// ─── Step components ─────────────────────────────────────────────────────────

function Step1({
  form,
  setForm,
}: {
  form: ProposalFormData
  setForm: React.Dispatch<React.SetStateAction<ProposalFormData>>
}) {
  const f = (key: keyof ProposalFormData) => (v: string) =>
    setForm((p) => ({ ...p, [key]: v }))

  return (
    <div className="space-y-5">
      <div>
        <Label>Nome da empresa *</Label>
        <Input
          value={form.clientCompany}
          onChange={f('clientCompany')}
          placeholder="Ex: Franq Investimentos"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Nome do contato *</Label>
          <Input
            value={form.clientContact}
            onChange={f('clientContact')}
            placeholder="Ex: Rafael Costa"
            required
          />
        </div>
        <div>
          <Label>Cargo *</Label>
          <Input
            value={form.clientRole}
            onChange={f('clientRole')}
            placeholder="Ex: Diretor de RH"
            required
          />
        </div>
      </div>
      <div>
        <Label>Setor / Segmento *</Label>
        <Input
          value={form.clientSector}
          onChange={f('clientSector')}
          placeholder="Ex: Serviços financeiros / Franquias"
          required
        />
      </div>
      <div>
        <Label>Cidade / UF *</Label>
        <Input
          value={form.clientCity}
          onChange={f('clientCity')}
          placeholder="Ex: São Paulo / SP"
          required
        />
      </div>
      <div>
        <Label>Data da proposta</Label>
        <Input type="date" value={form.proposalDate} onChange={f('proposalDate')} />
      </div>
    </div>
  )
}

function Step2({
  form,
  setForm,
}: {
  form: ProposalFormData
  setForm: React.Dispatch<React.SetStateAction<ProposalFormData>>
}) {
  const toggleProduct = (p: ProductType) => {
    setForm((prev) => {
      const selected = prev.selectedProducts.includes(p)
        ? prev.selectedProducts.filter((x) => x !== p)
        : [...prev.selectedProducts, p]
      return { ...prev, selectedProducts: selected }
    })
  }

  const updateDetail = (
    productKey: ProductType,
    field: keyof ProductDetail,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      productDetails: {
        ...prev.productDetails,
        [productKey]: {
          ...(prev.productDetails[productKey] ?? { format: '' }),
          [field]: value,
        },
      },
    }))
  }

  return (
    <div className="space-y-4">
      <p
        style={{
          fontSize: 13,
          color: '#888',
          fontFamily: 'Helvetica, Arial, sans-serif',
          marginBottom: 8,
        }}
      >
        Selecione um ou mais produtos:
      </p>
      {ALL_PRODUCTS.map((p) => {
        const isSelected = form.selectedProducts.includes(p)
        const detail = form.productDetails[p]
        const hasParticipants = PRODUCT_HAS_PARTICIPANTS[p]

        return (
          <div
            key={p}
            style={{
              border: isSelected ? '1px solid #F97477' : '1px solid #E8E4DB',
              borderRadius: 10,
              overflow: 'hidden',
              background: isSelected ? '#FFF8F8' : '#FFF',
              transition: 'border-color 0.15s',
            }}
          >
            <label
              className="flex items-center gap-3 cursor-pointer"
              style={{ padding: '14px 16px' }}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleProduct(p)}
                style={{ accentColor: '#F97477', width: 16, height: 16 }}
              />
              <span
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: isSelected ? 700 : 400,
                  fontSize: 14,
                  color: '#222',
                }}
              >
                {PRODUCT_LABELS[p]}
              </span>
            </label>

            {isSelected && (
              <div
                style={{
                  padding: '0 16px 14px',
                  borderTop: '1px solid #F97477/20',
                  display: 'flex',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: 180 }}>
                  <Label>Formato</Label>
                  <Select
                    value={detail?.format ?? ''}
                    onChange={(v) => updateDetail(p, 'format', v)}
                    options={PRODUCT_FORMATS[p]}
                  />
                </div>
                {hasParticipants && (
                  <div style={{ flex: 1, minWidth: 140 }}>
                    <Label>Nº de participantes</Label>
                    <Input
                      type="number"
                      value={String(detail?.participants ?? '')}
                      onChange={(v) =>
                        updateDetail(p, 'participants', parseInt(v) || 0)
                      }
                      placeholder="Ex: 25"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function Step3({
  form,
  setForm,
  pdfFile,
  setPdfFile,
}: {
  form: ProposalFormData
  setForm: React.Dispatch<React.SetStateAction<ProposalFormData>>
  pdfFile: File | null
  setPdfFile: (f: File | null) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  const toggleArea = (a: AreaType) => {
    setForm((prev) => {
      const selected = prev.selectedAreas.includes(a)
        ? prev.selectedAreas.filter((x) => x !== a)
        : [...prev.selectedAreas, a]
      return { ...prev, selectedAreas: selected }
    })
  }

  return (
    <div className="space-y-5">
      <div>
        <Label>Resumo da dor / contexto do cliente *</Label>
        <textarea
          value={form.contextSummary}
          onChange={(e) =>
            setForm((p) => ({ ...p, contextSummary: e.target.value }))
          }
          rows={6}
          placeholder="O que o cliente está precisando? Qual a dor principal? O que foi discutido na reunião? Quanto mais contexto, melhor a proposta."
          style={{
            width: '100%',
            padding: '12px 14px',
            border: '1px solid #E8E4DB',
            borderRadius: 8,
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: 14,
            color: '#222',
            resize: 'vertical',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#F97477')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E8E4DB')}
        />
      </div>

      <div>
        <Label>Transcrição da reunião (PDF opcional)</Label>
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: '2px dashed #E8E4DB',
            borderRadius: 10,
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            background: pdfFile ? '#F7FFF5' : '#FFF',
            borderColor: pdfFile ? '#87C0B2' : '#E8E4DB',
            transition: 'border-color 0.2s',
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
          />
          {pdfFile ? (
            <div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#87C0B2',
                  marginBottom: 4,
                }}
              >
                ✓ {pdfFile.name}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPdfFile(null)
                  if (fileRef.current) fileRef.current.value = ''
                }}
                style={{
                  fontSize: 12,
                  color: '#F97477',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Remover
              </button>
            </div>
          ) : (
            <p style={{ fontSize: 14, color: '#888' }}>
              Clique para fazer upload do PDF da transcrição
            </p>
          )}
        </div>
      </div>

      <div>
        <Label>Áreas de aplicação relevantes</Label>
        <div className="flex flex-wrap gap-2 mt-1">
          {ALL_AREAS.map(({ key, label }) => {
            const isSelected = form.selectedAreas.includes(key)
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleArea(key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: isSelected
                    ? '1px solid #F97477'
                    : '1px solid #E8E4DB',
                  background: isSelected ? '#F97477' : '#FFF',
                  color: isSelected ? '#FFF' : '#555',
                  fontSize: 13,
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
        {form.selectedAreas.includes('outro') && (
          <div style={{ marginTop: 10 }}>
            <Input
              value={form.customArea}
              onChange={(v) => setForm((p) => ({ ...p, customArea: v }))}
              placeholder="Descreva a área..."
            />
          </div>
        )}
      </div>
    </div>
  )
}

function Step4Review({
  form,
  pdfFile,
}: {
  form: ProposalFormData
  pdfFile: File | null
}) {
  const total = form.selectedProducts.reduce((sum, p) => {
    const d = form.productDetails[p]
    return sum + calculatePrice(p as ProductType, d?.format ?? '', d?.participants)
  }, 0)

  return (
    <div className="space-y-5">
      <div
        style={{
          background: '#FFF',
          border: '1px solid #E8E4DB',
          borderRadius: 10,
          padding: '20px 24px',
        }}
      >
        <p
          style={{
            fontWeight: 700,
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#888',
            marginBottom: 12,
          }}
        >
          Cliente
        </p>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
          {form.clientCompany}
        </p>
        <p style={{ fontSize: 14, color: '#555' }}>
          {form.clientContact} · {form.clientRole}
        </p>
        <p style={{ fontSize: 14, color: '#888' }}>
          {form.clientSector} · {form.clientCity}
        </p>
      </div>

      <div
        style={{
          background: '#FFF',
          border: '1px solid #E8E4DB',
          borderRadius: 10,
          padding: '20px 24px',
        }}
      >
        <p
          style={{
            fontWeight: 700,
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#888',
            marginBottom: 12,
          }}
        >
          Produto(s)
        </p>
        {form.selectedProducts.map((p) => {
          const d = form.productDetails[p]
          const price = calculatePrice(
            p as ProductType,
            d?.format ?? '',
            d?.participants
          )
          return (
            <div
              key={p}
              className="flex justify-between items-center"
              style={{ marginBottom: 8, fontSize: 14 }}
            >
              <span>
                <strong>{PRODUCT_LABELS[p as ProductType]}</strong>
                {d?.format ? ` · ${d.format}` : ''}
                {d?.participants ? ` · ${d.participants}p` : ''}
              </span>
              <span style={{ color: '#F97477', fontWeight: 700 }}>
                {formatPrice(price)}
              </span>
            </div>
          )
        })}
        {form.selectedProducts.length > 1 && (
          <div
            className="flex justify-between items-center"
            style={{
              marginTop: 10,
              paddingTop: 10,
              borderTop: '1px solid #E8E4DB',
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            <span>Total estimado</span>
            <span>{formatPrice(total)}</span>
          </div>
        )}
      </div>

      {form.contextSummary && (
        <div
          style={{
            background: '#FFF',
            border: '1px solid #E8E4DB',
            borderRadius: 10,
            padding: '20px 24px',
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#888',
              marginBottom: 8,
            }}
          >
            Contexto
          </p>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>
            {form.contextSummary.slice(0, 200)}
            {form.contextSummary.length > 200 ? '...' : ''}
          </p>
          {pdfFile && (
            <p style={{ fontSize: 13, color: '#87C0B2', marginTop: 6 }}>
              ✓ PDF anexado: {pdfFile.name}
            </p>
          )}
        </div>
      )}

      <div
        style={{
          background: '#FCFFD5',
          border: '1px solid #E8E4DB',
          borderRadius: 10,
          padding: '16px 20px',
          fontSize: 14,
          color: '#555',
        }}
      >
        Tudo certo? Clique em <strong>Gerar Proposta</strong> para o Claude criar
        o conteúdo personalizado.
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  onSubmit: (form: ProposalFormData, pdf: File | null) => void
  isLoading?: boolean
  error?: string | null
}

export default function ProposalForm({ onSubmit, isLoading, error }: Props) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<ProposalFormData>(EMPTY_FORM)
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const canAdvanceStep1 =
    form.clientCompany.trim() &&
    form.clientContact.trim() &&
    form.clientRole.trim() &&
    form.clientSector.trim() &&
    form.clientCity.trim()

  const canAdvanceStep2 =
    form.selectedProducts.length > 0 &&
    form.selectedProducts.every(
      (p) => (form.productDetails[p]?.format ?? '') !== ''
    )

  const canAdvanceStep3 = form.contextSummary.trim().length > 10

  const canAdvance = [canAdvanceStep1, canAdvanceStep2, canAdvanceStep3, true][
    step
  ]

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form, pdfFile)
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: '#F7F3EA', fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      {/* Header bar */}
      <div
        style={{
          height: 5,
          background: 'linear-gradient(90deg, #FABD7C, #FD7581, #E3876E, #87C0B2, #DFE2DB)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Logo */}
        <div className="mb-10">
          <span
            style={{
              fontFamily: 'Lora, Georgia, serif',
              fontSize: 24,
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#222',
            }}
          >
            mogglia
          </span>
          <span
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: 13,
              color: '#888',
              marginLeft: 10,
            }}
          >
            Gerador de Propostas
          </span>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div style={{ width: 200, flexShrink: 0 }}>
            <div className="space-y-1">
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (i < step) setStep(i)
                  }}
                  className="flex items-center gap-3 w-full text-left"
                  style={{ padding: '8px 12px', borderRadius: 8, background: 'none', border: 'none', cursor: i <= step ? 'pointer' : 'default' }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                      background:
                        i === step
                          ? '#F97477'
                          : i < step
                          ? '#87C0B2'
                          : '#E8E4DB',
                      color: i <= step ? '#FFF' : '#AAA',
                    }}
                  >
                    {i < step ? '✓' : i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: i === step ? 700 : 400,
                      color: i === step ? '#222' : '#888',
                    }}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                background: '#FFF',
                border: '1px solid #E8E4DB',
                borderRadius: 16,
                padding: '32px 36px',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 700,
                  fontSize: 20,
                  color: '#222',
                  marginBottom: 24,
                }}
              >
                {STEPS[step].label}
              </h2>

              <form onSubmit={handleSubmit}>
                {step === 0 && (
                  <Step1 form={form} setForm={setForm} />
                )}
                {step === 1 && (
                  <Step2 form={form} setForm={setForm} />
                )}
                {step === 2 && (
                  <Step3
                    form={form}
                    setForm={setForm}
                    pdfFile={pdfFile}
                    setPdfFile={setPdfFile}
                  />
                )}
                {step === 3 && (
                  <Step4Review form={form} pdfFile={pdfFile} />
                )}

                {error && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: '12px 16px',
                      background: '#FFF0F0',
                      border: '1px solid #F97477',
                      borderRadius: 8,
                      color: '#c00',
                      fontSize: 14,
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Navigation */}
                <div
                  className="flex justify-between items-center"
                  style={{ marginTop: 32 }}
                >
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 0}
                    style={{
                      padding: '10px 22px',
                      border: '1px solid #E8E4DB',
                      borderRadius: 8,
                      background: '#FFF',
                      color: step === 0 ? '#CCC' : '#555',
                      fontSize: 14,
                      cursor: step === 0 ? 'default' : 'pointer',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                    }}
                  >
                    Voltar
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canAdvance}
                      style={{
                        padding: '10px 28px',
                        borderRadius: 8,
                        border: 'none',
                        background: canAdvance ? '#F97477' : '#E8E4DB',
                        color: '#FFF',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: canAdvance ? 'pointer' : 'default',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        transition: 'background 0.15s',
                      }}
                    >
                      Próximo
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        padding: '12px 32px',
                        borderRadius: 8,
                        border: 'none',
                        background: isLoading ? '#E8E4DB' : '#F97477',
                        color: '#FFF',
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: isLoading ? 'default' : 'pointer',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                      }}
                    >
                      {isLoading ? 'Gerando...' : 'Gerar Proposta'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
