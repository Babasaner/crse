import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  X,
  FileText,
  Newspaper,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import { useWPDocuments, useWPPosts } from '../../hooks/useWordPress'
import { getPostCategories, getWPDocumentCategory, getWPDocumentSector, stripHtml } from '../../lib/wordpress'

interface QuickSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const keyTerms = [
  { label: 'Tarifs Woyofal', to: '/documents?cats=grilles&secteur=electricite' },
  { label: 'Guide du consommateur', to: '/guide-du-consommateur' },
  { label: 'Livret de l’investisseur', to: '/livret-de-linvestisseur' },
  { label: 'Faire une réclamation', to: '/reclamations' },
  { label: 'Prix des hydrocarbures', to: '/documents?cats=hydrocarbures&secteur=hydrocarbures' },
  { label: 'Organigramme', to: '/organisation' },
  { label: 'Opérateurs du marché', to: '/operateurs/marches' },
  { label: 'Secteur électricité', to: '/secteurs' },
  { label: 'Mot du Président', to: '/mot-du-president' },
  { label: 'FAQ', to: '/faq' },
]

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const [query, setQuery] = useState('')
  const { posts } = useWPPosts({ perPage: 100 })
  const { documents } = useWPDocuments()
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return { docs: [], news: [], terms: [] }

    const matchedDocs = documents
      .filter((doc) => `${stripHtml(doc.title.rendered)} ${stripHtml(doc.excerpt?.rendered ?? doc.content?.rendered ?? '')}`.toLocaleLowerCase('fr').includes(q))
      .slice(0, 4)

    const matchedNews = posts
      .filter((post) => `${stripHtml(post.title.rendered)} ${getPostCategories(post).map((category) => category.name).join(' ')}`.toLocaleLowerCase('fr').includes(q))
      .slice(0, 3)

    const matchedTerms = keyTerms
      .filter((t) => t.label.toLowerCase().includes(q))
      .slice(0, 4)

    return { docs: matchedDocs, news: matchedNews, terms: matchedTerms }
  }, [documents, posts, query])

  const handleSelect = (url: string) => {
    onClose()
    navigate(url)
  }

  if (!isOpen) return null

  const totalResults = results.docs.length + results.news.length + results.terms.length

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in">
        {/* Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <Search className="text-chathams-blue shrink-0 mr-3.5" size={22} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher des documents, actualités, démarches..."
            className="w-full bg-transparent text-[16px] sm:text-[17px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 mr-2"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-[12px] font-bold text-slate-500 bg-slate-200/70 hover:bg-slate-300 rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6">
          {/* Default suggestion chips when empty */}
          {!query && (
            <div>
              <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                <Sparkles size={14} className="text-shakespeare" />
                <span>Recherches fréquentes & Accès rapide</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {keyTerms.map((term) => (
                  <button
                    key={term.label}
                    type="button"
                    onClick={() => handleSelect(term.to)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-chathams-blue text-[13px] font-medium text-slate-700 transition-all border border-slate-200/60"
                  >
                    <span>{term.label}</span>
                    <ArrowRight size={12} className="opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results when searching */}
          {query && totalResults > 0 && (
            <div className="space-y-6">
              {/* Documents trouvés */}
              {results.docs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-chathams-blue mb-2.5">
                    <FileText size={14} />
                    <span>Documents Officiels ({results.docs.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/50">
                    {results.docs.map((doc) => (
                      (() => {
                        const category = getWPDocumentCategory(doc)
                        const sector = getWPDocumentSector(doc)
                        const params = new URLSearchParams({ cats: category })
                        if (sector) params.set('secteur', sector)
                        params.set('annee', doc.date.slice(0, 4))
                        return (
                      <div
                        key={doc.id}
                        onClick={() => handleSelect(`/documents?${params.toString()}`)}
                        className="cursor-pointer p-3.5 hover:bg-blue-50/70 transition-colors flex items-start justify-between gap-3"
                      >
                        <div>
                          <h4 className="text-[14px] font-bold text-slate-900">{stripHtml(doc.title.rendered)}</h4>
                          <p className="text-[12px] text-slate-500 line-clamp-1 mt-0.5">Publié en {doc.date.slice(0, 4)}</p>
                        </div>
                        <span className="shrink-0 text-[11px] font-semibold text-chathams-blue bg-blue-100/70 px-2.5 py-1 rounded-md">CRSE</span>
                      </div>
                        )
                      })()
                    ))}
                  </div>
                </div>
              )}

              {/* Actualités trouvées */}
              {results.news.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-shakespeare mb-2.5">
                    <Newspaper size={14} />
                    <span>Actualités ({results.news.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/50">
                    {results.news.map((n) => (
                      <div
                        key={n.slug}
                        onClick={() => handleSelect(`/actualites/${n.slug}`)}
                        className="cursor-pointer p-3.5 hover:bg-shakespeare/10 transition-colors flex items-start justify-between gap-3"
                      >
                        <div>
                          <h4 className="text-[14px] font-bold text-slate-900">{stripHtml(n.title.rendered)}</h4>
                          <p className="text-[12px] text-slate-500 line-clamp-1 mt-0.5">{getPostCategories(n).map((category) => category.name).join(', ')}</p>
                        </div>
                        <span className="shrink-0 text-[11px] text-slate-400 mt-0.5">{n.date.slice(0, 10)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mots-clés suggérés */}
              {results.terms.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    <TrendingUp size={14} />
                    <span>Rubriques associées</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {results.terms.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => handleSelect(t.to)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[12px] font-semibold text-slate-700 flex items-center gap-1"
                      >
                        <span>{t.label}</span>
                        <ArrowRight size={11} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Aucun résultat */}
          {query && totalResults === 0 && (
            <div className="py-8 text-center">
              <Search className="mx-auto text-slate-300 mb-2" size={36} />
              <p className="text-[15px] font-bold text-slate-800">Aucun résultat pour « {query} »</p>
              <p className="text-[13px] text-slate-500 mt-1">
                Essayez des termes comme « woyofal », « tarif », « hydrocarbures », « réclamation » ou « rapport ».
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100/80 px-6 py-3 border-t border-slate-200/80 flex items-center justify-between text-[12px] text-slate-500">
          <span>Recherche globale interactive CRSE</span>
          <button
            type="button"
            onClick={() => handleSelect('/documents')}
            className="font-bold text-chathams-blue hover:underline flex items-center gap-1"
          >
            <span>Bibliothèque documentaire complète</span>
            <ExternalLink size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
