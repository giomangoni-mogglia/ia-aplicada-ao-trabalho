'use client'

import { useRef, useEffect, createElement } from 'react'

interface EditableTextProps {
  value: string
  onChange?: (val: string) => void
  as?: string
  className?: string
  editing?: boolean
}

export default function EditableText({
  value,
  onChange,
  as: tag = 'div',
  className = '',
  editing = true,
}: EditableTextProps) {
  const ref = useRef<HTMLElement>(null)

  // Initialize content on mount only — let user edit freely
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = value
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!editing) {
    return createElement(tag, { className }, value)
  }

  return createElement(tag, {
    ref,
    contentEditable: true,
    suppressContentEditableWarning: true,
    className: [
      'outline-none',
      'cursor-text',
      'rounded',
      'transition-colors',
      'hover:bg-[#F97477]/5',
      'focus:bg-[#F97477]/5',
      'focus:outline',
      'focus:outline-2',
      'focus:outline-[#F97477]',
      className,
    ]
      .filter(Boolean)
      .join(' '),
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      onChange?.(e.currentTarget.textContent || '')
    },
  })
}
