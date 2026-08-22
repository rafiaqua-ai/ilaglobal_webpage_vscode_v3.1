import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'German Language', href: '#education' },
    { label: 'Ausbildung', href: '#education' },
    { label: 'Job Placement', href: '#jobs' },
    { label: 'Visa Services', href: '#visa' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Rewards Program', href: '#rewards' },
    { label: 'Contact', href: '#about' },
    { label: 'Portal Login', href: '#', onClick: () => window.dispatchEvent(new CustomEvent('open-portal-login')) },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#privacy-policy' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-blue-100">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/assets/logo.png" alt="ila's with you" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm text-blue-200 leading-relaxed max-w-sm mb-6">
              International Learning Alliance — empowering careers through education,
              placement, and visa services across the globe.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {'onClick' in link && link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-sm text-blue-200 hover:text-white transition-colors"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} className="text-sm text-blue-200 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-300">&copy; {new Date().getFullYear()} ILA Global. All rights reserved.</p>
          <p className="text-xs text-blue-400">International Learning Alliance GmbH</p>
        </div>
      </div>
    </footer>
  )
}
