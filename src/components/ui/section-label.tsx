interface SectionLabelProps {
  children: React.ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-accent mb-3">
      {children}
    </h3>
  )
}
