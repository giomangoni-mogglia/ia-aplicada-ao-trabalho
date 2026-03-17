'use client'

import { useState, useCallback, useEffect } from 'react'
import EditableText from './EditableText'
import {
  EditState,
  ProposalContent,
  ProposalFormData,
  ProductType,
} from '@/lib/types'
import { PRODUCT_LABELS, calculatePrice, formatPrice } from '@/lib/pricing'

const GIO_BIO = `Gio Mangoni é referência nacional em IA aplicada ao trabalho e fundadora da Mogglia, empresa que capacita profissionais a transformarem inteligência artificial em resultados práticos. Já conduziu mais de 250 consultorias em IA, atuou em três startups do setor (UpFlux, Zaia e Adapta) e se tornou referência no LinkedIn com mais de 50 mil seguidores, reconhecida como Top Voice, eleita entre as 10 vozes de IA mais relevantes do Brasil. Palestra e ministra treinamentos corporativos por todo o Brasil, ensinando profissionais de marketing, vendas, RH, operações e gestão a aplicar IA no dia a dia por meio da cocriação humano-IA.`

const DEFAULT_GANHOS = [
  {
    nivel: '01',
    economia: '~30%',
    horas: '~3–4h/semana',
    descricao: 'Primeiros usos — tarefas pontuais de texto, pesquisa e síntese com IA generativa.',
  },
  {
    nivel: '02',
    economia: '~60%',
    horas: '~5–6h/semana',
    descricao: 'Documentação e comunicação — briefings, relatórios, e-mails e apresentações criados com IA.',
  },
  {
    nivel: '03',
    economia: '~70%',
    horas: '~6–8h/semana',
    descricao: 'Análise e síntese de dados — planilhas, dashboards e análises de mercado assistidas por IA.',
  },
  {
    nivel: '04',
    economia: '~80%',
    horas: '~8–10h/semana',
    descricao: 'Fluxos integrados de criação — conteúdo, campanhas e propostas gerados end-to-end com IA.',
  },
  {
    nivel: '05',
    economia: '~90%',
    horas: '~10–12h/semana',
    descricao: 'Fluxos integrados de análise e decisão — IA integrada ao processo de tomada de decisão.',
  },
]

const AREA_LABELS: Record<string, string> = {
  marketing: 'Marketing',
  vendas: 'Vendas',
  rh: 'RH',
  operacoes: 'Operações',
  financeiro: 'Financeiro',
  juridico: 'Jurídico',
  gestao: 'Gestão / Liderança',
  outro: 'Outro',
}

const GRADIENT =
  'linear-gradient(90deg, #FABD7C, #FD7581, #E3876E, #87C0B2, #DFE2DB)'

// ─── Helpers ────────────────────────────────────────────────────────────────

function Tag({
  color,
  children,
}: {
  color: 'coral' | 'teal'
  children: React.ReactNode
}) {
  return (
    <span
      className="inline-block text-white uppercase tracking-widest"
      style={{
        background: color === 'coral' ? '#F97477' : '#87C0B2',
        borderRadius: 4,
        padding: '4px 10px',
        fontSize: 11,
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.1em',
      }}
    >
      {children}
    </span>
  )
}

function SectionLabel({
  color,
  children,
}: {
  color: 'coral' | 'teal'
  children: React.ReactNode
}) {
  return (
    <div className="mb-4">
      <Tag color={color}>{children}</Tag>
    </div>
  )
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T12:00:00')
    return d.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

// ─── Init ────────────────────────────────────────────────────────────────────

function initEditState(
  content: ProposalContent,
  formData: ProposalFormData
): EditState {
  const produtos: EditState['produtos'] = {}
  for (const [key, val] of Object.entries(content.casos_de_uso_por_produto)) {
    produtos[key] = {
      descricao: val.descricao_personalizada,
      areas: val.areas,
    }
  }

  const precos: Record<string, string> = {}
  for (const productKey of formData.selectedProducts) {
    const detail = formData.productDetails[productKey]
    if (detail) {
      const price = calculatePrice(
        productKey as ProductType,
        detail.format,
        detail.participants
      )
      precos[productKey] = formatPrice(price)
    }
  }

  return {
    subtitulo_capa: content.subtitulo_capa,
    diagnostico_titulo: content.diagnostico.titulo,
    diagnostico_paragrafos: content.diagnostico.paragrafos,
    urgencia_paragrafo: content.urgencia.paragrafo_personalizado,
    jornada_recomendada: content.jornada_recomendada ?? '',
    produtos,
    ganhos: DEFAULT_GANHOS,
    precos,
    roi_semanas: String(content.roi.semanas_payback),
    roi_calculo: content.roi.calculo_explicado,
    roi_valor_total: content.roi.valor_total,
    bio: GIO_BIO,
  }
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface Props {
  formData: ProposalFormData
  content: ProposalContent
  initialEditState?: EditState
  editing?: boolean
  onEditStateChange?: (state: EditState, dirty: boolean) => void
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProposalView({
  formData,
  content,
  initialEditState,
  editing = true,
  onEditStateChange,
}: Props) {
  const [es, setEs] = useState<EditState>(() =>
    initialEditState ?? initEditState(content, formData)
  )

  const update = useCallback(
    (key: keyof EditState, value: unknown) => {
      setEs((prev) => {
        const next = { ...prev, [key]: value }
        onEditStateChange?.(next, true)
        return next
      })
    },
    [onEditStateChange]
  )

  // Expose initial state to parent on mount
  useEffect(() => {
    onEditStateChange?.(es, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const E = editing

  const mainProduct = formData.selectedProducts[0] as ProductType
  const mainProductLabel = PRODUCT_LABELS[mainProduct] ?? mainProduct
  const contactDetail = formData.productDetails[mainProduct]

  return (
    <div
      id="proposal-root"
      style={{
        background: '#F7F3EA',
        color: '#222222',
        fontFamily: 'Helvetica, Arial, sans-serif',
        maxWidth: 900,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* ── TOP GRADIENT BAR ─────────────────────────────────────── */}
      <div
        className="gradient-bar"
        style={{
          height: 7,
          background: GRADIENT,
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact',
        }}
      />

      {/* ── CAPA ─────────────────────────────────────────────────── */}
      <section
        className="cover section"
        style={{ padding: '60px 64px 52px', borderBottom: '1px solid #E8E4DB' }}
      >
        <div className="flex gap-2 mb-6 flex-wrap">
          <Tag color="coral">Proposta Comercial</Tag>
          <Tag color="teal">{mainProductLabel}</Tag>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1.08,
            marginBottom: 12,
          }}
        >
          {formData.clientCompany}{' '}
          <span
            style={{
              display: 'inline-block',
              border: '1px solid #222222',
              borderRadius: 999,
              padding: '2px 18px',
              fontFamily: 'Lora, Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 32,
              transform: 'rotate(-1.5deg)',
              verticalAlign: 'middle',
              marginLeft: 8,
              lineHeight: 1.4,
            }}
          >
            {mainProductLabel}
          </span>
        </h1>

        {/* Subtitle */}
        {E ? (
          <EditableText
            value={es.subtitulo_capa}
            onChange={(v) => update('subtitulo_capa', v)}
            as="p"
            className="mb-8"
            editing
          />
        ) : (
          <p
            style={{
              fontFamily: 'Lora, Georgia, serif',
              fontStyle: 'italic',
              fontSize: 20,
              color: '#555',
              marginBottom: 32,
              maxWidth: 640,
            }}
          >
            {es.subtitulo_capa}
          </p>
        )}

        {/* Meta */}
        <div
          className="flex flex-wrap gap-x-8 gap-y-2"
          style={{ fontSize: 14, color: '#555' }}
        >
          <span>
            <strong style={{ color: '#222' }}>Para:</strong>{' '}
            {formData.clientContact} — {formData.clientRole}
          </span>
          <span>
            <strong style={{ color: '#222' }}>Data:</strong>{' '}
            {formatDate(formData.proposalDate)}
          </span>
          {contactDetail && (
            <span>
              <strong style={{ color: '#222' }}>Formato:</strong>{' '}
              {contactDetail.format}
              {contactDetail.participants
                ? ` · ${contactDetail.participants} participantes`
                : ''}
            </span>
          )}
        </div>
      </section>

      {/* ── DIAGNÓSTICO ──────────────────────────────────────────── */}
      <section
        className="section"
        style={{ padding: '52px 64px', borderBottom: '1px solid #E8E4DB' }}
      >
        <SectionLabel color="coral">Diagnóstico</SectionLabel>

        <EditableText
          value={es.diagnostico_titulo}
          onChange={(v) => update('diagnostico_titulo', v)}
          as="h2"
          className="mb-6"
          editing={E}
        />
        <style>{`
          #proposal-root h2 {
            font-family: Helvetica, Arial, sans-serif;
            font-weight: 700;
            font-size: 28px;
            line-height: 1.15;
            color: #222;
            margin-bottom: 24px;
          }
        `}</style>

        <div className="space-y-4">
          {es.diagnostico_paragrafos.map((p, i) => (
            <EditableText
              key={i}
              value={p}
              onChange={(v) => {
                const next = [...es.diagnostico_paragrafos]
                next[i] = v
                update('diagnostico_paragrafos', next)
              }}
              as="p"
              editing={E}
            />
          ))}
        </div>
      </section>

      {/* ── URGÊNCIA ────────────────────────────────────────────── */}
      <section
        className="section"
        style={{
          padding: '52px 64px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E8E4DB',
        }}
      >
        <SectionLabel color="teal">Urgência</SectionLabel>
        <h2 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 28, lineHeight: 1.15, color: '#222', marginBottom: 24 }}>
          Por que a janela de vantagem está se fechando
        </h2>

        <EditableText
          value={es.urgencia_paragrafo}
          onChange={(v) => update('urgencia_paragrafo', v)}
          as="p"
          className="mb-4"
          editing={E}
        />

        <p style={{ color: '#555', fontSize: 15, lineHeight: 1.7 }}>
          Empresas que adotam IA agora constroem vantagem operacional que será difícil
          de recuperar em 18-24 meses. A produtividade acumulada, os fluxos refinados
          e a cultura de cocriação humano-IA não se replicam do dia para a noite.
        </p>

        {es.jornada_recomendada && (
          <div
            style={{
              marginTop: 32,
              padding: '24px 28px',
              background: '#FCFFD5',
              borderRadius: 12,
              border: '1px solid #E8E4DB',
            }}
          >
            <p
              style={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 700,
                fontSize: 13,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#F97477',
                marginBottom: 10,
              }}
            >
              Jornada Recomendada
            </p>
            <EditableText
              value={es.jornada_recomendada}
              onChange={(v) => update('jornada_recomendada', v)}
              as="p"
              editing={E}
            />
          </div>
        )}
      </section>

      {/* ── O QUE FAREMOS JUNTOS ────────────────────────────────── */}
      {formData.selectedProducts.map((productKey) => {
        const prodLabel = PRODUCT_LABELS[productKey as ProductType] ?? productKey
        const prodData = es.produtos[productKey]
        if (!prodData) return null
        const areas = Object.entries(prodData.areas)

        return (
          <section
            key={productKey}
            className="section"
            style={{ padding: '52px 64px', borderBottom: '1px solid #E8E4DB' }}
          >
            <SectionLabel color="coral">O que faremos juntos</SectionLabel>
            <h2 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 28, lineHeight: 1.15, color: '#222', marginBottom: 16 }}>
              {prodLabel}
            </h2>

            <EditableText
              value={prodData.descricao}
              onChange={(v) => {
                const next = {
                  ...es.produtos,
                  [productKey]: { ...prodData, descricao: v },
                }
                update('produtos', next)
              }}
              as="p"
              className="mb-8"
              editing={E}
            />

            {areas.length > 0 && (
              <>
                <h3
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 700,
                    fontSize: 15,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#888',
                    marginBottom: 20,
                  }}
                >
                  Casos de uso por área
                </h3>
                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
                >
                  {areas.map(([areaKey, useCases]) => (
                    <div
                      key={areaKey}
                      className="package-card"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E8E4DB',
                        borderRadius: 12,
                        padding: '20px 22px',
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: 13,
                          color: '#87C0B2',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: 12,
                        }}
                      >
                        {AREA_LABELS[areaKey] ?? areaKey}
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {useCases.map((useCase, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: 14,
                              color: '#444',
                              lineHeight: 1.6,
                              marginBottom: 6,
                              paddingLeft: 16,
                              position: 'relative',
                            }}
                          >
                            <span
                              style={{
                                position: 'absolute',
                                left: 0,
                                color: '#F97477',
                              }}
                            >
                              ·
                            </span>
                            {E ? (
                              <EditableText
                                value={useCase}
                                onChange={(v) => {
                                  const newCases = [...useCases]
                                  newCases[i] = v
                                  const next = {
                                    ...es.produtos,
                                    [productKey]: {
                                      ...prodData,
                                      areas: {
                                        ...prodData.areas,
                                        [areaKey]: newCases,
                                      },
                                    },
                                  }
                                  update('produtos', next)
                                }}
                                as="span"
                                editing
                              />
                            ) : (
                              <span>{useCase}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )
      })}

      {/* ── GANHOS DE PRODUTIVIDADE ─────────────────────────────── */}
      <section
        className="section"
        style={{
          padding: '52px 64px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E8E4DB',
        }}
      >
        <SectionLabel color="teal">Evidências</SectionLabel>
        <h2 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 28, lineHeight: 1.15, color: '#222', marginBottom: 8 }}>
          O que os dados mostram
        </h2>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 32 }}>
          Fonte: Anthropic Economic Index (nov. 2025)
        </p>

        <div className="space-y-3">
          {es.ganhos.map((g, i) => (
            <div
              key={i}
              className="level-card"
              style={{
                background: '#F7F3EA',
                border: '1px solid #E8E4DB',
                borderRadius: 12,
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'Lora, Georgia, serif',
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#E8E4DB',
                  lineHeight: 1,
                  flexShrink: 0,
                  width: 40,
                }}
              >
                {g.nivel}
              </span>
              <div style={{ flex: 1 }}>
                <div className="flex gap-4 mb-2 flex-wrap">
                  <span
                    style={{
                      background: '#F97477',
                      color: '#fff',
                      borderRadius: 6,
                      padding: '2px 10px',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {E ? (
                      <EditableText
                        value={g.economia}
                        onChange={(v) => {
                          const next = [...es.ganhos]
                          next[i] = { ...g, economia: v }
                          update('ganhos', next)
                        }}
                        as="span"
                        editing
                      />
                    ) : (
                      g.economia
                    )}
                    {' '}de economia
                  </span>
                  <span style={{ color: '#888', fontSize: 13, alignSelf: 'center' }}>
                    {E ? (
                      <EditableText
                        value={g.horas}
                        onChange={(v) => {
                          const next = [...es.ganhos]
                          next[i] = { ...g, horas: v }
                          update('ganhos', next)
                        }}
                        as="span"
                        editing
                      />
                    ) : (
                      g.horas
                    )}
                    {' '}recuperadas
                  </span>
                </div>
                {E ? (
                  <EditableText
                    value={g.descricao}
                    onChange={(v) => {
                      const next = [...es.ganhos]
                      next[i] = { ...g, descricao: v }
                      update('ganhos', next)
                    }}
                    as="p"
                    editing
                  />
                ) : (
                  <p style={{ fontSize: 14, color: '#555', margin: 0 }}>{g.descricao}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 28,
            padding: '20px 24px',
            background: '#FCFFD5',
            borderRadius: 12,
            border: '1px solid #E8E4DB',
            fontSize: 14,
            color: '#444',
            lineHeight: 1.7,
          }}
        >
          💡 <em>E documentos com design da empresa, como este — criados diretamente no Claude, sem precisar de designer ou agência.</em>
        </div>
      </section>

      {/* ── INVESTIMENTO ─────────────────────────────────────────── */}
      <section
        className="section"
        style={{ padding: '52px 64px', borderBottom: '1px solid #E8E4DB' }}
      >
        <SectionLabel color="coral">Investimento</SectionLabel>
        <h2 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 28, lineHeight: 1.15, color: '#222', marginBottom: 32 }}>
          Escolha o formato ideal
        </h2>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns:
              formData.selectedProducts.length > 1
                ? 'repeat(auto-fill, minmax(240px, 1fr))'
                : '1fr',
            maxWidth: formData.selectedProducts.length === 1 ? 480 : undefined,
          }}
        >
          {formData.selectedProducts.map((productKey) => {
            const label = PRODUCT_LABELS[productKey as ProductType] ?? productKey
            const detail = formData.productDetails[productKey]
            const price = es.precos[productKey] ?? 'Sob consulta'

            return (
              <div
                key={productKey}
                className="package-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E8E4DB',
                  borderRadius: 12,
                  padding: '28px 28px 24px',
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    marginBottom: 6,
                    color: '#222',
                  }}
                >
                  {label}
                </p>
                {detail && (
                  <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>
                    {detail.format}
                    {detail.participants
                      ? ` · ${detail.participants} participantes`
                      : ''}
                  </p>
                )}

                <div
                  style={{
                    borderTop: '1px solid #E8E4DB',
                    paddingTop: 20,
                    marginTop: 4,
                  }}
                >
                  <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>
                    Investimento
                  </p>
                  {E ? (
                    <EditableText
                      value={price}
                      onChange={(v) => {
                        update('precos', { ...es.precos, [productKey]: v })
                      }}
                      as="p"
                      editing
                    />
                  ) : (
                    <p
                      style={{
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 700,
                        fontSize: 28,
                        color: '#222',
                        margin: 0,
                      }}
                    >
                      {price}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ROI Block */}
        <div
          style={{
            marginTop: 32,
            padding: '28px 32px',
            background: '#F7F3EA',
            border: '1px solid #E8E4DB',
            borderRadius: 12,
          }}
        >
          <p
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#87C0B2',
              marginBottom: 14,
            }}
          >
            Retorno sobre investimento
          </p>
          <p
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#222',
              marginBottom: 10,
            }}
          >
            Este investimento se paga em{' '}
            {E ? (
              <EditableText
                value={es.roi_semanas}
                onChange={(v) => update('roi_semanas', v)}
                as="span"
                editing
              />
            ) : (
              <span>{es.roi_semanas}</span>
            )}{' '}
            semanas com uso consistente.
          </p>
          <EditableText
            value={es.roi_calculo}
            onChange={(v) => update('roi_calculo', v)}
            as="p"
            editing={E}
          />
        </div>
      </section>

      {/* ── SOBRE A GIO ─────────────────────────────────────────── */}
      <section
        className="section"
        style={{
          padding: '52px 64px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E8E4DB',
        }}
      >
        <SectionLabel color="teal">Quem conduz</SectionLabel>
        <h2 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 28, lineHeight: 1.15, color: '#222', marginBottom: 24 }}>
          Gio Mangoni
        </h2>
        <EditableText
          value={es.bio}
          onChange={(v) => update('bio', v)}
          as="p"
          editing={E}
        />
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer
        style={{ padding: '32px 64px 0', background: '#F7F3EA' }}
      >
        <div
          className="flex flex-wrap items-center justify-between gap-4 pb-8"
          style={{ borderBottom: '1px solid #E8E4DB' }}
        >
          <div>
            <span
              style={{
                fontFamily: 'Lora, Georgia, serif',
                fontWeight: 700,
                fontSize: 22,
                fontStyle: 'italic',
                color: '#222',
              }}
            >
              mogglia
            </span>
            <span
              style={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: 14,
                color: '#888',
                marginLeft: 12,
              }}
            >
              Aprenda aplicar IA no seu trabalho
            </span>
          </div>
          <div style={{ textAlign: 'right', fontSize: 13, color: '#888' }}>
            <p style={{ marginBottom: 2 }}>
              <strong style={{ color: '#222' }}>Gio Mangoni</strong> · /giomangoni
            </p>
            <p>
              Documento confidencial · Exclusivo para{' '}
              <strong style={{ color: '#222' }}>{formData.clientCompany}</strong>
            </p>
          </div>
        </div>
      </footer>

      {/* ── BOTTOM GRADIENT BAR ─────────────────────────────────── */}
      <div
        className="gradient-bar"
        style={{
          height: 7,
          background: GRADIENT,
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact',
        }}
      />

      {/* ── GLOBAL STYLES ────────────────────────────────────────── */}
      <style>{`
        #proposal-root p {
          font-size: 15px;
          line-height: 1.75;
          color: #444;
          margin: 0;
        }
        @media print {
          .action-bar { display: none !important; }
          .edit-indicator { display: none !important; }
          .unsaved-badge { display: none !important; }
          [contenteditable] {
            outline: none !important;
            cursor: default !important;
            background: transparent !important;
          }
          [contenteditable]:focus {
            outline: none !important;
            background: transparent !important;
          }
          .section { page-break-inside: avoid; }
          .package-card { page-break-inside: avoid; }
          .level-card { page-break-inside: avoid; }
          .cover { page-break-after: avoid; }
          .gradient-bar {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          body { background: #F7F3EA !important; }
        }
      `}</style>
    </div>
  )
}
