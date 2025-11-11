export default function SectionTitle({ children, subtitle }){
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-2">{children}</h2>
      {subtitle && <p className="text-lg text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto">{subtitle}</p>}
      <div className="w-16 h-1 bg-[var(--accent)] mx-auto mt-4 rounded-full"></div>
    </div>
  )
}
