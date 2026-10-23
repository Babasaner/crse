import { useState, useEffect } from 'react'
import { buildPostsUrl, fetchCategories } from '../lib/wordpress'
import type { WPPost, WPCategory } from '../lib/wordpress'
import type { WPDocument } from '../lib/wordpress'
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
