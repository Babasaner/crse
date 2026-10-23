import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search,
  FileText,
  FileSpreadsheet,
  BookOpen,
  Gavel,
  Newspaper,
  BarChart3,
  ClipboardList,
  Eye,
  Download,
  X,
  ExternalLink,
  Filter,
  CalendarDays,
  LoaderCircle
} from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'
import { useWPDocuments } from '../hooks/useWordPress'
import { getWPDocumentCategory, getWPDocumentSector, stripHtml } from '../lib/wordpress'
import type { DocumentCategoryId, SectorId } from '../lib/wordpress'

type MainCategory = {
  id: string
  label: string
  icon: React.ElementType
  color: string
  subcategories: { id: string; label: string }[]
}

const mainCategories: MainCategory[] = [
  {
    id: 'all',
    label: 'Tous les documents',
    icon: FileText,
    color: '#1b3e80',
    subcategories: [],
  },
  {
    id: 'textes',
    label: 'Textes législatifs & réglementaires',
    icon: Gavel,
    color: '#1b3e80',
    subcategories: [
      { id: 'lois', label: 'Lois & Codes' },
      { id: 'decrets', label: 'Décrets d’application' },
      { id: 'arretes', label: 'Arrêtés ministériels' },
    ],
  },
  {
    id: 'decisions',
    label: 'Décisions',
    icon: ClipboardList,
    color: '#55aed0',
    subcategories: [],
  },
  {
    id: 'avis',
    label: 'Avis',
    icon: ClipboardList,
    color: '#55aed0',
    subcategories: [],
  },
  {
    id: 'grilles',
    label: 'Grilles tarifaires',
    icon: FileSpreadsheet,
    color: '#e38d19',
    subcategories: [
      { id: 'electricite-bt', label: 'Électricité Basse Tension' },
      { id: 'electricite-mt-ht', label: 'Électricité MT & HT' },
      { id: 'gaz-distribution', label: 'Distribution Gazière' },
    ],
  },
  {
    id: 'hydrocarbures',
    label: 'Structures des prix des hydrocarbures',
    icon: BarChart3,
    color: '#da6830',
    subcategories: [
      { id: 'mensuel-2025', label: 'Année 2025' },
      { id: 'mensuel-2024', label: 'Année 2024' },
      { id: 'baremes', label: 'Barèmes officiels' },
    ],
  },
  {
    id: 'bulletins',
    label: 'Bulletin officiel de la CRSE',
    icon: Newspaper,
    color: '#1b3e80',
    subcategories: [
      { id: 'bo-2024', label: 'Éditions 2024' },
      { id: 'bo-2023', label: 'Éditions 2023' },
    ],
  },
  {
    id: 'consultations',
    label: 'Documents de consultation publique',
    icon: BookOpen,
    color: '#55aed0',
    subcategories: [
      { id: 'en-cours', label: 'En cours' },
      { id: 'archives-consultations', label: 'Clôturées' },
    ],
  },
  {
    id: 'rapports',
    label: 'Rapports et études',
    icon: FileText,
    color: '#1b3e80',
    subcategories: [
      { id: 'rapports-annuels', label: 'Rapports d’activité' },
      { id: 'etudes-sectorielles', label: 'Études sectorielles' },
    ],
  },
]

export type DocItem = {
  id: number
  title: string
  subtitle: string
  category: string
  subcategory: string
  date: string
  fileSize: string
  format: string
  previewText: string
  downloadUrl: string
  sourceUrl?: string
  sector?: SectorId | null
}

export const documentsDatabase: DocItem[] = [
  {
    id: 1,
    title: 'Loi n° 2021-32 du 09 juillet 2021 portant création de la CRSE',
    subtitle: 'Texte de loi fondateur élargissant les compétences de régulation à l’électricité, au gaz et à l’aval des hydrocarbures.',
    category: 'textes',
    subcategory: 'lois',
    date: '09/07/2021',
    fileSize: '1.4 Mo',
    format: 'PDF',
    previewText: `REPUBLIQUE DU SENEGAL - Un Peuple - Un But - Une Foi\nLOI n° 2021-32 du 09 juillet 2021 portant création, organisation et fonctionnement de la Commission de Régulation du Secteur de l’Énergie (CRSE).\n\nArticle premier. - Il est créé une autorité administrative indépendante dénommée « Commission de Régulation du Secteur de l’Énergie », en abrégé CRSE.\nArticle 2. - La CRSE est dotée de la personnalité juridique et de l'autonomie financière et de gestion. Son siège est fixé à Dakar.\nArticle 3. - La Commission a pour mission principale de veiller au bon fonctionnement des marchés de l'électricité, du gaz naturel et des hydrocarbures, et de protéger les intérêts des consommateurs et des opérateurs.`,
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Décret n° 2022-1185 portant organisation de la CRSE',
    subtitle: 'Modalités d’application de la loi n° 2021-32 relatives à l’organisation interne et aux délégations.',
    category: 'textes',
    subcategory: 'decrets',
    date: '12/04/2022',
    fileSize: '890 Ko',
    format: 'PDF',
    previewText: `DECRET N° 2022-1185 fixant les règles de gouvernance, la composition des collèges de régulation et les directions opérationnelles de la Commission de Régulation du Secteur de l’Énergie.`,
    downloadUrl: '#',
  },
  {
    id: 3,
    title: "Code de l'Électricité — Loi n° 2021-31 du 09 juillet 2021",
    subtitle: 'Nouveau cadre légal régissant les activités de production, de transport, de distribution et de vente d’électricité.',
    category: 'textes',
    subcategory: 'lois',
    date: '09/07/2021',
    fileSize: '3.2 Mo',
    format: 'PDF',
    previewText: `LOI N° 2021-31 portant Code de l'Électricité au Sénégal.\nCette loi abroge la loi n° 98-29 du 14 avril 1998 et introduit l'ouverture régulée du marché, la promotion des énergies renouvelables et les nouveaux droits des usagers de l'électricité.`,
    downloadUrl: '#',
  },
  {
    id: 4,
    title: 'Délibération n° 2024-001 — Fixation des grilles tarifaires de l’électricité',
    subtitle: 'Décision tarifaire pour la période 2024-2026 applicable aux usagers basse, moyenne et haute tension.',
    category: 'decisions',
    subcategory: 'deliberations',
    date: '15/01/2024',
    fileSize: '650 Ko',
    format: 'PDF',
    previewText: `DELIBERATION N° 2024-001 / CRSE portant révision périodique des tarifs de vente d'électricité au titre de l'année 2024.\nVu la loi n° 2021-32 portant création de la CRSE ;\nVu le contrat de concession conclu avec la Senelec ;\nLa Commission réunie en séance plénière décide des barèmes applicables à compter du 1er février 2024.`,
    downloadUrl: '#',
  },
  {
    id: 5,
    title: 'Avis consultatif n° 2024-003 sur la péréquation tarifaire nationale',
    subtitle: 'Avis rendu au Ministère chargé de l’Énergie relatif au mécanisme de soutien aux zones rurales.',
    category: 'decisions',
    subcategory: 'avis-consultatifs',
    date: '10/05/2024',
    fileSize: '420 Ko',
    format: 'PDF',
    previewText: `AVIS DE LA CRSE relatif à l'harmonisation des tarifs entre les concessions rurales d'électrification et le réseau interconnecté national.`,
    downloadUrl: '#',
  },
  {
    id: 6,
    title: 'Grilles tarifaires d’électricité Basse Tension (BT) — Usage Domestique',
    subtitle: 'Barème détaillé des tranches sociales, ordinaires et du système prépayé Woyofal.',
    category: 'grilles',
    subcategory: 'electricite-bt',
    date: '01/01/2024',
    fileSize: '510 Ko',
    format: 'PDF',
    previewText: `GRILLES TARIFAIRES BASSE TENSION\nTranche 1 (0 à 150 kWh) : 91,17 FCFA / kWh HT\nTranche 2 (151 à 250 kWh) : 136,49 FCFA / kWh HT\nTranche 3 (> 250 kWh) : 149,03 FCFA / kWh HT\nBarème appliqué au prépaiement et post-paiement.`,
    downloadUrl: '#',
  },
  {
    id: 7,
    title: 'Grilles tarifaires Moyenne & Haute Tension (MT/HT) Industriels',
    subtitle: 'Tarifs horosaisonniers pour les professionnels, industries et gros consommateurs d’énergie.',
    category: 'grilles',
    subcategory: 'electricite-mt-ht',
    date: '01/01/2024',
    fileSize: '780 Ko',
    format: 'PDF',
    previewText: `TARIFS PROFESSIONNELS & INDUSTRIELS (MT & HT)\nHeures pleines, heures de pointe, heures creuses et redevance de puissance souscrite.`,
    downloadUrl: '#',
  },
  {
    id: 8,
    title: 'Structure officielle des prix des hydrocarbures — Février 2025',
    subtitle: 'Décomposition du prix au litre : Super, Gasoil, Pétrole lampant, Gaz butane.',
    category: 'hydrocarbures',
    subcategory: 'mensuel-2025',
    date: '01/02/2025',
    fileSize: '950 Ko',
    format: 'PDF',
    previewText: `STRUCTURE DES PRIX DES PRODUITS PETROLIERS (Arrêté interministériel)\nSupercarburant : 990 FCFA/L\nGasoil ordinaire : 755 FCFA/L\nGaz butane bouteille 6kg : 2 885 FCFA\nGaz butane bouteille 12,5kg : 6 000 FCFA\nDétail des composantes : Prix CAF, droits de douane, péréquation transport, marge distributeur.`,
    downloadUrl: '#',
  },
  {
    id: 9,
    title: 'Structure officielle des prix des hydrocarbures — Janvier 2025',
    subtitle: 'Barème et composantes fiscales et parafiscales des produits pétroliers.',
    category: 'hydrocarbures',
    subcategory: 'mensuel-2025',
    date: '01/01/2025',
    fileSize: '920 Ko',
    format: 'PDF',
    previewText: `STRUCTURE OFFICIELLE DES PRIX - JANVIER 2025\nRelevé mensuel publié conformément aux dispositions régulatoires du secteur aval des hydrocarbures.`,
    downloadUrl: '#',
  },
  {
    id: 10,
    title: 'Bulletin Officiel de la CRSE — N° 12 (4e Trimestre 2024)',
    subtitle: 'Recueil exhaustif des décisions, délibérations et avis adoptés au dernier trimestre 2024.',
    category: 'bulletins',
    subcategory: 'bo-2024',
    date: '31/12/2024',
    fileSize: '4.8 Mo',
    format: 'PDF',
    previewText: `BULLETIN OFFICIEL DE LA REGULATION DE L’ENERGIE\nÉdition n° 12 - Trimestre 4 / Année 2024\nSommaire :\n1. Actes réglementaires du collège\n2. Décisions de tarification gazière\n3. Synthèse des litiges examinés par le comité de règlement des différends\n4. Statistiques trimestrielles de production.`,
    downloadUrl: '#',
  },
  {
    id: 11,
    title: 'Document de Consultation Publique : Régulation du réseau de transport gazier (RAG)',
    subtitle: 'Document soumis à consultation auprès des opérateurs et des partenaires pour l’accès des tiers.',
    category: 'consultations',
    subcategory: 'en-cours',
    date: '15/01/2025',
    fileSize: '2.1 Mo',
    format: 'PDF',
    previewText: `CONSULTATION PUBLIQUE RELATIVE AU CODE DE RESEAU GAZIER DU SENEGAL\nLa CRSE invite les acteurs industriels, associations de consommateurs et bailleurs à soumettre leurs observations avant le 31 mars 2025 sur les principes directeurs de tarification du gazoduc national.`,
    downloadUrl: '#',
  },
  {
    id: 12,
    title: 'Rapport Annuel d’Activité 2024 de la CRSE',
    subtitle: 'Bilan complet des missions de régulation, état du marché et perspectives énergétiques au Sénégal.',
    category: 'rapports',
    subcategory: 'rapports-annuels',
    date: '08/01/2025',
    fileSize: '6.5 Mo',
    format: 'PDF',
    previewText: `RAPPORT D’ACTIVITE 2024 - LA REGULATION AU SERVICE DE LA TRANSITION ENERGETIQUE\nMot du Président Ibrahima Niane\nChapitre 1 : Faits saillants de l'exercice\nChapitre 2 : Régulation du secteur de l'électricité (Senelec, IPP, concessionnaires ruraux)\nChapitre 3 : Structuration du secteur aval des hydrocarbures\nChapitre 4 : Préparation de la valorisation du gaz local (Projet GTA et Yakaar-Teranga)\nChapitre 5 : Protection des usagers et traitement des réclamations.`,
    downloadUrl: '#',
  },
]

export function DocumentsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [activeSectors, setActiveSectors] = useState<SectorId[]>([])
  const [activeYear, setActiveYear] = useState('all')
  const [previewDoc, setPreviewDoc] = useState<DocItem | null>(null)
  const { documents: wpDocuments, loading, error } = useWPDocuments()

  // Lecture des paramètres d'URL (ex: ?cats=textes-legislatifs-et-reglementaires ou ?cats=grilles ou ?cats=grilles-tarifaires)
  useEffect(() => {
    const catsParam = searchParams.get('cats') || searchParams.get('cat')
    const sectorParam = searchParams.get('secteur') || searchParams.get('sector')
    const yearParam = searchParams.get('annee') || searchParams.get('year')
    const qParam = searchParams.get('q')

    setSearch(qParam ?? '')
    setActiveYear(yearParam ?? 'all')
    const sectors = (sectorParam ?? '').split(',').filter((id): id is SectorId =>
      id === 'electricite' || id === 'hydrocarbures' || id === 'gaz'
    )
    setActiveSectors([...new Set(sectors)])

    if (catsParam) {
      const categoryIds = catsParam.split(',').flatMap((value) => {
        const lower = value.toLowerCase()
        if (lower === 'decisions-avis' || lower === 'decisions-et-avis') return ['decisions', 'avis']
        if (lower.includes('avis')) return ['avis']
        if (lower.includes('decision')) return ['decisions']
        if (lower.includes('texte') || lower.includes('loi')) return ['textes']
        if (lower.includes('grille') || lower.includes('tarif')) return ['grilles']
        if (lower.includes('hydrocarbure') || lower.includes('prix')) return ['hydrocarbures']
        if (lower.includes('bulletin')) return ['bulletins']
        if (lower.includes('consultation')) return ['consultations']
        if (lower.includes('rapport')) return ['rapports']
        return [lower]
      }).filter((id) => id !== 'all' && mainCategories.some((category) => category.id === id))
      setActiveCategories([...new Set(categoryIds)])
    } else {
      setActiveCategories([])
    }

  }, [searchParams])

  const wpDocumentItems: DocItem[] = wpDocuments.map((item) => ({
    id: item.id,
    title: stripHtml(item.title.rendered),
    subtitle: stripHtml(item.excerpt?.rendered ?? item.content?.rendered ?? ''),
    category: getWPDocumentCategory(item) as DocumentCategoryId,
    subcategory: '',
    date: new Date(item.date).toLocaleDateString('fr-FR'),
    fileSize: '',
    format: 'Publication CRSE',
    previewText: stripHtml(item.content?.rendered ?? item.excerpt?.rendered ?? ''),
    downloadUrl: item.link,
    sourceUrl: item.link,
    sector: getWPDocumentSector(item),
  }))
  const availableYears = [...new Set(wpDocumentItems.map((item) => item.date.slice(-4)))].sort((left, right) => right.localeCompare(left))
  const sectors: Array<{ id: SectorId; label: string }> = [
    { id: 'electricite', label: 'Électricité' },
    { id: 'hydrocarbures', label: 'Hydrocarbures' },
    { id: 'gaz', label: 'Gaz' },
  ]

  const handleSelectCategory = (categoryId: string) => {
    const nextCategories = categoryId === 'all'
      ? []
      : activeCategories.includes(categoryId)
        ? activeCategories.filter((id) => id !== categoryId)
        : [...activeCategories, categoryId]
    setActiveCategories(nextCategories)
    const params: Record<string, string> = {}
    if (nextCategories.length) params.cats = nextCategories.join(',')
    if (activeSectors.length) params.secteur = activeSectors.join(',')
    if (activeYear !== 'all') params.annee = activeYear
    if (search) params.q = search
    setSearchParams(params)
  }

  const toggleSector = (sectorId: SectorId) => {
    const nextSectors = activeSectors.includes(sectorId)
      ? activeSectors.filter((sector) => sector !== sectorId)
      : [...activeSectors, sectorId]
    setActiveSectors(nextSectors)
    const params: Record<string, string> = {}
    if (activeCategories.length) params.cats = activeCategories.join(',')
    if (nextSectors.length) params.secteur = nextSectors.join(',')
    if (activeYear !== 'all') params.annee = activeYear
    if (search) params.q = search
    setSearchParams(params)
  }

  const setYear = (year: string) => {
    setActiveYear(year)
    const params: Record<string, string> = {}
    if (activeCategories.length) params.cats = activeCategories.join(',')
    if (activeSectors.length) params.secteur = activeSectors.join(',')
    if (year !== 'all') params.annee = year
    if (search) params.q = search
    setSearchParams(params)
  }

  const filteredDocs = wpDocumentItems.filter((doc) => {
    const matchesCat = activeCategories.length === 0 || activeCategories.includes(doc.category)
    const matchesSector = activeSectors.length === 0 || (doc.sector != null && activeSectors.includes(doc.sector))
    const matchesYear = activeYear === 'all' || doc.date.slice(-4) === activeYear
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      doc.title.toLowerCase().includes(q) ||
      doc.subtitle.toLowerCase().includes(q) ||
      doc.previewText.toLowerCase().includes(q)

    return matchesCat && matchesSector && matchesYear && matchesSearch
  }).sort((left, right) => {
    const [leftDay, leftMonth, leftYear] = left.date.split('/').map(Number)
    const [rightDay, rightMonth, rightYear] = right.date.split('/').map(Number)
    return new Date(rightYear, rightMonth - 1, rightDay).getTime() - new Date(leftYear, leftMonth - 1, leftDay).getTime()
  })

  return (
    <>
      <PageBanner
        eyebrow="Ressources Officielles"
        title="Textes & Documents"
        description="Consultez, visualisez en ligne ou téléchargez l’ensemble des textes législatifs, décisions de commission, grilles tarifaires, bulletins officiels et rapports de la CRSE."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12">
        {/* Barre de recherche */}
        <div className="relative mb-8 max-w-[850px]">
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-chathams-blue focus-within:ring-2 focus-within:ring-chathams-blue/10">
            <Search className="ml-3 text-slate-400" size={20} aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                const value = event.target.value
                setSearch(value)
                const params: Record<string, string> = {}
                if (activeCategories.length) params.cats = activeCategories.join(',')
                if (activeSectors.length) params.secteur = activeSectors.join(',')
                if (activeYear !== 'all') params.annee = activeYear
                if (value) params.q = value
                setSearchParams(params, { replace: true })
              }}
              placeholder="Rechercher par mot-clé, numéro de loi, délibération, tarif..."
              className="w-full bg-transparent px-4 py-2 text-[16px] text-slate-800 placeholder-slate-400 focus:outline-none"
              aria-label="Rechercher un document"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  const params: Record<string, string> = {}
                  if (activeCategories.length) params.cats = activeCategories.join(',')
                  if (activeSectors.length) params.secteur = activeSectors.join(',')
                  if (activeYear !== 'all') params.annee = activeYear
                  setSearchParams(params, { replace: true })
                }}
                className="mr-2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Effacer la recherche"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Filtres par grandes catégories */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-[14px] font-semibold text-slate-600">
            <Filter size={15} />
            <span>Catégories (sélection multiple) :</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {mainCategories.map((cat) => {
              const Icon = cat.icon
              const isSelected = cat.id === 'all' ? activeCategories.length === 0 : activeCategories.includes(cat.id)
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium transition-all ${
                    isSelected
                      ? 'bg-chathams-blue text-white shadow-sm ring-2 ring-chathams-blue/20'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon size={15} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-6 grid gap-6 border-b border-slate-200 pb-6 md:grid-cols-2">
          <fieldset>
            <legend className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-slate-600"><Filter size={15} />Secteurs concernés</legend>
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => (
                <label key={sector.id} className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-medium ${activeSectors.includes(sector.id) ? 'border-chathams-blue bg-chathams-blue text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}>
                  <input type="checkbox" checked={activeSectors.includes(sector.id)} onChange={() => toggleSector(sector.id)} className="h-4 w-4 accent-[#1b3e80]" />
                  {sector.label}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="documents-year" className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-slate-600"><CalendarDays size={15} />Année de publication</label>
            <select id="documents-year" value={activeYear} onChange={(event) => setYear(event.target.value)} className="w-full max-w-[260px] rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[14px] text-slate-700">
              <option value="all">Toutes les années</option>
              {availableYears.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
        </div>

        {/* Compteur de résultats */}
        <div className="mb-6 flex items-center justify-between text-[14px] text-slate-500 border-b border-slate-200 pb-3">
          <span>
            <strong>{filteredDocs.length}</strong> document{filteredDocs.length > 1 ? 's' : ''} trouvé{filteredDocs.length > 1 ? 's' : ''}
            {search && ` pour « ${search} »`}
          </span>
          {(activeCategories.length > 0 || activeSectors.length > 0 || activeYear !== 'all' || search) && (
            <button
              type="button"
              onClick={() => {
                setActiveCategories([])
                setActiveSectors([])
                setActiveYear('all')
                setSearch('')
                setSearchParams({})
              }}
              className="text-[13px] text-shakespeare hover:underline font-medium"
            >
              Réinitialiser tous les filtres
            </button>
          )}
        </div>

        {/* Grille des documents avec actions Visualiser & Télécharger */}
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-slate-500"><LoaderCircle size={20} className="animate-spin" />Chargement des documents officiels…</div>
        ) : error ? (
          <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-[14px] text-amber-900">Les documents CRSE ne sont pas disponibles actuellement. Réessayez dans quelques instants.</div>
        ) : filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => {
              const catObj = mainCategories.find((c) => c.id === doc.category)
              const Icon = catObj?.icon ?? FileText
              const color = catObj?.color ?? '#1b3e80'

              return (
                <div
                  key={doc.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-shakespeare/60 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-semibold"
                        style={{ background: `${color}14`, color }}
                      >
                        <Icon size={14} />
                        {catObj?.label.split(' ')[0]}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                        {doc.format}
                      </span>
                    </div>

                    <h3 className="text-[17px] font-bold leading-snug text-chathams-blue line-clamp-2">
                      {doc.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-slate-600 leading-relaxed line-clamp-3">
                      {doc.subtitle}
                    </p>
                    {doc.sector && <p className="mt-3 text-[12px] font-semibold text-slate-500">Secteur : {sectors.find((sector) => sector.id === doc.sector)?.label}</p>}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[12px] text-slate-400 font-medium">
                      Publié le {doc.date}
                    </span>
                    <div className="flex items-center gap-2">
                      {doc.previewText && <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setPreviewDoc(doc)}
                        className="h-8 gap-1 rounded-lg border-slate-300 px-3 text-[12px] font-semibold text-chathams-blue hover:bg-slate-50"
                      >
                        <Eye size={14} />
                        <span>Visualiser</span>
                      </Button>}
                      <Button
                        size="sm"
                        asChild
                        className="h-8 gap-1 rounded-lg bg-chathams-blue px-3 text-[12px] font-semibold text-white hover:bg-chathams-blue/90"
                      >
                        <a
                          href={doc.sourceUrl ?? doc.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={14} />
                          <span>Ouvrir la source CRSE</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center bg-slate-50">
            <FileText className="mx-auto h-12 w-12 text-slate-400 mb-3" />
            <h3 className="text-[18px] font-bold text-slate-700">Aucun document ne correspond à vos critères</h3>
            <p className="mt-1 text-[14px] text-slate-500 max-w-md mx-auto">
              Essayez de modifier votre recherche ou de sélectionner « Tous les documents ».
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setActiveCategories([])
                setActiveSectors([])
                setActiveYear('all')
                setSearch('')
                setSearchParams({})
              }}
              className="mt-4 rounded-full"
            >
              Réinitialiser les critères
            </Button>
          </div>
        )}

        {/* Modal de prévisualisation interactif */}
        {previewDoc && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-modal-title"
          >
            <div className="relative flex max-h-[90vh] w-full max-w-[850px] flex-col rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200">
              {/* Header du modal */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-chathams-blue/10 p-2 text-chathams-blue">
                    <FileText size={20} />
                  </span>
                  <div>
                    <h3 id="preview-modal-title" className="text-[17px] font-bold text-chathams-blue leading-snug">
                      {previewDoc.title}
                    </h3>
                    <p className="text-[12px] text-slate-500">
                      Format : {previewDoc.format} • Taille : {previewDoc.fileSize} • Date : {previewDoc.date}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                  aria-label="Fermer la prévisualisation"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Contenu / Visualiseur intégré */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-100 font-mono text-[13px] leading-relaxed text-slate-800">
                <div className="mx-auto max-w-[700px] rounded-xl bg-white p-8 shadow-sm border border-slate-200">
                  <div className="border-b border-slate-200 pb-4 mb-6 text-center">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Visualisation Officielle CRSE
                    </span>
                    <h4 className="font-sans text-[18px] font-bold text-chathams-blue">
                      {previewDoc.title}
                    </h4>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-[14px] text-slate-700 leading-relaxed">
                    {previewDoc.previewText}
                  </pre>
                  <div className="mt-8 rounded-lg bg-blue-50 p-4 border border-blue-100 text-[12px] text-blue-900 font-sans">
                    <strong>Note :</strong> Ce document est un extrait certifié conforme publié au Journal Officiel ou dans les délibérations de la Commission de Régulation du Secteur de l’Énergie.
                  </div>
                </div>
              </div>

              {/* Footer du modal avec téléchargement */}
              <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
                <span className="text-[13px] text-slate-500">
                  Document certifié CRSE
                </span>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPreviewDoc(null)}
                    className="rounded-full px-5 text-[14px]"
                  >
                    Fermer
                  </Button>
                  <Button
                    type="button"
                    className="gap-2 rounded-full bg-chathams-blue px-6 text-[14px] text-white hover:bg-chathams-blue/90"
                    onClick={() => {
                      const blob = new Blob([previewDoc.previewText], { type: 'text/plain;charset=utf-8' })
                      const url = URL.createObjectURL(blob)
                      const link = document.createElement('a')
                      link.href = url
                      link.download = `${previewDoc.title.slice(0, 30)}.txt`
                      link.click()
                      URL.revokeObjectURL(url)
                    }}
                  >
                    <Download size={15} />
                    <span>Télécharger la version complète</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lien de redirection vers le portail officiel */}
        <div className="mt-16 flex items-center justify-between rounded-xl bg-slate-50 p-6 border border-slate-200">
          <div className="flex items-center gap-3">
            <ExternalLink className="text-shakespeare" size={20} />
            <div>
              <h4 className="text-[15px] font-bold text-chathams-blue">Portail d’archivage réglementaire</h4>
              <p className="text-[13px] text-slate-600">
                Vous recherchez une archive spécifique d'une délibération antérieure à 2020 ?
              </p>
            </div>
          </div>
          <Button asChild variant="outline" className="rounded-full border-chathams-blue text-chathams-blue hover:bg-chathams-blue hover:text-white">
            <a href="https://crse.sn/documents" target="_blank" rel="noopener noreferrer">
              Accéder aux archives externes
            </a>
          </Button>
        </div>
      </main>
    </>
  )
}
