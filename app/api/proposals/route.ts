import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateSlug, PRODUCT_LABELS } from '@/lib/pricing'
import { ProductType } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { formData, content, editedContent } = body

    const mainProduct = formData.selectedProducts[0] as ProductType
    const productLabel = PRODUCT_LABELS[mainProduct] ?? mainProduct
    const slug = generateSlug(
      formData.clientCompany,
      productLabel,
      formData.proposalDate
    )

    // Check for slug collision and append random suffix if needed
    const { data: existing } = await supabase
      .from('proposals')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    const finalSlug = existing
      ? `${slug}-${Math.random().toString(36).slice(2, 6)}`
      : slug

    const { data, error } = await supabase
      .from('proposals')
      .insert({
        client_name: formData.clientContact,
        client_company: formData.clientCompany,
        products: formData.selectedProducts,
        form_data: formData,
        content,
        edited_content: editedContent ?? null,
        slug: finalSlug,
      })
      .select('id, slug')
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id, slug: data.slug })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
