import { ArrowLeft, CalendarDays } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageBanner } from '../components/shared/PageBanner'

const sectionLabels = { projets: 'Projet', actualites: 'Actualité', documents: 'Document' }

const newsDetails: Record<string, { title: string; category: string; date: string; image: string; body: string }> = {
  'campagne-nationale-tambacounda': {
    title: 'La CRSE à Tambacounda pour dialoguer avec les populations',
    category: 'Événements',
    date: '09 février 2025',
    image: 'https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/19d95f80d80f24c336368b99affcc367b1e538d6-jpg-1.png',
    body: 'La Commission de Régulation du Secteur de l’Énergie a rencontré les populations de Tambacounda dans le cadre d’une campagne d’information et d’écoute. Ces échanges permettent de mieux faire connaître les missions de la CRSE et de recueillir les préoccupations des usagers.',
  },
  'installation-comites-consultatifs': {
    title: 'Installation des comités consultatifs de consommateurs',
    category: 'Consommateurs',
    date: '09 février 2025',
    image: 'https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/3ccf1daccd3ada1a4339b0a6734fb9ce797258f0-jpg-1.png',
    body: 'Les associations de consommateurs mettent en place leurs instances consultatives pour renforcer la participation des usagers au dialogue sur les secteurs régulés.',
  },
  'formation-badge-energie': {
    title: 'La CRSE ouvre la 8e édition de la formation BADGE',
    category: 'Formation',
    date: '09 février 2025',
    image: 'https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/489e5a863e0e2f1d534748fbf22e765aefdc6baf-jpg-1.png',
    body: 'Le Président de la CRSE, M. Ibrahima Niane, a procédé à l’ouverture de la nouvelle édition de la formation BADGE consacrée aux enjeux du secteur de l’énergie.',
  },
  'campagne-nationale-information': {
    title: 'La CRSE renforce le dialogue avec les territoires',
    category: 'Événements',
    date: '09 février 2025',
    image: 'https://c.animaapp.com/Cq4P7PgEpKkTCbopMcj5Xg/img/19d95f80d80f24c336368b99affcc367b1e538d6-jpg-2.png',
    body: 'La Commission poursuit ses actions d’information et de concertation avec les acteurs et les populations des régions.',
  },
}

export function DetailPage({ section }: { section: keyof typeof sectionLabels }) {
  const { slug = '' } = useParams()
  const article = section === 'actualites' ? newsDetails[slug] : undefined
  const title = article?.title ?? slug.replaceAll('-', ' ')
  return <><PageBanner eyebrow={article?.category ?? sectionLabels[section]} title={title} description={article?.body ?? `Retrouvez les informations et documents publiés par la CRSE concernant ${title}.`} /><div className="page-breadcrumb wrap"><Link to="/">Accueil</Link><span aria-hidden="true">›</span><Link to={`/${section}`}>{section === 'actualites' ? 'Actualités' : sectionLabels[section]}</Link><span aria-hidden="true">›</span><span>{title}</span></div><article className="article-page wrap">{article?.image && <img className="article-image" src={article.image} alt="" />}<div className="article-body">{article?.date && <p className="article-date"><CalendarDays size={16} aria-hidden="true" /> Publié le {article.date}</p>}<p className="article-lead">{article?.body ?? `Cette page rassemble les informations relatives à « ${title} ». Les contenus détaillés sont publiés par la CRSE au fil de ses travaux.`}</p><p>Pour toute demande complémentaire, contactez la Commission ou consultez les documents de référence liés à cette rubrique.</p><Link className="button button-dark" to={`/${section}`}><ArrowLeft size={16} aria-hidden="true" /> Retour à {section === 'actualites' ? 'toutes les actualités' : 'la rubrique'}</Link></div></article></>
}