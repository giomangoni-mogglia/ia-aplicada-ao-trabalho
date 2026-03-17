export type ProductType =
  | 'palestra'
  | 'workshop'
  | 'aiAdoptionProgram'
  | 'aiStrategySession'
  | 'executiveSession'

export type AreaType =
  | 'marketing'
  | 'vendas'
  | 'rh'
  | 'operacoes'
  | 'financeiro'
  | 'juridico'
  | 'gestao'
  | 'outro'

export interface ProductDetail {
  format: string
  participants?: number
}

export interface ProposalFormData {
  clientCompany: string
  clientContact: string
  clientRole: string
  clientSector: string
  clientCity: string
  selectedProducts: ProductType[]
  productDetails: Partial<Record<ProductType, ProductDetail>>
  contextSummary: string
  selectedAreas: AreaType[]
  customArea: string
  proposalDate: string
}

export interface ProposalContent {
  subtitulo_capa: string
  diagnostico: {
    titulo: string
    paragrafos: string[]
  }
  urgencia: {
    paragrafo_personalizado: string
  }
  jornada_recomendada: string | null
  casos_de_uso_por_produto: Record<
    string,
    {
      descricao_personalizada: string
      areas: Record<string, string[]>
    }
  >
  roi: {
    semanas_payback: number
    calculo_explicado: string
    valor_total: string
  }
}

export interface EditState {
  subtitulo_capa: string
  diagnostico_titulo: string
  diagnostico_paragrafos: string[]
  urgencia_paragrafo: string
  jornada_recomendada: string
  produtos: Record<
    string,
    {
      descricao: string
      areas: Record<string, string[]>
    }
  >
  ganhos: Array<{
    nivel: string
    economia: string
    horas: string
    descricao: string
  }>
  precos: Record<string, string>
  roi_semanas: string
  roi_calculo: string
  roi_valor_total: string
  bio: string
}

export interface ProposalRecord {
  id: string
  created_at: string
  updated_at: string
  client_name: string
  client_company: string
  products: string[]
  form_data: ProposalFormData
  content: ProposalContent
  edited_content: EditState | null
  slug: string
}
