import { useEffect, useState } from 'react'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { siteNavigation, utilityNavigation } from '../../data/siteNavigation'
import { QuickSearchModal } from '../shared/QuickSearchModal'

const logoUrl = 'https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/crse-logopng-png.png'

export function SiteHeader() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  // Determine which top-level menu is active based on current path
  const isMenuActive = (hubLink: string) => {
    if (hubLink === '/') return location.pathname === '/'
    return location.pathname.startsWith(hubLink) || location.pathname === hubLink
  }

  const closeNavigation = () => {
    setMenuOpen(false)
    setActiveMenu(null)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeNavigation()
    }
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`crse-header${scrolled ? ' crse-header--scrolled' : ''}`}>
      <div className="crse-header-inner">
        <Link className="crse-logo" to="/" aria-label="CRSE, accueil" onClick={closeNavigation}>
          <img src={logoUrl} alt="CRSE, Commission de régulation du secteur de l'énergie" />
        </Link>

        {/* Bouton hamburger mobile — icônes Lucide */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-chathams-blue hover:bg-slate-50"
            aria-label="Rechercher"
            onClick={() => setSearchModalOpen(true)}
          >
            <Search size={18} />
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-chathams-blue hover:bg-slate-50 transition-colors"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="crse-mobile-drawer"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex min-w-0 flex-1 flex-col items-end justify-center">
          {/* Barre utilitaire supérieure */}
          <nav className="crse-utility-nav flex items-center gap-5 text-[13px] text-[#536b8d] pb-1" aria-label="Liens pratiques">
            {utilityNavigation.map((item) => (
              <Link key={item.label} to={item.to} className="hover:text-chathams-blue font-medium transition-colors">
                {item.label}
              </Link>
            ))}
            <span className="text-slate-300">|</span>
            <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Suivez-nous :</span>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/company/crse-senegal/" aria-label="LinkedIn CRSE" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-chathams-blue transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.66.72-1.66 1.66 0 .95.71 1.66 1.66 1.66.95 0 1.66-.71 1.66-1.66 0-.94-.71-1.66-1.66-1.66Z"/></svg>
              </a>
              <a href="https://x.com/CRSE_Senegal" aria-label="X (Twitter) CRSE" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-chathams-blue transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.facebook.com/CRSESenegal" aria-label="Facebook CRSE" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-chathams-blue transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
              </a>
              <a href="https://www.youtube.com/@CRSESenegal" aria-label="YouTube CRSE" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-chathams-blue transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
              </a>
            </div>
          </nav>

          {/* Navigation principale avec taille augmentée */}
          <nav className="flex items-center gap-7 pt-1" aria-label="Navigation principale">
            {siteNavigation.map((menu) => {
              const isOpen = activeMenu === menu.label
              const hubLink =
                menu.label === 'La CRSE' ? '/la-crse' :
                menu.label === 'Secteurs régulés' ? '/secteurs' :
                menu.label === 'Consommateurs' ? '/consommateurs' :
                menu.label === 'Opérateurs' ? '/operateurs' :
                menu.label === 'Textes et documents' ? '/documents' :
                menu.label === 'Médias' ? '/medias' : '#'

              const isActive = isMenuActive(hubLink)

              return (
                <div
                  className={`crse-nav-menu${isOpen ? ' is-open' : ''} relative flex h-full items-center`}
                  key={menu.label}
                  onMouseEnter={() => setActiveMenu(menu.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={hubLink}
                    className={`flex items-center gap-1.5 py-3 text-[15px] font-semibold transition-colors whitespace-nowrap relative ${
                      isActive
                        ? 'text-shakespeare'
                        : 'text-[#1b3e80] hover:text-shakespeare'
                    }`}
                  >
                    <span>{menu.label}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-shakespeare' : 'text-slate-400'}`} />
                    {/* Active underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-shakespeare" aria-hidden="true" />
                    )}
                  </Link>

                  <div className="crse-dropdown" role="group" aria-label={`Sous-menu ${menu.label}`}>
                    {menu.groups.map((group, groupIndex) => (
                      <div className="crse-dropdown-group" key={`${menu.label}-${group.label ?? groupIndex}`}>
                        {group.label && <p className="crse-dropdown-heading">{group.label}</p>}
                        {group.items.map((item) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={closeNavigation}
                            className={({ isActive: subActive }) =>
                              subActive ? 'font-bold text-chathams-blue bg-blue-50/70' : ''
                            }
                          >
                            <span>{item.label}</span><span aria-hidden="true">↗</span>
                          </NavLink>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Recherche Desktop Popup */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-chathams-blue hover:bg-blue-50 hover:text-shakespeare transition-colors ml-2"
              aria-label="Rechercher sur le site"
            >
              <Search aria-hidden="true" size={18} />
            </button>
          </nav>
        </div>
      </div>

      {/* Pop-up de Recherche Instantanée */}
      <QuickSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* ============================================================
          MOBILE DRAWER — Tiroir coulissant depuis la droite
         ============================================================ */}
      {/* Backdrop voile flouté */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeNavigation}
        aria-hidden="true"
      />

      {/* Tiroir depuis la droite */}
      <aside
        id="crse-mobile-drawer"
        aria-label="Menu de navigation mobile"
        className={`fixed top-0 right-0 z-50 h-full w-[85vw] max-w-[360px] bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header du drawer */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
          <Link to="/" onClick={closeNavigation} className="block w-28">
            <img src={logoUrl} alt="CRSE" className="max-h-10 object-contain object-left" />
          </Link>
          <button
            type="button"
            onClick={closeNavigation}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200/70 text-slate-700 hover:bg-slate-300 transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenu déroulant du drawer */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Navigation principale Mobile */}
          <nav aria-label="Rubriques principales" className="space-y-1">
            {siteNavigation.map((menu) => {
              const isOpen = activeMenu === menu.label
              const hubLink =
                menu.label === 'La CRSE' ? '/la-crse' :
                menu.label === 'Secteurs régulés' ? '/secteurs' :
                menu.label === 'Consommateurs' ? '/consommateurs' :
                menu.label === 'Opérateurs' ? '/operateurs' :
                menu.label === 'Textes et documents' ? '/documents' :
                menu.label === 'Médias' ? '/medias' : '#'

              const isMobileActive = isMenuActive(hubLink)

              return (
                <div key={menu.label} className="border-b border-slate-100 pb-2 pt-1">
                  <div className="flex items-center justify-between">
                    <Link
                      to={hubLink}
                      onClick={closeNavigation}
                      className={`text-[16px] font-bold py-2 transition-colors ${
                        isMobileActive ? 'text-shakespeare' : 'text-chathams-blue hover:text-shakespeare'
                      }`}
                    >
                      {menu.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setActiveMenu(isOpen ? null : menu.label)}
                      className="p-2 text-slate-500 hover:text-chathams-blue"
                      aria-label={`Dérouler ${menu.label}`}
                    >
                      <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-shakespeare' : ''}`} />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="pl-3 pr-1 py-2 space-y-2 bg-slate-50 rounded-xl my-1 animate-fade-in">
                      {menu.groups.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-1">
                          {group.label && (
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 pt-1">
                              {group.label}
                            </span>
                          )}
                          {group.items.map((sub) => (
                            <NavLink
                              key={sub.to}
                              to={sub.to}
                              onClick={closeNavigation}
                              className={({ isActive: subActive }) =>
                                `block py-1.5 text-[14px] font-medium transition-colors ${
                                  subActive
                                    ? 'text-shakespeare font-bold'
                                    : 'text-slate-700 hover:text-chathams-blue'
                                }`
                              }
                            >
                              • {sub.label}
                            </NavLink>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Raccourcis rapides */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Accès rapide
            </span>
            <div className="space-y-2">
              <Link
                to="/reclamations"
                onClick={closeNavigation}
                className="flex items-center justify-between rounded-xl bg-blue-50 p-3 text-[14px] font-bold text-chathams-blue"
              >
                <span>Faire une réclamation</span>
                <span className="text-shakespeare">→</span>
              </Link>
              <Link
                to="/faq"
                onClick={closeNavigation}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-[14px] font-medium text-slate-700"
              >
                <span>Foire aux questions (FAQ)</span>
                <span>→</span>
              </Link>
              <Link
                to="/guide-du-consommateur"
                onClick={closeNavigation}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-[14px] font-medium text-slate-700"
              >
                <span>Guide du consommateur</span>
                <span>📖</span>
              </Link>
              <Link
                to="/livret-de-linvestisseur"
                onClick={closeNavigation}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-[14px] font-medium text-slate-700"
              >
                <span>Livret de l'investisseur</span>
                <span>📖</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer du drawer avec réseaux sociaux */}
        <div className="border-t border-slate-100 p-5 bg-slate-50 flex items-center justify-between">
          <span className="text-[12px] font-semibold text-slate-500">Suivez-nous :</span>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/company/crse-senegal/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-chathams-blue">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.66.72-1.66 1.66 0 .95.71 1.66 1.66 1.66.95 0 1.66-.71 1.66-1.66 0-.94-.71-1.66-1.66-1.66Z"/></svg>
            </a>
            <a href="https://x.com/CRSE_Senegal" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-chathams-blue">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.facebook.com/CRSESenegal" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-chathams-blue">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
            </a>
            <a href="https://www.youtube.com/@CRSESenegal" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-chathams-blue">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
            </a>
          </div>
        </div>
      </aside>
    </header>
  )
}
