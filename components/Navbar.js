import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isAuthenticated, getCurrentUser, logoutUser } from '../lib/mockApi'

export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    } else {
      setIsDark(true)
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    }

    // Check authentication status
    setCurrentUser(getCurrentUser())
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleLogout = () => {
    logoutUser()
    setCurrentUser(null)
    router.push('/')
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  const getDashboardItems = () => {
    if (!currentUser) return [
      { href: '/login', label: 'Login' },
      { href: '/register', label: 'Register' }
    ]

    switch (currentUser.role) {
      case 'customer':
        return [{ href: '/customer-dashboard', label: 'My Dashboard' }]
      case 'developer':
        return [{ href: '/developer-dashboard', label: 'My Tasks' }]
      case 'owner':
        return [{ href: '/owner-dashboard', label: 'Management' }]
      default:
        return []
    }
  }

  const dashboardItems = getDashboardItems()

  return (
    <header className="bg-[var(--bg)]/95 backdrop-blur-sm border-b border-gray-800 dark:border-gray-700 light:border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/logo.svg" alt="TechLEarners" className="h-10 w-10"/>
            <span className="font-bold text-xl text-[var(--text)]">TechLEarners</span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                  router.pathname === item.href ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* Dashboard Links */}
            {dashboardItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                  router.pathname === item.href ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {currentUser && (
              <button
                onClick={handleLogout}
                className="text-sm font-medium transition-colors hover:text-[var(--accent)] text-[var(--text-secondary)]"
              >
                Logout
              </button>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-800 ${
                  router.pathname === item.href ? 'text-[var(--accent)] bg-gray-800' : 'text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* Dashboard Links Mobile */}
            {dashboardItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-800 ${
                  router.pathname === item.href ? 'text-[var(--accent)] bg-gray-800' : 'text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {currentUser && (
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-800 text-[var(--text-secondary)]"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
