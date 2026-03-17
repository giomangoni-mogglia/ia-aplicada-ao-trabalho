import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { ProposalContent } from '@/lib/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `Você é o assistente de geração de propostas comerciais da Mogglia, empresa brasileira de educação em IA fundada por Gio Mangoni.

Seu trabalho é gerar o conteúdo personalizado de uma proposta comercial a partir de:
1. Informações do cliente (empresa, contato, setor, áreas)
2. Transcrição ou resumo de reunião comercial
3. Produto(s) selecionados e formato

REGRAS DE TOM:
- Escreva em português brasileiro, tom consultivo e direto
- Nunca use jargão genérico de "transformação digital"
- Fale como alguém que entende o negócio do cliente — não como vendedor
- Use linguagem da Mogglia: "cocriação humano-IA", "fluência em IA", "adoção real", "IA na prática"
- Propostas são personalizadas por área — use exemplos do setor do cliente
- Seja direto e objetivo — propostas longas demais perdem conversão

PORTFÓLIO DA MOGGLIA:
- Palestra: Apresentação inspiracional sobre IA aplicada ao trabalho. Formatos: online ou presencial.
- Workshop AI Application: Treinamento prático de 8h com equipes. Foco em aplicações reais de IA nas rotinas do setor. Até 50 participantes.
- AI Adoption Program: Programa de adoção em múltiplos módulos (4-6 encontros). Inclui diagnóstico, treinamento por área, implementação e acompanhamento.
- AI Strategy Session: Sessão estratégica 1:1 ou 1:2 com C-level. 3-4h de trabalho direto para mapear oportunidades de IA no negócio.
- Executive Session: Programa executivo para líderes. Foco em decisão estratégica, gestão de times com IA e casos de uso por área de negócio.

PREÇOS:
- Palestra: R$ 8.000 online / R$ 12.000 presencial Floripa / R$ 15.000 fora de Floripa
- Workshop AI Application: R$ 28.000 até 20p / R$ 52.000 21-35p / R$ 65.000 36-50p
- AI Adoption Program: online até 20p R$ 62.000, 21-35p R$ 88.000, 36-50p R$ 112.000 | +R$15.000 módulo presencial
- AI Strategy Session: R$ 8.000 (R$ 10.000 para 2 sócios)
- Executive Session: R$ 65.000 até 15 líderes / R$ 85.000 16-25 líderes

RETORNE APENAS JSON VÁLIDO (sem markdown, sem \`\`\`json, apenas o objeto JSON puro) com esta estrutura exata:
{
  "subtitulo_capa": "frase editorial personalizada em Lora italic — máx 120 caracteres",
  "diagnostico": {
    "titulo": "O momento que [EMPRESA] está vivendo",
    "paragrafos": ["parágrafo 1", "parágrafo 2", "parágrafo 3"]
  },
  "urgencia": {
    "paragrafo_personalizado": "argumento personalizado de urgência para esta empresa — 2-3 frases"
  },
  "jornada_recomendada": null,
  "casos_de_uso_por_produto": {
    "[chave_do_produto]": {
      "descricao_personalizada": "descrição do produto adaptada ao contexto desta empresa — 2-3 frases",
      "areas": {
        "[nome_area]": ["caso de uso 1", "caso de uso 2", "caso de uso 3", "caso de uso 4"]
      }
    }
  },
  "roi": {
    "semanas_payback": 4,
    "calculo_explicado": "explicação clara do cálculo de ROI em 1-2 frases",
    "valor_total": "R$ XX.000"
  }
}`

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const dataRaw = formData.get('data')
    if (!dataRaw || typeof dataRaw !== 'string') {
      return NextResponse.json({ error: 'Missing form data' }, { status: 400 })
    }

    const data = JSON.parse(dataRaw)
    const pdfFile = formData.get('pdf') as File | null

    const userPrompt = buildUserPrompt(data)

    // Build message content
    const messageContent: Anthropic.MessageParam['content'] = []

    // Add PDF as document if provided
    if (pdfFile && pdfFile.size > 0) {
      const pdfBuffer = await pdfFile.arrayBuffer()
      const base64 = Buffer.from(pdfBuffer).toString('base64')
      messageContent.push({
        type: 'document',
        source: {
          type: 'base64',
          media_type: 'application/pdf',
          data: base64,
        },
      } as Anthropic.DocumentBlockParam)
    }

    messageContent.push({ type: 'text', text: userPrompt })

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: messageContent }],
    })

    const rawText =
      response.content[0].type === 'text' ? response.content[0].text : ''

    // Extract JSON — Claude sometimes wraps in ```json blocks despite instructions
    const jsonMatch =
      rawText.match(/```json\s*([\s\S]*?)```/) ||
      rawText.match(/```\s*([\s\S]*?)```/)
    const jsonText = jsonMatch ? jsonMatch[1] : rawText

    let content: ProposalContent
    try {
      content = JSON.parse(jsonText.trim())
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse Claude response', raw: rawText },
        { status: 500 }
      )
    }

    return NextResponse.json({ content })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function buildUserPrompt(data: {
  clientCompany: string
  clientContact: string
  clientRole: string
  clientSector: string
  clientCity: string
  selectedProducts: string[]
  productDetails: Record<string, { format: string; participants?: number }>
  contextSummary: string
  selectedAreas: string[]
  customArea: string
  proposalDate: string
}): string {
  const productsList = data.selectedProducts
    .map((p) => {
      const detail = data.productDetails[p]
      const parts = [`  - ${p}`]
      if (detail?.format) parts.push(`(formato: ${detail.format})`)
      if (detail?.participants) parts.push(`(${detail.participants} participantes)`)
      return parts.join(' ')
    })
    .join('\n')

  const areasList = [
    ...data.selectedAreas,
    ...(data.customArea ? [data.customArea] : []),
  ].join(', ')

  return `DADOS DO CLIENTE:
- Empresa: ${data.clientCompany}
- Contato: ${data.clientContact} (${data.clientRole})
- Setor: ${data.clientSector}
- Cidade: ${data.clientCity}
- Data da proposta: ${data.proposalDate}

PRODUTOS SELECIONADOS:
${productsList}

ÁREAS DE APLICAÇÃO:
${areasList || 'Não especificado — use casos de uso genéricos'}

CONTEXTO DA REUNIÃO / DOR DO CLIENTE:
${data.contextSummary || 'Nenhum contexto fornecido.'}

${
  data.selectedProducts.length > 1
    ? `NOTA: Como foram selecionados ${data.selectedProducts.length} produtos, inclua "jornada_recomendada" explicando a lógica de progressão entre eles.`
    : 'NOTA: Apenas 1 produto selecionado, defina "jornada_recomendada" como null.'
}

Gere o JSON da proposta para ${data.clientCompany}, personalizando profundamente o conteúdo para o setor ${data.clientSector} e para as áreas selecionadas.`
}
