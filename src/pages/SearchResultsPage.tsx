import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { pages } from '../data/pages'
import { useWPPosts } from '../hooks/useWordPress'
import { getPostCategories, stripHtml } from '../lib/wordpress'

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const { posts } = useWPPosts({ perPage: 100 })
  const normalizedQuery = (searchParams.get('q') ?? '').trim().toLocaleLowerCase('fr')

  const pageResults = normalizedQuery
    ? pages
        .filter((page) =>
          `${page.title} ${page.description} ${page.body}`
            .toLocaleLowerCase('fr')
            .includes(normalizedQuery)
        )
        .map((p) => ({
          title: p.title,
          desc: p.description,
          to: p.path,
          badge: 'Page',
        }))
    : []

  const newsResults = normalizedQuery
    ? posts
        .filter((news) =>
          `${stripHtml(news.title.rendered)} ${getPostCategories(news).map((category) => category.name).join(' ')}`
            .toLocaleLowerCase('fr')
            .includes(normalizedQuery)
        )
        .map((news) => ({
          title: stripHtml(news.title.rendered),
          desc: `${news.date.slice(0, 10)} — Catégorie : ${getPostCategories(news).map((category) => category.name).join(', ')}`,
          to: `/actualites/${news.slug}`,
          badge: 'Actualité',
        }))
    : []

  const results = [...pageResults, ...newsResults]

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearchParams(query.trim() ? { q: query.trim() } : {})
  }

  return (
    <>
      <PageBanner
        eyebrow="Explorer le site"
        title="Recherche"
        description="Retrouvez toutes les informations, documents et actualités publiés par la CRSE."
      />
      <section className="wrap search-page mx-auto max-w-[1200px] px-6 py-12">
        <form className="search-form max-w-[800px]" onSubmit={handleSubmit}>
          <label htmlFor="site-search" className="mb-3 block text-[16px] font-bold text-chathams-blue">
            Que recherchez-vous ?
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                id="site-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex. tarifs, décision, électricité, gaz, consommateurs..."
                className="h-[52px] w-full rounded-md border border-[#d4dee7] bg-white pl-11 pr-4 text-[16px] text-[#243b53] focus:border-[#55aed0] focus:outline-none"
              />
              <Search
                size={19}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray"
                aria-hidden="true"
              />
            </div>
            <button
              className="flex h-[52px] items-center gap-2 rounded-md bg-chathams-blue px-6 font-medium text-white transition-colors hover:bg-chathams-blue/90"
              type="submit"
            >
              Rechercher
            </button>
          </div>
        </form>

        {normalizedQuery && (
          <div className="search-results mt-10 max-w-[900px]">
            <h2 className="text-[22px] font-semibold text-chathams-blue">
              {results.length} résultat{results.length === 1 ? '' : 's'} pour « {searchParams.get('q')} »
            </h2>
            {results.length ? (
              <div className="mt-6 flex flex-col divide-y divide-[#dce4eb]">
                {results.map((item) => (
                  <article key={item.to} className="py-5">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="rounded bg-[#eef3f8] px-2 py-0.5 text-[11px] font-bold text-chathams-blue uppercase">
                        {item.badge}
                      </span>
                    </div>
                    <Link
                      to={item.to}
                      className="inline-flex items-center gap-2 text-[18px] font-semibold text-chathams-blue hover:text-[#55aed0]"
                    >
                      {item.title}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#536476]">{item.desc}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-[16px] text-[#536476]">
                Aucun résultat pour cette recherche. Essayez avec d'autres termes comme « hydrocarbures », « tarifs » ou « réclamation ».
              </p>
            )}
          </div>
        )}
      </section>
    </>
  )
}