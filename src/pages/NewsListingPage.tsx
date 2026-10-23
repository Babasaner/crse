import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Tag, ArrowRight, Filter, ChevronRight, LoaderCircle } from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useWPCategories, useWPPosts } from '../hooks/useWordPress'
import { formatWPDate, getPostCategories, getPostImage, stripHtml } from '../lib/wordpress'

const knownCategoryLabels: Record<number, string> = {
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

const categoryColors: Record<number, string> = {
  27: 'text-[#e38d19]',
  28: 'text-[#da6830]',
  75: 'text-chathams-blue',
  76: 'text-shakespeare',
  79: 'text-green-700',
  90: 'text-[#da6830]',
  16: 'text-slate-700',
  17: 'text-chathams-blue',
  26: 'text-chathams-blue',
}

export function NewsListingPage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [search, setSearch] = useState('')
  const [selectedYear, setSelectedYear] = useState('all')
  const { posts, loading, error } = useWPPosts({ perPage: 100 })
  const { categories } = useWPCategories()

  const categoryOptions = categories.map((category) => ({
    id: category.id,
    label: knownCategoryLabels[category.id] ?? category.name,
  }))
  const latestPost = posts[0]
  const visiblePosts = posts.filter((post) => post.id !== latestPost?.id).filter((post) => {
    const postCategories = getPostCategories(post)
    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.some((categoryId) => post.categories.includes(categoryId))
    const matchesYear = selectedYear === 'all' || new Date(post.date).getFullYear().toString() === selectedYear
    const q = search.toLocaleLowerCase('fr').trim()
    const searchable = [post.title.rendered, post.excerpt.rendered, ...postCategories.map((category) => category.name)]
      .map(stripHtml)
      .join(' ')
      .toLocaleLowerCase('fr')

    return matchesCategory && matchesYear && (!q || searchable.includes(q))
  })
  const years = [...new Set(posts.map((post) => new Date(post.date).getFullYear().toString()))]
    .sort((left, right) => right.localeCompare(left))

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((selected) => selected.includes(categoryId)
      ? selected.filter((id) => id !== categoryId)
      : [...selected, categoryId])
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedYear('all')
    setSearch('')
  }

  const renderPostCard = (post: typeof posts[number]) => {
    const postCategories = getPostCategories(post)
    const image = getPostImage(post)
    const summary = stripHtml(post.excerpt.rendered) || stripHtml(post.content.rendered).slice(0, 240)

    return (
      <Card key={post.id} className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <Link to={`/actualites/${post.slug}`} className="block aspect-[16/9] overflow-hidden bg-slate-100" aria-label={`Lire ${stripHtml(post.title.rendered)}`}>
          {image ? <img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /> : (
            <div className="flex h-full items-center justify-center bg-chathams-blue text-3xl font-bold text-white">CRSE</div>
          )}
        </Link>
        <CardContent className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[12px]">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {postCategories.map((category) => (
                <span key={category.id} className={`font-bold uppercase tracking-wider ${categoryColors[category.id] ?? 'text-chathams-blue'}`}>
                  {knownCategoryLabels[category.id] ?? category.name}
                </span>
              ))}
            </div>
            <time dateTime={post.date} className="flex items-center gap-1 text-slate-400">
              <Calendar size={13} />
              {formatWPDate(post.date)}
            </time>
          </div>
          <h2 className="mb-2.5 text-[17px] font-bold leading-snug text-chathams-blue">
            <Link to={`/actualites/${post.slug}`} className="hover:text-shakespeare transition-colors">
              {stripHtml(post.title.rendered)}
            </Link>
          </h2>
          <p className="mb-4 line-clamp-3 text-[14px] leading-relaxed text-slate-600">{summary}</p>
          <div className="mt-auto flex items-center justify-end border-t border-slate-100 pt-3 text-[13px]">
            <Link to={`/actualites/${post.slug}`} className="inline-flex items-center gap-1 font-semibold text-chathams-blue hover:text-shakespeare">
              <span>Lire l’article</span><ArrowRight size={14} />
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <PageBanner
        eyebrow="Espace Presse & Médias"
        title="Actualités de la CRSE"
        description="Retrouvez l’ensemble des communiqués officiels, reportages de terrain, avis d’experts et avancées de la régulation de l’énergie au Sénégal."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12">
        {latestPost && (
          <section className="mb-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm" aria-labelledby="latest-news-title">
            <div className="grid md:grid-cols-[1.1fr_1fr]">
              <Link to={`/actualites/${latestPost.slug}`} className="block aspect-[16/9] bg-slate-100 md:aspect-auto md:min-h-[320px]">
                {getPostImage(latestPost) ? (
                  <img src={getPostImage(latestPost)} alt="" className="h-full w-full object-cover" />
                ) : <div className="flex h-full min-h-[240px] items-center justify-center bg-chathams-blue text-4xl font-bold text-white">CRSE</div>}
              </Link>
              <div className="flex flex-col justify-center p-6 md:p-9">
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
                  <span className="font-bold uppercase tracking-wider text-shakespeare">À la une</span>
                  {getPostCategories(latestPost).map((category) => (
                    <span key={category.id} className={`font-semibold ${categoryColors[category.id] ?? 'text-chathams-blue'}`}>
                      {knownCategoryLabels[category.id] ?? category.name}
                    </span>
                  ))}
                  <time dateTime={latestPost.date} className="flex items-center gap-1.5 text-slate-500"><Calendar size={14} />{formatWPDate(latestPost.date)}</time>
                </div>
                <h2 id="latest-news-title" className="text-2xl font-bold leading-tight text-chathams-blue md:text-[30px]">
                  <Link to={`/actualites/${latestPost.slug}`} className="hover:text-shakespeare">{stripHtml(latestPost.title.rendered)}</Link>
                </h2>
                <p className="mt-4 line-clamp-4 text-[15px] leading-relaxed text-slate-600">
                  {stripHtml(latestPost.excerpt.rendered) || stripHtml(latestPost.content.rendered).slice(0, 300)}
                </p>
                <Link to={`/actualites/${latestPost.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-chathams-blue hover:text-shakespeare">
                  Lire l’actualité <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="sticky top-28 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Filter className="text-chathams-blue" size={18} />
              <h2 className="text-[17px] font-bold text-chathams-blue">Filtres de recherche</h2>
            </div>
            <div className="mb-6">
              <label htmlFor="news-search" className="mb-2 block text-[13px] font-semibold text-slate-700">Rechercher un article</label>
              <div className="relative">
                <input id="news-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Mots-clés..." className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-[14px] text-slate-800 placeholder-slate-400 focus:border-chathams-blue focus:outline-none" />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <fieldset className="mb-6">
              <legend className="mb-2.5 text-[13px] font-semibold uppercase tracking-wider text-slate-700">Catégories</legend>
              <div className="flex flex-col gap-1.5">
                {categoryOptions.map((category) => (
                  <label key={category.id} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] text-slate-600 hover:bg-slate-50">
                    <input type="checkbox" checked={selectedCategories.includes(category.id)} onChange={() => toggleCategory(category.id)} className="h-4 w-4 accent-[#1b3e80]" />
                    <span>{knownCategoryLabels[category.id] ?? category.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="mb-5 border-t border-slate-100 pt-4">
              <label htmlFor="news-year" className="mb-2.5 block text-[13px] font-semibold uppercase tracking-wider text-slate-700">Année de publication</label>
              <select id="news-year" value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[14px] text-slate-700">
                <option value="all">Toutes les années</option>
                {years.map((year) => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            {(selectedCategories.length > 0 || selectedYear !== 'all' || search) && (
              <button type="button" onClick={resetFilters} className="w-full pt-2 text-center text-[13px] font-semibold text-shakespeare hover:underline">Réinitialiser les filtres</button>
            )}
          </aside>

          <section aria-label="Liste des actualités">
            <div className="mb-6 flex items-center justify-between text-[14px] text-slate-500">
              <span><strong>{visiblePosts.length}</strong> autre{visiblePosts.length === 1 ? '' : 's'} actualité{visiblePosts.length === 1 ? '' : 's'}</span>
            </div>
            {loading ? (
              <div className="flex items-center justify-center gap-3 py-16 text-slate-500"><LoaderCircle size={20} className="animate-spin" /> Chargement des actualités…</div>
            ) : error ? (
              <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-[14px] text-amber-900">
                Les actualités ne sont pas disponibles pour le moment. Vérifiez votre connexion puis réessayez.
              </div>
            ) : visiblePosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{visiblePosts.map(renderPostCard)}</div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                <Tag className="mx-auto mb-3 h-12 w-12 text-slate-400" />
                <h3 className="text-[18px] font-bold text-slate-700">Aucun article trouvé</h3>
                <p className="mt-1 text-[14px] text-slate-500">Aucune actualité ne correspond à cette combinaison de filtres.</p>
                <Button type="button" variant="outline" onClick={resetFilters} className="mt-4 rounded-full">
                  <ChevronRight size={15} className="mr-1" />Afficher toutes les actualités
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}