import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, LogIn } from 'lucide-react'
import { navItems } from '../data/navigation'

interface NavChildItem {
  label: string
  href: string
  description?: string
  action?: string
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeHash, setActiveHash] = useState(window.location.hash || '#home')
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#home')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // സ്ക്രോൾ ചെയ്യുമ്പോൾ മെയിൻ മെനു മറയുകയും സബ് മെനുവിനെ top-0 ലേക്ക് വിടുകയും ചെയ്യുന്ന ലോജിക്
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // താഴേക്ക് സ്ക്രോൾ ചെയ്യുമ്പോൾ: മെയിൻ മെനു ഹൈഡ് ആകുന്നു, body-ക്ക് nav-hidden വരുന്നു
        if (showNavbar) {
          setShowNavbar(false)
          setOpenDropdown(null)
          document.body.classList.add('nav-hidden')
        }
      } else if (currentScrollY < lastScrollY) {
        // മുകളിലേക്ക് സ്ക്രോൾ ചെയ്യുമ്പോൾ: മെയിൻ മെനു തിരികെ വരുന്നു
        if (!showNavbar) {
          setShowNavbar(true)
          document.body.classList.remove('nav-hidden')
        }
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('nav-hidden')
    }
  }, [lastScrollY, showNavbar])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const openPortal = () => {
    setMobileOpen(false)
    window.dispatchEvent(new CustomEvent('open-portal-login'))
  }

  const handleNavClick = (action?: string) => {
    setOpenDropdown(null)
    setMobileOpen(false)
    if (action) {
      window.dispatchEvent(new CustomEvent(action))
    }
  }

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80' 
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-16 lg:h-20'
        }`}>
          
          {/* Branded Logo */}
          <a href="#home" className="flex flex-col shrink-0 hover:opacity-90 transition-opacity">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-brand-900 leading-none tracking-tight">ILA Global</span>
            </div>
            <span className="text-[10px] font-semibold text-brand-600 tracking-wider mt-0.5">INTERNATIONAL LEARNING ALLIANCE</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.href 
                ? activeHash.startsWith(item.href)
                : item.children?.some((child: NavChildItem) => activeHash.startsWith(child.href.split('#')[1] ? '#' + child.href.split('#')[1] : child.href))
              
              return item.children ? (
                <div key={item.label} className="relative group">
                  <div className="flex items-center">
                    <a
                      href={item.href || '#'}
                      className={`flex items-center gap-1 px-2 py-2 text-sm font-semibold transition-all relative ${
                        isActive ? 'text-brand-700' : 'text-slate-600 hover:text-brand-700'
                      }`}
                    >
                      {item.label}
                      {isActive && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-600 rounded-t-full" />}
                    </a>
                    <button
                      className={`px-1 py-2 text-sm font-semibold transition-all ${
                        isActive ? 'text-brand-700' : 'text-slate-600 hover:text-brand-700'
                      }`}
                      aria-label="Toggle Submenu"
                    >
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                    </button>
                  </div>
                  
                  <div className="absolute top-full left-0 pt-1 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                      {item.children.map((child: NavChildItem) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={(e) => {
                            if (child.action) {
                              e.preventDefault()
                              handleNavClick(child.action)
                            } else {
                              if (window.location.hash.split('#')[1] === child.href.split('#')[1]) {
                                window.dispatchEvent(new HashChangeEvent('hashchange'))
                              }
                              setOpenDropdown(null)
                              setMobileOpen(false)
                            }
                          }}
                          className={`block px-4 py-3 hover:bg-brand-50 transition-colors ${
                            activeHash.startsWith(child.href.split('#')[1] ? '#' + child.href.split('#')[1] : child.href) ? 'bg-brand-50 border-l-4 border-brand-600' : ''
                          }`}
                        >
                          <span className={`text-sm font-medium ${
                            activeHash.startsWith(child.href.split('#')[1] ? '#' + child.href.split('#')[1] : child.href) ? 'text-brand-700' : 'text-slate-800'
                          }`}>{child.label}</span>
                          {child.description && (
                            <span className="block text-xs text-slate-500 mt-0.5">{child.description}</span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-semibold transition-all relative ${
                    isActive ? 'text-brand-700' : 'text-slate-600 hover:text-brand-700'
                  }`}
                >
                  {item.label}
                  {isActive && <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand-600 rounded-t-full" />}
                </a>
              )
            })}
          </nav>

          {/* Right side CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#ilas-with-you"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors shadow-md animate-pulse-slow"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              Ilas With You
            </a>
            <button
              onClick={openPortal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-700 text-white text-sm font-semibold rounded-lg hover:bg-brand-800 transition-colors shadow-sm cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Portal Login
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-100 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="container-max px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = item.href 
                ? activeHash.startsWith(item.href)
                : item.children?.some((child: NavChildItem) => activeHash.startsWith(child.href.split('#')[1] ? '#' + child.href.split('#')[1] : child.href))

              return item.children ? (
                <div key={item.label}>
                  <div className={`flex items-center justify-between w-full rounded-lg ${isActive ? 'bg-brand-50' : ''}`}>
                    <a
                      href={item.href || '#'}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 px-3 py-3 text-sm font-medium ${
                        isActive ? 'text-brand-700' : 'text-slate-700'
                      }`}
                    >
                      {item.label}
                    </a>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className={`p-3 ${isActive ? 'text-brand-700' : 'text-slate-500'}`}
                      aria-label="Toggle dropdown"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {openDropdown === item.label && (
                    <div className="pl-4 pb-2 space-y-1">
                      {item.children.map((child: NavChildItem) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={(e) => {
                            if (child.action) {
                              e.preventDefault()
                              handleNavClick(child.action)
                            } else {
                              if (window.location.hash.split('#')[1] === child.href.split('#')[1]) {
                                window.dispatchEvent(new HashChangeEvent('hashchange'))
                              }
                              setOpenDropdown(null)
                              setMobileOpen(false)
                            }
                          }}
                          className={`block px-3 py-2 text-sm rounded-lg ${
                            activeHash.startsWith(child.href.split('#')[1] ? '#' + child.href.split('#')[1] : child.href) ? 'text-brand-700 bg-brand-50 font-medium' : 'text-slate-600 hover:text-brand-700'
                          }`}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-3 text-sm font-medium rounded-lg ${
                    isActive ? 'text-brand-700 bg-brand-50' : 'text-slate-700 hover:text-brand-700'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
            <a
              href="#ilas-with-you"
              onClick={() => setMobileOpen(false)}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-lg shadow-md"
            >
              Ilas With You
            </a>
            <button
              onClick={openPortal}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-700 text-white text-sm font-semibold rounded-lg"
            >
              <LogIn className="w-4 h-4" />
              Portal Login
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}   