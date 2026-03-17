import { ProductType } from './types'

export const PRODUCT_LABELS: Record<ProductType, string> = {
  palestra: 'Palestra',
  workshop: 'Workshop AI Application',
  aiAdoptionProgram: 'AI Adoption Program',
  aiStrategySession: 'AI Strategy Session',
  executiveSession: 'Executive Session',
}

export const PRODUCT_FORMATS: Record<ProductType, string[]> = {
  palestra: [
    'Online',
    'Presencial — Florianópolis',
    'Presencial — Fora de Florianópolis',
  ],
  workshop: ['Online', 'Presencial'],
  aiAdoptionProgram: ['Online', 'Online + Módulo Presencial'],
  aiStrategySession: ['Para 1 sócio/líder', 'Para 2 sócios/líderes'],
  executiveSession: ['Até 15 líderes', '16–25 líderes'],
}

export const PRODUCT_HAS_PARTICIPANTS: Record<ProductType, boolean> = {
  palestra: false,
  workshop: true,
  aiAdoptionProgram: true,
  aiStrategySession: false,
  executiveSession: false,
}

export function calculatePrice(
  product: ProductType,
  format: string,
  participants?: number
): number {
  switch (product) {
    case 'palestra':
      if (format.includes('Online')) return 8000
      if (format.includes('Florianópolis')) return 12000
      return 15000

    case 'workshop': {
      const n = participants ?? 1
      if (n <= 20) return 28000
      if (n <= 35) return 52000
      return 65000
    }

    case 'aiAdoptionProgram': {
      const n = participants ?? 1
      const base = n <= 20 ? 62000 : n <= 35 ? 88000 : 112000
      return format.includes('Presencial') ? base + 15000 : base
    }

    case 'aiStrategySession':
      return format.includes('2 sócios') ? 10000 : 8000

    case 'executiveSession':
      return format.includes('16') ? 85000 : 65000

    default:
      return 0
  }
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function calculatePaybackWeeks(
  products: ProductType[],
  participantsMap: Record<string, number>,
  prices: Record<string, number>
): number | null {
  const ROI_DATA: Record<
    ProductType,
    { horasGanhas: number; custoHora: number }
  > = {
    palestra: { horasGanhas: 0, custoHora: 0 },
    workshop: { horasGanhas: 4, custoHora: 50 },
    aiAdoptionProgram: { horasGanhas: 12, custoHora: 50 },
    aiStrategySession: { horasGanhas: 6, custoHora: 300 },
    executiveSession: { horasGanhas: 6, custoHora: 300 },
  }

  const totalPrice = Object.values(prices).reduce((a, b) => a + b, 0)
  let weeklyGain = 0
  for (const product of products) {
    const { horasGanhas, custoHora } = ROI_DATA[product]
    const n = participantsMap[product] ?? 1
    weeklyGain += horasGanhas * n * custoHora
  }

  if (weeklyGain === 0) return null
  return Math.round(totalPrice / weeklyGain)
}

export function generateSlug(
  company: string,
  product: string,
  date: string
): string {
  const months = [
    'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ]
  const d = new Date(date + 'T12:00:00')
  const month = months[d.getMonth()] ?? 'data'
  const year = d.getFullYear()

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 25)

  return `${slugify(company)}-${slugify(product)}-${month}-${year}`
}
