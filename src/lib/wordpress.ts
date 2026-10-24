/**
 * WordPress REST API Hook — Actualités CRSE
 * Fetches live posts from https://www.crse.sn/wp-json/wp/v2/posts
 * with embedded media and terms for images and categories.
 */

const WP_BASE = 'https://www.crse.sn/wp-json/wp/v2'
const CRSE_API_BASE = 'https://www.crse.sn/wp-json/crse/v1'

export interface WPCategory {
  id: number
  name: string
  slug: string
  count: number
}

export interface WPPost {
  id: number
  date: string
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  categories: number[]
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      media_details?: {
        sizes?: {
          medium?: { source_url: string }
          medium_large?: { source_url: string }
          full?: { source_url: string }
        }
      }
    }>
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>
  }
}

export interface WPDocument {
  id: number
  date: string
  slug: string
  type: 'document' | 'crse_document'
  title: { rendered: string }
  link: string
  number?: string
  sort_key?: string
  file_id?: number
  pdf_url?: string | null
  types?: WPDocumentTerm[]
  secteurs?: WPDocumentTerm[]
  categories?: number[]
  class_list?: string[]
  excerpt?: { rendered: string }
  content?: { rendered: string }
  file_url?: string | null
  download_url?: string | null
  meta?: Record<string, unknown>
  _links?: {
    'wp:attachment'?: Array<{ href: string }>
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string
      mime_type?: string
    }>
    'wp:attachment'?: Array<Array<WPAttachment>>
    'wp:term'?: Array<Array<{ id: number; name?: string; slug?: string }>>
  }
}

export interface WPDocumentTerm {
  id: number
  name: string
  slug: string
  count?: number
}

export interface WPDocumentCatalog {
  types: WPDocumentTerm[]
  secteurs: WPDocumentTerm[]
}

export interface WPDocumentPage {
  documents: WPDocument[]
  total: number
  totalPages: number
}

export interface WPDocumentFilters {
  page?: number
  perPage?: number
  categories?: string[]
  sector?: string
  search?: string
  number?: string
  sort?: 'ASC' | 'DESC'
}

interface CRSEDocumentRecord {
  id: number
  title: string
  number?: string
  date: string
  sort_key?: string
  file_id?: number
  pdf_url?: string | null
  types?: WPDocumentTerm[]
  secteurs?: WPDocumentTerm[]
  permalink?: string
}

interface WPAttachment {
  mime_type?: string
  source_url?: string
  title?: { rendered?: string }
}

export interface WPAgendaItem {
  id: number
  date: string
  slug: string
  link: string
  title: { rendered: string }
  excerpt?: { rendered: string }
  content?: { rendered: string }
  meta?: {
    crse_event_start_date?: string
    crse_event_end_date?: string
    crse_event_location?: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string
      alt_text?: string
      media_details?: {
        sizes?: {
          large?: { source_url?: string }
          full?: { source_url?: string }
        }
      }
    }>
  }
}

export type DocumentCategoryId = 'textes' | 'decisions' | 'avis' | 'grilles' | 'hydrocarbures' | 'bulletins' | 'consultations' | 'rapports' | 'autres'
export type SectorId = 'electricite' | 'hydrocarbures' | 'gaz'

export interface WPPostsResult {
  posts: WPPost[]
  totalPages: number
  total: number
  loading: boolean
  error: string | null
}

/** Strip HTML tags and decode entities for plain text */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;|&#8230;/g, '…')
    .replace(/&ndash;|&#8211;/g, '–')
    .replace(/&mdash;|&#8212;/g, '—')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .trim()
}

/** Get the best available image URL from a WP post */
export function getPostImage(post: WPPost): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  if (!media) return ''
  const sizes = media.media_details?.sizes
  return (
    sizes?.medium_large?.source_url ||
    sizes?.full?.source_url ||
    media.source_url ||
    ''
  )
}

/** Get categories from embedded terms */
export function getPostCategories(post: WPPost): Array<{ id: number; name: string; slug: string }> {
  const terms = post._embedded?.['wp:term']?.[0] ?? []
  return terms.filter((t) => t.name !== 'Uncategorized')
}

/** Format a WP ISO date string → "09 Février 2025" */
export function formatWPDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/** Color/style mapping for known categories */
export const CATEGORY_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  electricite:         { color: 'text-chathams-blue', bg: 'bg-blue-50', border: 'border-chathams-blue' },
  hydrocarbures:       { color: 'text-[#da6830]',    bg: 'bg-orange-50', border: 'border-[#da6830]' },
  gaz:                 { color: 'text-[#e38d19]',    bg: 'bg-amber-50',  border: 'border-[#e38d19]' },
  consommateurs:       { color: 'text-shakespeare',   bg: 'bg-sky-50',    border: 'border-shakespeare' },
  crse:                { color: 'text-[#1b3e80]',    bg: 'bg-indigo-50', border: 'border-[#1b3e80]' },
  energie:             { color: 'text-green-700',     bg: 'bg-green-50',  border: 'border-green-600' },
  evenements:          { color: 'text-purple-700',    bg: 'bg-purple-50', border: 'border-purple-600' },
  'communiques-de-presse': { color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-400' },
  'avis-et-decisions': { color: 'text-chathams-blue', bg: 'bg-blue-50',  border: 'border-chathams-blue' },
}

export function getCategoryStyle(slug: string) {
  return CATEGORY_STYLES[slug] ?? { color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-300' }
}

export function getWPDocumentCategory(item: WPDocument): DocumentCategoryId {
  const typeSlugs = item.types?.map((type) => type.slug.toLocaleLowerCase('fr')) ?? []
  if (typeSlugs.includes('avis')) return 'avis'
  if (typeSlugs.includes('decisions')) return 'decisions'
  if (typeSlugs.some((slug) => ['lois', 'decrets', 'arretes', 'reglements-dapplication-et-reglements'].includes(slug))) return 'textes'
  if (typeSlugs.includes('grilles-tarifaires')) return 'grilles'
  if (typeSlugs.includes('structures-des-prix-des-hydrocarbures')) return 'hydrocarbures'
  if (typeSlugs.includes('bulletins-officiels')) return 'bulletins'
  if (typeSlugs.includes('documents-de-consultation-publique')) return 'consultations'
  if (typeSlugs.includes('rapports')) return 'rapports'

  const searchable = `${item.slug} ${item.title.rendered} ${item.class_list?.join(' ') ?? ''} ${item.content?.rendered ?? ''}`.toLocaleLowerCase('fr')
  if (/\bavis\b/.test(searchable) || searchable.includes('crse_document_cat-avis')) return 'avis'
  if (searchable.includes('decision') || searchable.includes('délibération') || searchable.includes('crse_document_cat-decisions')) return 'decisions'
  if (searchable.includes('grille') || searchable.includes('tarif')) return 'grilles'
  if (searchable.includes('hydrocarbure') || searchable.includes('structure-des-prix')) return 'hydrocarbures'
  if (searchable.includes('bulletin')) return 'bulletins'
  if (searchable.includes('consultation')) return 'consultations'
  if (searchable.includes('rapport') || searchable.includes('étude') || searchable.includes('etude')) return 'rapports'
  if (/\bloi\b|\bdécret\b|\bdecret\b|\barrêté\b|\barrete\b|code gazier|code de l’électricité/.test(searchable)) return 'textes'
  if (item.type === 'crse_document') return 'decisions'
  return 'autres'
}

export function getWPDocumentSector(item: WPDocument): SectorId | null {
  const sectorSlugs = item.secteurs?.map((sector) => sector.slug.toLocaleLowerCase('fr')) ?? []
  if (sectorSlugs.includes('electricite')) return 'electricite'
  if (sectorSlugs.includes('hydrocarbures')) return 'hydrocarbures'
  if (sectorSlugs.includes('intermediaire-aval-gazier') || sectorSlugs.includes('gaz')) return 'gaz'

  const classList = item.class_list?.join(' ').toLocaleLowerCase('fr') ?? ''
  const searchable = `${classList} ${item.title.rendered} ${item.excerpt?.rendered ?? ''} ${item.content?.rendered ?? ''} ${(item._embedded?.['wp:term'] ?? []).flat().map((term) => `${term.name ?? ''} ${term.slug ?? ''}`).join(' ')}`.toLocaleLowerCase('fr')
  if (classList.includes('crse_secteur-electricite') || searchable.includes('électricité') || searchable.includes('electricite')) return 'electricite'
  if (classList.includes('crse_secteur-hydrocarbures') || searchable.includes('hydrocarbure') || searchable.includes('pétrolier') || searchable.includes('petrolier')) return 'hydrocarbures'
  if (classList.includes('crse_secteur-gaz') || searchable.includes('gazier') || searchable.includes('gaz naturel') || searchable.includes('gaziers')) return 'gaz'
  return null
}

function normalizeCRSEDocument(record: CRSEDocumentRecord): WPDocument {
  const title = record.title ?? ''
  const pdfUrl = record.pdf_url ?? null
  const types = record.types ?? []
  const secteurs = record.secteurs ?? []

  return {
    id: record.id,
    date: record.date,
    slug: String(record.id),
    type: 'crse_document',
    title: { rendered: title },
    link: record.permalink ?? '',
    number: record.number ?? '',
    sort_key: record.sort_key,
    file_id: record.file_id,
    pdf_url: pdfUrl,
    file_url: pdfUrl,
    download_url: pdfUrl,
    types,
    secteurs,
    class_list: [
      ...types.map((type) => `crse_document_cat-${type.slug}`),
      ...secteurs.map((sector) => `crse_secteur-${sector.slug}`),
    ],
    excerpt: { rendered: '' },
    content: { rendered: '' },
    _embedded: {
      'wp:term': [types, secteurs],
    },
  }
}

export async function fetchWPDocumentCatalog(): Promise<WPDocumentCatalog> {
  const response = await fetch(`${CRSE_API_BASE}/categories`)
  if (!response.ok) throw new Error(`Impossible de charger les catégories de documents CRSE (HTTP ${response.status})`)
  const catalog = await response.json() as WPDocumentCatalog
  if (!Array.isArray(catalog.types) || !Array.isArray(catalog.secteurs)) {
    throw new Error('La réponse des catégories CRSE est invalide.')
  }
  return catalog
}

export async function fetchWPDocumentPage(filters: WPDocumentFilters = {}): Promise<WPDocumentPage> {
  const {
    page = 1,
    perPage = 10,
    categories = [],
    sector = '',
    search = '',
    number = '',
    sort = 'DESC',
  } = filters
  const fetchCategoryPage = async (category: string | undefined, requestPage: number, requestPerPage: number) => {
    const params = new URLSearchParams({
      page: String(requestPage),
      per_page: String(requestPerPage),
      sort,
    })
    if (category) params.set('cat', category)
    if (sector) params.set('sec', sector)
    if (search.trim()) params.set('search', search.trim())
    if (number.trim()) params.set('num', number.trim())

    const response = await fetch(`${CRSE_API_BASE}/documents?${params.toString()}`)
    if (!response.ok) throw new Error(`Impossible de charger les documents CRSE (HTTP ${response.status}).`)
    const records = await response.json() as CRSEDocumentRecord[]
    if (!Array.isArray(records)) throw new Error('La réponse des documents CRSE est invalide.')
    return {
      documents: records.map(normalizeCRSEDocument),
      total: Number(response.headers.get('X-WP-Total') ?? records.length),
      totalPages: Number(response.headers.get('X-WP-TotalPages') ?? 1),
    }
  }

  if (categories.length <= 1) return fetchCategoryPage(categories[0], page, perPage)

  const categoryResults = await Promise.all(categories.map(async (category) => {
    const firstPage = await fetchCategoryPage(category, 1, 50)
    if (firstPage.totalPages <= 1) return firstPage
    const pages = await Promise.all(Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
      fetchCategoryPage(category, index + 2, 50)
    ))
    return {
      documents: [firstPage, ...pages].flatMap((result) => result.documents),
      total: firstPage.total,
      totalPages: firstPage.totalPages,
    }
  }))

  const uniqueDocuments = [...new Map(categoryResults.flatMap((result) => result.documents)
    .map((document) => [document.id, document])).values()]
  uniqueDocuments.sort((left, right) => {
    const direction = sort === 'ASC' ? 1 : -1
    return direction * (left.sort_key ?? left.date).localeCompare(right.sort_key ?? right.date)
  })
  const start = (page - 1) * perPage
  return {
    documents: uniqueDocuments.slice(start, start + perPage),
    total: uniqueDocuments.length,
    totalPages: Math.max(1, Math.ceil(uniqueDocuments.length / perPage)),
  }
}

export async function fetchWPDocuments(): Promise<WPDocument[]> {
  const firstPage = await fetchWPDocumentPage({ page: 1, perPage: 50 })
  if (firstPage.totalPages <= 1) return firstPage.documents

  const pages = await Promise.all(Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
    fetchWPDocumentPage({ page: index + 2, perPage: 50 })
  ))
  return [firstPage, ...pages].flatMap((result) => result.documents)
}

function isPdfAttachment(attachment: WPAttachment): attachment is WPAttachment & { source_url: string } {
  return Boolean(
    attachment.source_url &&
    (attachment.mime_type === 'application/pdf' || /\.pdf(?:$|[?#])/i.test(attachment.source_url))
  )
}

function getPdfLink(html: string | undefined): string | null {
  if (!html) return null
  const link = html.match(/href=["']([^"']+\.pdf(?:\?[^"']*)?)["']/i)?.[1]
  return link ? new URL(link.replace(/&amp;/g, '&'), 'https://www.crse.sn').toString() : null
}

/** Resolve the actual PDF attachment for a WordPress document, if one is published. */
export async function fetchWPDocumentFile(item: WPDocument): Promise<string | null> {
  if (item.file_url) return item.file_url

  const inlinePdf = getPdfLink(item.content?.rendered) ?? getPdfLink(item.excerpt?.rendered)
  if (inlinePdf) return inlinePdf

  const metadataPdf = Object.values(item.meta ?? {}).find(
    (value): value is string => typeof value === 'string' && /\.pdf(?:$|[?#])/i.test(value)
  )
  if (metadataPdf) {
    const url = new URL(metadataPdf, 'https://www.crse.sn')
    if (url.protocol === 'https:') return url.toString()
  }

  const embeddedPdf = item._embedded?.['wp:attachment']?.flat().find(isPdfAttachment)
    ?? item._embedded?.['wp:featuredmedia']?.find(isPdfAttachment)
  if (embeddedPdf) return embeddedPdf.source_url

  const attachmentCollection = item._links?.['wp:attachment']?.[0]?.href
  if (attachmentCollection) {
    const response = await fetch(attachmentCollection)
    if (!response.ok) throw new Error(`Impossible de récupérer les pièces jointes (HTTP ${response.status})`)
    const attachments = await response.json() as WPAttachment[]
    const pdf = attachments.find(isPdfAttachment)
    if (pdf) return pdf.source_url
  }

  return null
}

export async function fetchWPAgenda(): Promise<WPAgendaItem[]> {
  const firstResponse = await fetch(`${WP_BASE}/crse_agenda?per_page=100&page=1&orderby=date&order=desc`)
  if (!firstResponse.ok) throw new Error(`Impossible de charger l’agenda CRSE (HTTP ${firstResponse.status})`)

  const totalPages = Number(firstResponse.headers.get('X-WP-TotalPages') ?? 1)
  const firstPage = await firstResponse.json() as WPAgendaItem[]
  if (totalPages <= 1) return firstPage

  const remainingPages = await Promise.all(Array.from({ length: totalPages - 1 }, async (_, index) => {
    const response = await fetch(`${WP_BASE}/crse_agenda?per_page=100&page=${index + 2}&orderby=date&order=desc`)
    if (!response.ok) throw new Error(`Impossible de charger la page ${index + 2} de l’agenda CRSE (HTTP ${response.status})`)
    return response.json() as Promise<WPAgendaItem[]>
  }))

  return [firstPage, ...remainingPages].flat()
}

export async function fetchWPAgendaEvent(slug: string): Promise<WPAgendaItem | null> {
  const response = await fetch(`${WP_BASE}/crse_agenda?slug=${encodeURIComponent(slug)}&_embed=1&per_page=1`)
  if (!response.ok) throw new Error(`Impossible de charger cet événement (HTTP ${response.status})`)
  const events = await response.json() as WPAgendaItem[]
  return events[0] ?? null
}

/** Build the WP REST API URL for posts with given params */
export function buildPostsUrl(params: {
  page?: number
  perPage?: number
  categories?: number[]
  search?: string
  orderby?: string
  order?: string
}): string {
  const { page = 1, perPage = 12, categories = [], search = '', orderby = 'date', order = 'desc' } = params
  const url = new URL(`${WP_BASE}/posts`)
  url.searchParams.set('per_page', String(perPage))
  url.searchParams.set('page', String(page))
  url.searchParams.set('orderby', orderby)
  url.searchParams.set('order', order)
  url.searchParams.set('_embed', '1')
  if (categories.length > 0) {
    url.searchParams.set('categories', categories.join(','))
  }
  if (search.trim()) {
    url.searchParams.set('search', search.trim())
  }
  return url.toString()
}

/** Fetch categories from WP API */
export async function fetchCategories(): Promise<WPCategory[]> {
  const res = await fetch(`${WP_BASE}/categories?per_page=50&hide_empty=true`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  const data: WPCategory[] = await res.json()
  return data.filter((c) => c.slug !== 'uncategorized' && c.count > 0)
}
