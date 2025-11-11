export default function Input({ label, id, type = 'text', className = '', ...props }){
  return (
    <label className="block text-sm mb-4">
      {label && <span className="block text-[var(--text-secondary)] mb-2 font-medium">{label}</span>}
      <input id={id} type={type} className={`w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-gray-700 text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all duration-200 ${className}`} {...props} />
    </label>
  )
}
