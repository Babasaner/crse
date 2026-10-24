import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  currentPageTitle?: string
  className?: string
}

const routeHierarchyMap: Record<string, BreadcrumbItem[]> = {
  // La CRSE
  '/la-crse': [{ label: 'La CRSE' }],
  '/mot-du-president': [{ label: 'La CRSE', to: '/la-crse' }, { label: 'Mot du Président' }],
  '/presentation': [{ label: 'La CRSE', to: '/la-crse' }, { label: 'Présentation' }],
  '/missions': [{ label: 'La CRSE', to: '/la-crse' }, { label: 'Missions & Attributions' }],
  '/organisation': [{ label: 'La CRSE', to: '/la-crse' }, { label: 'Organisation & Gouvernance' }],
  '/politique-qualite': [{ label: 'La CRSE', to: '/la-crse' }, { label: 'Politique qualité' }],
  
  // Secteurs régulés
  '/secteurs': [{ label: 'Secteurs régulés' }],
  '/secteur-electricite': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité' }],
  '/electricite': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité' }],
  '/electricite/acteurs': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité', to: '/electricite' }, { label: 'Présentation des acteurs' }],
  '/electricite/agences': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité', to: '/electricite' }, { label: 'Les Agences' }],
  '/agences': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité', to: '/electricite' }, { label: 'Les Agences' }],
  '/electricite/operateur-historique': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité', to: '/electricite' }, { label: 'Opérateur Historique (Senelec)' }],
  '/electricite/auto-producteurs': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité', to: '/electricite' }, { label: 'Auto-producteurs' }],
  '/electricite/producteurs-independants': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité', to: '/electricite' }, { label: 'Producteurs Privés Indépendants (IPP)' }],
  '/electricite/concessionnaires-ruraux': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité', to: '/electricite' }, { label: 'Concessionnaires d’Électrification Rurale (CER)' }],
  '/electricite/concessionnaires-decentralises': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité', to: '/electricite' }, { label: 'Concessionnaires CERD' }],
  '/electricite/chiffres-cles': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité', to: '/electricite' }, { label: 'Chiffres clés' }],
  '/electricite/grilles-tarifaires': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Électricité', to: '/electricite' }, { label: 'Grilles tarifaires' }],
  
  '/hydrocarbures': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Aval des hydrocarbures' }],
  '/hydrocarbures/acteurs': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Aval des hydrocarbures', to: '/hydrocarbures' }, { label: 'Présentation des acteurs' }],
  '/hydrocarbures/chiffres-cles': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Aval des hydrocarbures', to: '/hydrocarbures' }, { label: 'Chiffres clés' }],
  '/hydrocarbures/structures-des-prix': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Aval des hydrocarbures', to: '/hydrocarbures' }, { label: 'Structures des prix' }],
  
  '/gaz': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Aval et intermédiaire gaziers' }],
  '/gaz/acteurs': [{ label: 'Secteurs régulés', to: '/secteurs' }, { label: 'Aval et intermédiaire gaziers', to: '/gaz' }, { label: 'Présentation des acteurs' }],

  // Consommateurs
  '/consommateurs': [{ label: 'Consommateurs' }],
  '/consommateurs/associations': [{ label: 'Consommateurs', to: '/consommateurs' }, { label: 'Associations de consommateurs' }],
  '/consommateurs/guide': [{ label: 'Consommateurs', to: '/consommateurs' }, { label: 'Guide du consommateur' }],
  '/guide-du-consommateur': [{ label: 'Consommateurs', to: '/consommateurs' }, { label: 'Guide du consommateur' }],
  '/reclamations': [{ label: 'Consommateurs', to: '/consommateurs' }, { label: 'Réclamations' }],
  '/faq': [{ label: 'Consommateurs', to: '/consommateurs' }, { label: 'Foire aux questions (FAQ)' }],

  // Opérateurs
  '/operateurs': [{ label: 'Opérateurs' }],
  '/operateurs/marches': [{ label: 'Opérateurs', to: '/operateurs' }, { label: 'Opérateurs sur les marchés' }],
  '/operateurs/pour-les-operateurs': [{ label: 'Opérateurs', to: '/operateurs' }, { label: 'Pour les opérateurs' }],
  '/operateurs/livret-investisseur': [{ label: 'Opérateurs', to: '/operateurs' }, { label: 'Livret de l’investisseur' }],
  '/livret-de-linvestisseur': [{ label: 'Opérateurs', to: '/operateurs' }, { label: 'Livret de l’investisseur' }],

  // Textes et documents
  '/documents': [{ label: 'Textes et documents' }],
  '/documents/textes': [{ label: 'Textes et documents', to: '/documents' }, { label: 'Textes législatifs et réglementaires' }],
  '/documents/decisions-avis': [{ label: 'Textes et documents', to: '/documents' }, { label: 'Décisions et avis' }],
  '/documents/grilles-tarifaires': [{ label: 'Textes et documents', to: '/documents' }, { label: 'Grilles tarifaires' }],
  '/documents/structures-prix': [{ label: 'Textes et documents', to: '/documents' }, { label: 'Structures des prix' }],
  '/documents/bulletin-officiel': [{ label: 'Textes et documents', to: '/documents' }, { label: 'Bulletin officiel' }],
  '/documents/consultations': [{ label: 'Textes et documents', to: '/documents' }, { label: 'Consultations publiques' }],
  '/documents/rapports': [{ label: 'Textes et documents', to: '/documents' }, { label: 'Rapports' }],

  // Médias
  '/medias': [{ label: 'Médias' }],
  '/actualites': [{ label: 'Médias', to: '/medias' }, { label: 'Actualités' }],
  '/agenda': [{ label: 'Médias', to: '/medias' }, { label: 'Agenda des événements' }],

  // Utilitaires & Spécialisés
  '/contact': [{ label: 'Nous contacter' }],
  '/recrutement': [{ label: 'Carrières', to: '/recrutement' }, { label: 'Recrutement' }],
  '/recherche': [{ label: 'Recherche' }],
  '/mentions-legales': [{ label: 'Mentions légales' }],
  '/ressources': [{ label: 'Ressources usagers' }],
}

export function Breadcrumb({ items, currentPageTitle, className = '' }: BreadcrumbProps) {
  const location = useLocation()
  const pathname = location.pathname

  // Resolve breadcrumb chain
  let resolvedItems: BreadcrumbItem[] = []

  if (items && items.length > 0) {
    resolvedItems = items
  } else if (routeHierarchyMap[pathname]) {
    resolvedItems = routeHierarchyMap[pathname]
  } else if (pathname.startsWith('/actualites/')) {
    resolvedItems = [
      { label: 'Médias', to: '/medias' },
      { label: 'Actualités', to: '/actualites' },
      { label: currentPageTitle || 'Article' },
    ]
  } else {
    // Dynamic fallback for any unmatched nested route
    const segments = pathname.split('/').filter(Boolean)
    resolvedItems = segments.map((seg, idx) => {
      const isLast = idx === segments.length - 1
      const to = isLast ? undefined : `/${segments.slice(0, idx + 1).join('/')}`
      const formattedLabel = seg
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
      return {
        label: isLast && currentPageTitle ? currentPageTitle : formattedLabel,
        to,
      }
    })
  }

  // Override last item title if provided explicitly
  if (currentPageTitle && resolvedItems.length > 0) {
    resolvedItems[resolvedItems.length - 1] = {
      ...resolvedItems[resolvedItems.length - 1],
      label: currentPageTitle,
    }
  }

  return (
    <nav
      aria-label="Fil d’Ariane"
      className={`page-breadcrumb flex flex-wrap items-center gap-1.5 text-[12px] sm:text-[13px] text-slate-500 font-medium ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-chathams-blue hover:underline transition-colors"
          >
            <Home size={13} className="text-shakespeare shrink-0" aria-hidden="true" />
            <span>Accueil</span>
          </Link>
        </li>

        {resolvedItems.map((item, index) => {
          const isLast = index === resolvedItems.length - 1

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              <ChevronRight size={13} className="text-slate-400 shrink-0" aria-hidden="true" />
              {isLast || !item.to ? (
                <span
                  className="font-semibold text-chathams-blue max-w-[280px] sm:max-w-[420px] truncate"
                  aria-current={isLast ? 'page' : undefined}
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-slate-600 hover:text-chathams-blue hover:underline transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
