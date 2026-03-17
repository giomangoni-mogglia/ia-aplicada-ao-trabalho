import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProposalViewServer from './ProposalViewServer'

interface Props {
  params: { slug: string }
}

export default async function PropostaPage({ params }: Props) {
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !data) {
    notFound()
  }

  const displayContent = data.edited_content ?? null

  return (
    <div style={{ background: '#F7F3EA', minHeight: '100vh', padding: '32px 24px' }}>
      <ProposalViewServer
        formData={data.form_data}
        content={data.content}
        editState={displayContent}
      />
    </div>
  )
}
