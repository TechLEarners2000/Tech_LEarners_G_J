export default function Button({ children, variant = 'primary', className = '', ...props }){
  const base = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)] transform hover:scale-105 active:scale-95'
  const variants = {
    primary: 'bg-[var(--accent)] text-black hover:opacity-90 shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent border-2 border-gray-600 text-[var(--text)] hover:bg-gray-800 hover:border-gray-500',
    secondary: 'bg-[var(--cyan)] text-black hover:opacity-90'
  }
  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  )
}
