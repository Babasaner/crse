import { useState, useEffect } from 'react'
import {
  buildPostsUrl,
  fetchCategories,
  fetchWPAgenda,
  fetchWPAgendaEvent,
  fetchWPDocumentCatalog,
  fetchWPDocumentPage,
} from '../lib/wordpress'
import type {
  WPAgendaItem,
  WPDocument,
  WPDocumentCatalog,
  WPDocumentFilters,
  WPPost,
  WPCategory,
} from '../lib/wordpress'
import { fetchWPDocuments } from '../lib/wordpress'

interface UseWPPostsOptions {
  page?: number
  perPage?: number
  categories?: number[]
  search?: string
}

interface UseWPPostsResult {
  posts: WPPost[]
  totalPages: number
  total: number
  loading: boolean
  error: string | null
}

/** Hook: fetch a list of WP posts */
export function useWPPosts(options: UseWPPostsOptions): UseWPPostsResult {
  const { page = 1, perPage = 12, categories = [], search = '' } = options
  const [posts, setPosts] = useState<WPPost[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const url = buildPostsUrl({ page, perPage, categories, search })

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const tp = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10)
        const t = parseInt(res.headers.get('X-WP-Total') ?? '0', 10)
        setTotalPages(tp)
        setTotal(t)
        return res.json() as Promise<WPPost[]>
      })
      .then((data) => {
        if (!cancelled) setPosts(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? 'Erreur de chargement')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [url])

  return { posts, totalPages, total, loading, error }
}

/** Hook: fetch a single WP post by slug */
export function useWPPost(slug: string): {
  post: WPPost | null
  loading: boolean
  error: string | null
} {
  const [post, setPost] = useState<WPPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(
      `https://www.crse.sn/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1&per_page=1`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<WPPost[]>
      })
      .then((data) => {
        if (!cancelled) setPost(data[0] ?? null)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? 'Erreur')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [slug])

  return { post, loading, error }
}

/** Hook: fetch WP categories */
export function useWPCategories(): {
  categories: WPCategory[]
  loading: boolean
} {
  const [categories, setCategories] = useState<WPCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchCategories()
      .then((data) => { if (!cancelled) setCategories(data) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { categories, loading }
}

export function useWPDocuments(): {
  documents: WPDocument[]
  loading: boolean
  error: string | null
} {
  const [documents, setDocuments] = useState<WPDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchWPDocuments()
      .then((data) => { if (!cancelled) setDocuments(data) })
      .catch((err) => { if (!cancelled) setError(err.message ?? 'Erreur de chargement') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { documents, loading, error }
}

export function useWPDocumentCatalog(): {
  catalog: WPDocumentCatalog | null
  loading: boolean
  error: string | null
} {
  const [catalog, setCatalog] = useState<WPDocumentCatalog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchWPDocumentCatalog()
      .then((data) => { if (!cancelled) setCatalog(data) })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erreur de chargement des catégories')
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { catalog, loading, error }
}

export function useWPDocumentPage(filters: WPDocumentFilters): {
  documents: WPDocument[]
  total: number
  totalPages: number
  loading: boolean
  error: string | null
} {
  const filtersKey = JSON.stringify(filters)
  const [result, setResult] = useState<{
    key: string
    documents: WPDocument[]
    total: number
    totalPages: number
    error: string | null
  } | null>(null)

  useEffect(() => {
    let cancelled = false
    const requestFilters = JSON.parse(filtersKey) as WPDocumentFilters
    fetchWPDocumentPage(requestFilters)
      .then((data) => {
        if (!cancelled) setResult({ key: filtersKey, ...data, error: null })
      })
      .catch((err: unknown) => {
        if (!cancelled) setResult({
          key: filtersKey,
          documents: [],
          total: 0,
          totalPages: 1,
          error: err instanceof Error ? err.message : 'Erreur de chargement des documents',
        })
      })
    return () => { cancelled = true }
  }, [filtersKey])

  if (result?.key !== filtersKey) {
    return { documents: [], total: 0, totalPages: 1, loading: true, error: null }
  }

  return {
    documents: result.documents,
    total: result.total,
    totalPages: result.totalPages,
    loading: false,
    error: result.error,
  }
}

export function useWPAgenda(): {
  events: WPAgendaItem[]
  loading: boolean
  error: string | null
} {
  const [events, setEvents] = useState<WPAgendaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchWPAgenda()
      .then((data) => { if (!cancelled) setEvents(data) })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erreur de chargement de l’agenda')
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { events, loading, error }
}

export function useWPAgendaEvent(slug: string): {
  event: WPAgendaItem | null
  loading: boolean
  error: string | null
} {
  const [result, setResult] = useState<{
    slug: string
    event: WPAgendaItem | null
    error: string | null
  } | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchWPAgendaEvent(slug)
      .then((item) => { if (!cancelled) setResult({ slug, event: item, error: null }) })
      .catch((err: unknown) => {
        if (!cancelled) setResult({
          slug,
          event: null,
          error: err instanceof Error ? err.message : 'Erreur de chargement de l’événement',
        })
      })
    return () => { cancelled = true }
  }, [slug])

  if (result?.slug !== slug) return { event: null, loading: true, error: null }
  return { event: result.event, loading: false, error: result.error }
}
