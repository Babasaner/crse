import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Download,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  FileText,
  Gavel,
  LoaderCircle,
  Newspaper,
  Search,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'
import { useWPDocumentCatalog, useWPDocumentPage } from '../hooks/useWordPress'
import { formatWPDate, stripHtml } from '../lib/wordpress'
import type { WPDocument, WPDocumentTerm } from '../lib/wordpress'

type CategoryGroup = {
  id: string
  label: string
  icon: LucideIcon
  color: string
  slugs: string[]
}

const categoryGroups: CategoryGroup[] = [
  { id: 'textes', label: 'Textes législatifs et réglementaires', icon: Gavel, color: '#1b3e80', slugs: ['lois', 'decrets', 'arretes', 'reglements-dapplication-et-reglements'] },
  { id: 'decisions-avis', label: 'Décisions et avis', icon: ClipboardList, color: '#55aed0', slugs: ['decisions', 'avis'] },
  { id: 'grilles', label: 'Grilles tarifaires', icon: FileSpreadsheet, color: '#e38d19', slugs: ['grilles-tarifaires'] },
  { id: 'hydrocarbures', label: 'Structures des prix des hydrocarbures', icon: FileSpreadsheet, color: '#da6830', slugs: ['structures-des-prix-des-hydrocarbures'] },
  { id: 'bulletins', label: 'Bulletins officiels', icon: Newspaper, color: '#1b3e80', slugs: ['bulletins-officiels'] },
  { id: 'consultations', label: 'Consultations publiques', icon: BookOpen, color: '#55aed0', slugs: ['documents-de-consultation-publique'] },
  { id: 'rapports', label: 'Rapports et études', icon: FileText, color: '#1b3e80', slugs: ['rapports'] },
  { id: 'autres', label: 'Autres publications', icon: FileText, color: '#64748b', slugs: [] },
]

const sectorAliases: Record<string, string> = {
  gaz: 'intermediaire-aval-gazier',
  'aval-gazier': 'intermediaire-aval-gazier',
}

const EMPTY_TERMS: WPDocumentTerm[] = []

function getGroupForSlug(slug: string): CategoryGroup {
  return categoryGroups.find((group) => group.slugs.includes(slug))
    ?? categoryGroups.find((group) => group.id === 'autres')!
}

function getGroupFromQuery(cats: string | null, subcategory: string | null, types: WPDocumentTerm[]): CategoryGroup | null {
  if (!cats) return null
  const normalized = cats.toLocaleLowerCase('fr')
  const ids = normalized.split(',').map((value) => value.trim())
  if (ids.includes('decisions-avis') || ids.includes('decisions-et-avis')) {
    return categoryGroups.find((group) => group.id === 'decisions-avis')!
  }

  const exact = categoryGroups.find((group) => group.id === normalized)
  if (exact) return exact

  const typeSlug = subcategory
    || types.find((type) => ids.includes(type.slug))?.slug
    || (ids.includes('hydrocarbures') ? 'structures-des-prix-des-hydrocarbures' : ids[0])
  return getGroupForSlug(typeSlug)
}

function termsForGroup(group: CategoryGroup | null, types: WPDocumentTerm[]): WPDocumentTerm[] {
  if (!group) return types
  if (group.id === 'autres') {
    const knownSlugs = categoryGroups.flatMap((item) => item.slugs)
    return types.filter((type) => !knownSlugs.includes(type.slug))
  }
  return types.filter((type) => group.slugs.includes(type.slug))
}

function getDocumentTerms(document: WPDocument): WPDocumentTerm[] {
  return document.types ?? []
}

export function DocumentsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { catalog, loading: catalogLoading, error: catalogError } = useWPDocumentCatalog()
  const [searchDraft, setSearchDraft] = useState(searchParams.get('q') ?? '')
  const [previewDoc, setPreviewDoc] = useState<WPDocument | null>(null)

  const types = catalog?.types ?? EMPTY_TERMS
  const sectors = catalog?.secteurs ?? EMPTY_TERMS
  const group = getGroupFromQuery(searchParams.get('cats') || searchParams.get('cat'), searchParams.get('subcat'), types)
  const selectedSubcategory = searchParams.get('subcat') ?? ''
  const selectedSector = searchParams.get('secteur') || searchParams.get('sector') || ''
  const sectorSlug = sectorAliases[selectedSector] ?? selectedSector
  const query = searchParams.get('q') ?? ''
  const requestedPage = Number.parseInt(searchParams.get('page') ?? '1', 10)
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const showCategories = !group && !sectorSlug && !query
  const groupTerms = useMemo(() => termsForGroup(group, types), [group, types])
  const queryCategories = selectedSubcategory
    ? [selectedSubcategory]
    : group
      ? groupTerms.map((term) => term.slug)
      : []

  const { documents, total, totalPages, loading, error } = useWPDocumentPage({
    page,
    perPage: 10,
    categories: queryCategories,
    sector: sectorSlug,
    search: query,
  })

  const countsBySlug = useMemo(() => new Map(types.map((type) => [type.slug, type.count ?? 0])), [types])
  const availableGroups = categoryGroups
    .map((category) => ({
      ...category,
      terms: termsForGroup(category, types),
    }))
    .filter((category) => category.terms.length > 0)

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams)
    const legacyCategory = next.get('cat')
    const legacySector = next.get('sector')
    if (!next.has('cats') && legacyCategory) next.set('cats', legacyCategory)
    if (!next.has('secteur') && legacySector) next.set('secteur', legacySector)
    for (const [key, value] of Object.entries(updates)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    next.delete('cat')
    next.delete('sector')
    next.set('page', '1')
    if (next.get('page') === '1') next.delete('page')
    setSearchParams(next)
  }

  const selectGroup = (selected: CategoryGroup) => {
    const next = new URLSearchParams()
    next.set('cats', selected.id)
    if (selectedSector) next.set('secteur', selectedSector)
    setSearchParams(next)
  }

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateParams({ q: searchDraft.trim() || null })
  }

  const filterDocuments = (documents: WPDocument[]) => documents.map((document) => ({
    document,
    title: stripHtml(document.title.rendered),
    description: stripHtml(document.excerpt?.rendered ?? document.content?.rendered ?? ''),
    categoryLabel: getDocumentTerms(document).map((term) => term.name).join(', '),
    sectorLabel: document.secteurs?.map((sector) => stripHtml(sector.name)).join(', ') ?? '',
    pdfUrl: document.pdf_url ?? document.file_url ?? null,
  }))

  const documentItems = filterDocuments(documents)
  const pageTitle = group?.label
    ?? (sectorSlug ? sectors.find((sector) => sector.slug === sectorSlug)?.name ?? 'Documents du secteur' : 'Résultats de recherche')

  return (
    <>
      <PageBanner
        eyebrow="Ressources officielles"
        title="Textes & Documents"
        description="Parcourez les documents publiés par la CRSE, filtrez-les par catégorie et secteur, puis consultez ou téléchargez les PDF."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12">
        {catalogError && (
          <div role="alert" className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            L’API des catégories CRSE n’a pas répondu : {catalogError}
          </div>
        )}

        <form onSubmit={submitSearch} className="mb-8 flex max-w-3xl items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <Search size={19} className="ml-2 shrink-0 text-slate-400" />
          <input
            value={searchDraft}
            onChange={(event) => setSearchDraft(event.target.value)}
            placeholder="Rechercher un document ou un numéro…"
            aria-label="Rechercher un document ou un numéro"
            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-slate-800 outline-none"
          />
          <Button type="submit" className="rounded-lg bg-chathams-blue text-white">Rechercher</Button>
        </form>

        {showCategories ? (
          <section aria-labelledby="document-categories-title">
            <div className="mb-7">
              <h2 id="document-categories-title" className="text-2xl font-bold text-chathams-blue sm:text-3xl">Catégories de documents</h2>
              <p className="mt-2 text-sm text-slate-600">Choisissez une catégorie, puis une sous-catégorie pour filtrer les publications officielles.</p>
            </div>
            {catalogLoading ? (
              <p className="mb-5 flex items-center gap-2 text-sm text-slate-500"><LoaderCircle size={18} className="animate-spin" />Chargement des catégories depuis crse.sn…</p>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {availableGroups.map((category) => {
                const Icon = category.icon
                const count = category.terms.reduce((sum, term) => sum + (countsBySlug.get(term.slug) ?? 0), 0)
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => selectGroup(category)}
                    className="group flex min-h-44 flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-shakespeare/60 hover:shadow-md"
                  >
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `${category.color}14`, color: category.color }}>
                      <Icon size={23} />
                    </span>
                    <span className="font-bold leading-snug text-chathams-blue group-hover:text-shakespeare">{category.label}</span>
                    <span className="mt-auto pt-3 text-sm text-slate-500">{count} document{count === 1 ? '' : 's'}</span>
                  </button>
                )
              })}
            </div>
            <div className="mt-9 max-w-sm">
              <label htmlFor="all-documents-sector" className="mb-2 block text-sm font-semibold text-slate-700">Filtrer tous les documents par secteur</label>
              <select
                id="all-documents-sector"
                value={selectedSector}
                onChange={(event) => updateParams({ secteur: event.target.value || null })}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
              >
                <option value="">Tous les secteurs</option>
                {sectors.map((sector) => <option key={sector.slug} value={sector.slug}>{stripHtml(sector.name)}</option>)}
              </select>
            </div>
          </section>
        ) : (
          <section aria-labelledby="document-results-title">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <button type="button" onClick={() => setSearchParams({})} className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-chathams-blue">
                  <ArrowLeft size={15} /> Catégories
                </button>
                <h2 id="document-results-title" className="text-2xl font-bold text-chathams-blue">{pageTitle}</h2>
              </div>
              <span className="text-sm text-slate-500">{total} document{total === 1 ? '' : 's'}</span>
            </div>

            <div className="mb-7 grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Sous-catégorie</span>
                <select
                  value={selectedSubcategory}
                  onChange={(event) => updateParams({ subcat: event.target.value || null })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                >
                  <option value="">Toutes les sous-catégories</option>
                  {groupTerms.map((term) => <option key={term.slug} value={term.slug}>{term.name}</option>)}
                </select>
              </label>
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Secteur</span>
                <select
                  value={selectedSector}
                  onChange={(event) => updateParams({ secteur: event.target.value || null })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                >
                  <option value="">Tous les secteurs</option>
                  {sectors.map((sector) => <option key={sector.slug} value={sector.slug}>{stripHtml(sector.name)}</option>)}
                </select>
              </label>
            </div>

            {loading ? (
              <div className="flex items-center justify-center gap-3 py-16 text-slate-500"><LoaderCircle size={20} className="animate-spin" />Chargement depuis l’API CRSE…</div>
            ) : error ? (
              <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">Erreur lors du chargement des documents : {error}</div>
            ) : documentItems.length ? (
              <>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {documentItems.map(({ document, title, description, categoryLabel, sectorLabel, pdfUrl }) => (
                    <article key={document.id} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-shakespeare/60 hover:shadow-md">
                      <div>
                        <div className="mb-3 flex flex-wrap gap-2">
                          {categoryLabel && <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-chathams-blue">{categoryLabel}</span>}
                          {document.number && <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">N° {document.number}</span>}
                        </div>
                        <h3 className="line-clamp-3 text-base font-bold leading-snug text-chathams-blue">{title}</h3>
                        {description && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{description}</p>}
                        {sectorLabel && <p className="mt-3 text-xs font-semibold text-slate-500">Secteur : {sectorLabel}</p>}
                      </div>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <span className="text-xs text-slate-400">Publié le {formatWPDate(document.date)}</span>
                        <div className="flex items-center gap-2">
                          {pdfUrl ? (
                            <>
                              <Button type="button" size="sm" variant="outline" onClick={() => setPreviewDoc(document)} className="h-9 gap-1.5 rounded-lg px-3 text-xs font-semibold text-chathams-blue">
                                <Eye size={14} /> Visualiser
                              </Button>
                              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-chathams-blue px-3 text-xs font-semibold text-white hover:bg-chathams-blue/90">
                                <Download size={14} /> PDF
                              </a>
                            </>
                          ) : (
                            <a href={document.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-chathams-blue hover:underline">
                              Publication <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                {totalPages > 1 && (
                  <nav aria-label="Pagination des documents" className="mt-8 flex items-center justify-center gap-4">
                    <Button type="button" variant="outline" disabled={page <= 1} onClick={() => updateParams({ page: String(page - 1) })} className="rounded-full">
                      <ChevronLeft size={16} /> Précédent
                    </Button>
                    <span className="text-sm text-slate-600">Page {page} / {totalPages}</span>
                    <Button type="button" variant="outline" disabled={page >= totalPages} onClick={() => updateParams({ page: String(page + 1) })} className="rounded-full">
                      Suivant <ChevronRight size={16} />
                    </Button>
                  </nav>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                <FileText size={34} className="mx-auto text-slate-400" />
                <p className="mt-4 font-semibold text-slate-700">Aucun document ne correspond à ces filtres.</p>
              </div>
            )}
          </section>
        )}
      </main>

      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="preview-modal-title">
          <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <h2 id="preview-modal-title" className="line-clamp-2 font-bold text-chathams-blue">{stripHtml(previewDoc.title.rendered)}</h2>
                <p className="mt-1 text-xs text-slate-500">Document officiel CRSE · PDF</p>
              </div>
              <button type="button" onClick={() => setPreviewDoc(null)} aria-label="Fermer la prévisualisation" className="shrink-0 rounded-full p-2 text-slate-500 hover:bg-slate-200"><X size={20} /></button>
            </header>
            <div className="min-h-[50vh] flex-1 bg-slate-100">
              {previewDoc.pdf_url || previewDoc.file_url ? (
                <iframe title={stripHtml(previewDoc.title.rendered)} src={previewDoc.pdf_url ?? previewDoc.file_url ?? undefined} className="h-[70vh] min-h-[50vh] w-full bg-white" />
              ) : (
                <div className="flex min-h-[50vh] items-center justify-center px-6 text-center text-slate-600">Aucun PDF n’est associé à ce document.</div>
              )}
            </div>
            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
              <Button type="button" variant="outline" onClick={() => setPreviewDoc(null)} className="rounded-full">Fermer</Button>
              {(previewDoc.pdf_url || previewDoc.download_url) && (
                <a href={previewDoc.download_url ?? previewDoc.pdf_url ?? undefined} target="_blank" rel="noopener noreferrer" download className="inline-flex h-10 items-center gap-2 rounded-full bg-chathams-blue px-5 text-sm font-semibold text-white hover:bg-chathams-blue/90">
                  <Download size={16} /> Télécharger le PDF
                </a>
              )}
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
