import Link from 'next/link'

export default function Footer(){
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Services: [
      { href: '/services', label: 'IoT & Automation' },
      { href: '/services', label: 'Web Development' },
      { href: '/services', label: 'Consulting' }
    ],
    Company: [
      { href: '/about', label: 'About Us' },
      { href: '/projects', label: 'Projects' },
      { href: '/contact', label: 'Contact' }
    ],
    Connect: [
      { href: 'mailto:techl.earners.offl@gmail.com', label: 'Email', external: true },
      { href: 'https://instagram.com/techl_earners2000', label: 'Instagram', external: true },
      { href: 'https://github.com/TechLEarners2000', label: 'GitHub', external: true }
    ]
  }

  return (
    <footer className="bg-[var(--bg)] border-t border-gray-800 dark:border-gray-700 light:border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.svg" alt="TechLEarners" className="h-8 w-8"/>
              <span className="font-bold text-lg text-[var(--text)]">TechLEarners</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
              Building practical IoT, automation and web solutions that help teams move faster and operate smarter.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">
                <span className="text-xl">💼</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">
                <span className="text-xl">🐙</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-[var(--text)] mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.Services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-[var(--text)] mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-[var(--text)] mb-4">Connect</h3>
            <ul className="space-y-2">
              {footerLinks.Connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.external ? link.href : '#'}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm"
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 light:border-gray-200 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-[var(--text-secondary)]">
          <div>© {currentYear} TechLEarners. All rights reserved.</div>
          <div className="mt-4 md:mt-0">
            <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
