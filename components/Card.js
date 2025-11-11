export default function Card({ children, className = '', hover = true }){
  const hoverClass = hover ? 'hover:shadow-xl hover:scale-105 transition-all duration-300' : ''
  return (
    <div className={`rounded-xl p-6 shadow-lg ${hoverClass} ${className}`} style={{background:'var(--card)'}}>
      {children}
    </div>
  )
}
