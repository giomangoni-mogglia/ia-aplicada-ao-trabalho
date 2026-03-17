import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Proposta não encontrada' }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { editedContent } = await req.json()

    const { error } = await supabase
      .from('proposals')
      .update({
        edited_content: editedContent,
        updated_at: new Date().toISOString(),
      })
      .eq('slug', params.slug)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
