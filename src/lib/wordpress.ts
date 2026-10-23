/**
 * WordPress REST API Hook — Actualités CRSE
 * Fetches live posts from https://www.crse.sn/wp-json/wp/v2/posts
 * with embedded media and terms for images and categories.
 */

const WP_BASE = 'https://www.crse.sn/wp-json/wp/v2'

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
  categories?: number[]
  class_list?: string[]
  excerpt?: { rendered: string }
  content?: { rendered: string }
  _embedded?: {
    'wp:term'?: Array<Array<{ id: number; name?: string; slug?: string }>>
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
  const classList = item.class_list?.join(' ').toLocaleLowerCase('fr') ?? ''
  const searchable = `${classList} ${item.title.rendered} ${item.excerpt?.rendered ?? ''} ${item.content?.rendered ?? ''} ${(item._embedded?.['wp:term'] ?? []).flat().map((term) => `${term.name ?? ''} ${term.slug ?? ''}`).join(' ')}`.toLocaleLowerCase('fr')
  if (classList.includes('crse_secteur-electricite') || searchable.includes('électricité') || searchable.includes('electricite')) return 'electricite'
  if (classList.includes('crse_secteur-hydrocarbures') || searchable.includes('hydrocarbure') || searchable.includes('pétrolier') || searchable.includes('petrolier')) return 'hydrocarbures'
  if (classList.includes('crse_secteur-gaz') || searchable.includes('gazier') || searchable.includes('gaz naturel') || searchable.includes('gaziers')) return 'gaz'
  return null
}

export async function fetchWPDocuments(): Promise<WPDocument[]> {
  const fetchCollection = async (type: 'document' | 'crse_document') => {
    const firstResponse = await fetch(`${WP_BASE}/${type}?per_page=100&page=1&_embed=1&orderby=date&order=desc`)
    if (!firstResponse.ok) return []

    const totalPages = Number(firstResponse.headers.get('X-WP-TotalPages') ?? 1)
    const firstPage = await firstResponse.json() as WPDocument[]
    if (totalPages <= 1) return firstPage

    const remainingPages = await Promise.all(Array.from({ length: totalPages - 1 }, (_, index) =>
      fetch(`${WP_BASE}/${type}?per_page=100&page=${index + 2}&_embed=1&orderby=date&order=desc`)
        .then((response) => response.ok ? response.json() as Promise<WPDocument[]> : [])
    ))
    return [firstPage, ...remainingPages].flat()
  }

  const [documents, decisions] = await Promise.all([
    fetchCollection('document'),
    fetchCollection('crse_document'),
  ])
  if (documents.length === 0 && decisions.length === 0) throw new Error('Impossible de charger les documents WordPress')

  return [...documents, ...decisions].sort((left, right) => Date.parse(right.date) - Date.parse(left.date))
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
