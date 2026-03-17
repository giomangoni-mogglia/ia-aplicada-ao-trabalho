'use client'

import ProposalView from '@/app/components/proposal/ProposalView'
import { ProposalFormData, ProposalContent, EditState } from '@/lib/types'

interface Props {
  formData: ProposalFormData
  content: ProposalContent
  editState: EditState | null
}

export default function ProposalViewServer({ formData, content, editState }: Props) {
  return (
    <ProposalView
      formData={formData}
      content={content}
      initialEditState={editState ?? undefined}
      editing={false}
    />
  )
}
