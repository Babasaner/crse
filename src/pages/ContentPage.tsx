import { useState } from 'react'
import { ArrowRight, ChevronRight, FileText, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageBanner } from '../components/shared/PageBanner'
import { NewsHighlightsSection } from './Accueil/sections/NewsHighlightsSection/NewsHighlightsSection'
import { NewsHeaderSection } from './Accueil/sections/NewsHeaderSection/NewsHeaderSection'
import { siteNavigation } from '../data/siteNavigation'
import type { PageInfo } from '../types/page'

export function ContentPage({ page }: { page: PageInfo }) {
  const [documentQuery, setDocumentQuery] = useState('')
  const isNewsPage = page.path === '/actualites'
  const isDocumentsPage = page.path === '/documents'
  const documentItems = siteNavigation.find((menu) => menu.label === 'Textes et documents')?.groups.flatMap((group) => group.items) ?? []
  const filteredDocuments = documentItems.filter((item) => item.label.toLocaleLowerCase('fr').includes(documentQuery.trim().toLocaleLowerCase('fr')))
  const relatedLinks = siteNavigation
    .flatMap((menu) => menu.groups.flatMap((group) => group.items))
    .filter((item) => item.to.startsWith(page.path === '/documents' ? '/documents/' : `${page.path}/`))

  return (
    <>
      <PageBanner eyebrow={page.eyebrow} title={page.title} description={page.description} />

      {isNewsPage ? <><NewsHeaderSection /><NewsHighlightsSection /></> : null}

      {isDocumentsPage ? (
        <section className="library-page wrap">
          <form className="library-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <Search size={19} aria-hidden="true" />
            <label className="sr-only" htmlFor="library-search">Rechercher un document</label>
            <input id="library-search" type="search" value={documentQuery} onChange={(event) => setDocumentQuery(event.target.value)} placeholder="Rechercher par titre, thème ou référence" />
            <button type="submit" onClick={(event) => event.preventDefault()}>Rechercher</button>
          </form>
          <p className="library-count">{filteredDocuments.length} catégorie{filteredDocuments.length === 1 ? '' : 's'} de documents</p>
          <div className="library-grid">
            {filteredDocuments.map((item) => (
              <Link className="library-item" to={item.to} key={item.to}>
                <span className="library-icon"><FileText size={20} aria-hidden="true" /></span>
                <span className="library-item-copy"><strong>{item.label}</strong><small>Textes officiels et publications de la CRSE</small></span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
          {filteredDocuments.length === 0 && <p className="library-empty">Aucune catégorie ne correspond à cette recherche.</p>}
        </section>
      ) : null}

      {!isNewsPage && !isDocumentsPage ? (
        <section className="content-page wrap">
          <article className="content-main">
            <p className="content-lead">{page.body}</p>
            <p className="content-copy">La CRSE agit dans le respect de son cadre légal et en concertation avec les acteurs concernés. Cette rubrique rassemble les informations de référence, les démarches et les publications utiles pour comprendre le sujet et passer à l’action.</p>
            <Link className="button button-dark" to="/contact">Contacter la CRSE <ArrowRight size={17} aria-hidden="true" /></Link>
          </article>
          <aside className="content-aside">
            <span className="section-number">CRSE / {page.number}</span>
            <h2>Repères<br />et ressources</h2>
            <p>Les contenus officiels sont publiés et actualisés par la Commission.</p>
            {relatedLinks.length > 0 ? <nav className="content-related" aria-label="Dans cette rubrique">{relatedLinks.map((item) => <Link key={item.to} to={item.to}>{item.label}<ArrowRight size={15} aria-hidden="true" /></Link>)}</nav> : <Link className="underlined-link" to="/documents">Consulter les documents <span aria-hidden="true">↗</span></Link>}
          </aside>
        </section>
      ) : null}
    </>
  )
}