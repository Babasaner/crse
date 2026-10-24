import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, CalendarDays, Check, ChevronRight, LoaderCircle, Share2 } from 'lucide-react'
import { useWPPost, useWPPosts } from '../hooks/useWordPress'
import { formatWPDate, getPostCategories, getPostImage, stripHtml } from '../lib/wordpress'
import { Button } from '../components/ui/button'
import { Breadcrumb } from '../components/shared/Breadcrumb'

const categoryLabels: Record<number, string> = {
  27: 'Aval & Intermédiaire gazier',
  28: 'Hydrocarbures',
  75: 'CRSE',
  76: 'Consommateurs',
  79: 'Énergie',
  90: 'Événements',
  16: 'Communiqués de presse',
  17: 'Avis & Décisions',
  26: 'Électricité',
}

export function NewsDetailPage() {
  const { slug = '' } = useParams()
  const { post, loading, error } = useWPPost(slug)
  const { posts } = useWPPosts({ perPage: 100 })
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (!navigator.clipboard) return
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  if (loading) {
    return <main className="flex min-h-[50vh] items-center justify-center gap-3 text-slate-500"><LoaderCircle size={20} className="animate-spin" />Chargement de l’actualité…</main>
  }

  if (error || !post) {
    return (
      <main className="mx-auto max-w-[900px] px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-chathams-blue">Actualité introuvable</h1>
        <p className="mt-3 text-slate-600">Cette publication n’est pas disponible ou a été retirée.</p>
        <Button asChild variant="outline" className="mt-6"><Link to="/actualites"><ArrowLeft size={16} className="mr-2" />Retour aux actualités</Link></Button>
      </main>
    )
  }

  const articleCategories = getPostCategories(post)
  const image = getPostImage(post)
  const relatedPosts = posts
    .filter((item) => item.id !== post.id && item.categories.some((id) => post.categories.includes(id)))
    .slice(0, 3)

  return (
    <article className="min-h-screen bg-white">
      <div className="border-b border-[#e2e8f0] bg-[#f1f6fa] py-4">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Breadcrumb
            items={[
              { label: 'Médias', to: '/medias' },
              { label: 'Actualités', to: '/actualites' },
              { label: stripHtml(post.title.rendered) }
            ]}
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1000px] px-6 py-12">
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {articleCategories.map((category) => (
              <span key={category.id} className="rounded-full bg-chathams-blue/10 px-3.5 py-1 text-[13px] font-bold text-chathams-blue">
                {categoryLabels[category.id] ?? category.name}
              </span>
            ))}
            <time dateTime={post.date} className="flex items-center gap-1.5 text-[13px] text-slate-500"><CalendarDays size={14} />{formatWPDate(post.date)}</time>
          </div>
          <h1 className="text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.2] text-[#1b3e80]">{stripHtml(post.title.rendered)}</h1>
          {post.excerpt.rendered && (
            <div className="prose prose-slate mt-5 max-w-none text-[18px] font-medium leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          )}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-3.5">
            <button type="button" onClick={handleShare} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-slate-50">
              {copied ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
              <span>{copied ? 'Lien copié !' : 'Copier le lien'}</span>
            </button>
            <Link to="/actualites" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-chathams-blue hover:text-shakespeare"><ArrowLeft size={16} />Toutes les actualités</Link>
          </div>
        </header>

        {image && (
          <div className="mb-10 overflow-hidden rounded-xl bg-slate-100">
            <img src={image} alt={stripHtml(post.title.rendered)} className="max-h-[560px] w-full object-cover" />
          </div>
        )}

        <div className="prose prose-slate max-w-none text-[16px] leading-[1.8] text-slate-700" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <Button asChild variant="outline" className="gap-2 rounded-full"><Link to="/actualites"><ArrowLeft size={16} />Retour aux actualités</Link></Button>
          <Button asChild className="gap-2 rounded-full bg-chathams-blue text-white"><Link to="/reclamations">Introduire une réclamation<ChevronRight size={16} /></Link></Button>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-10">
            <h2 className="mb-6 text-2xl font-bold text-chathams-blue">Articles similaires</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <article key={related.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <Link to={`/actualites/${related.slug}`} className="block aspect-[16/10] bg-slate-100">
                    {getPostImage(related) && <img src={getPostImage(related)} alt="" loading="lazy" className="h-full w-full object-cover" />}
                  </Link>
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-chathams-blue"><Link to={`/actualites/${related.slug}`} className="hover:text-shakespeare">{stripHtml(related.title.rendered)}</Link></h3>
                    <time dateTime={related.date} className="mt-3 block text-[12px] text-slate-400">{formatWPDate(related.date)}</time>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}