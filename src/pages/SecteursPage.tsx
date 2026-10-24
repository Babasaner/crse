import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Zap,
  Flame,
  Fuel,
  ArrowRight,
  FileText,
  Building,
  Building2,
  BarChart3,
  Scale,
  ExternalLink,
  Search,
  MapPin,
  Download,
  X
} from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'
import { hydrocarbonOperators, type HydrocarbonActivity } from '../data/hydrocarbonOperators'
import { DocumentsSection } from './Accueil/sections/DocumentsSection/DocumentsSection'

type SectorTab = 'electricite' | 'hydrocarbures' | 'gaz'
type FiguresSector = Extract<SectorTab, 'electricite' | 'hydrocarbures'>

const hydrocarbonFigures = [
  { activity: 'Raffinage', label: 'Capacité nominale', value: '1 500 000', unit: 'tonnes' },
  { activity: 'Raffinage', label: 'Production annuelle', value: '1 257 482', unit: 'tonnes' },
  { activity: 'Importation', label: 'Titulaires de licences', value: '56', unit: '' },
  { activity: 'Importation', label: 'Tankers de brut', value: '11', unit: '' },
  { activity: 'Importation', label: 'Tankers de produits pétroliers liquides', value: '140', unit: '' },
  { activity: 'Importation', label: 'Butaniers', value: '48', unit: '' },
  { activity: 'Importation', label: 'Produits destinés au marché intérieur', value: '1 696 504', unit: 'tonnes' },
  { activity: 'Importation', label: 'Produits destinés à la réexportation', value: '1 490 301', unit: 'tonnes' },
  { activity: 'Stockage', label: 'Titulaires de licences de stockage', value: '16', unit: '' },
  { activity: 'Stockage', label: 'Capacité nominale de produits pétroliers', value: '469 027', unit: 'm³' },
  { activity: 'Stockage', label: 'Capacité nominale de gaz butane', value: '18 200', unit: 'm³' },
  { activity: 'Stockage', label: 'Dépôts produits pétroliers / gaz butane', value: '9 / 4', unit: '' },
  { activity: 'Stockage', label: 'Dépôts en construction (produits pétroliers / butane)', value: '4 / 1', unit: '' },
  { activity: 'Transport', label: 'Titulaires de licences de transport', value: '61', unit: '' },
  { activity: 'Transport', label: 'Garages contrôlés', value: '9', unit: '' },
  { activity: 'Transport', label: 'Citernes', value: '523', unit: '' },
  { activity: 'Distribution', label: 'Titulaires de licences de distribution', value: '95', unit: '' },
  { activity: 'Distribution', label: 'Points de vente', value: '1 286', unit: '' },
  { activity: 'Distribution', label: 'Produits liquides consommés', value: '3 323 833', unit: 'tonnes' },
  { activity: 'Distribution', label: 'Gaz butane consommé', value: '230 189', unit: 'tonnes' },
]

function SectorFiguresModal({ sector, onClose }: { sector: FiguresSector; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  const isElectricity = sector === 'electricite'
  const title = isElectricity ? 'Chiffres clés du secteur de l’électricité' : 'Chiffres clés du secteur aval des hydrocarbures'

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="sector-figures-modal-title"
        className="flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-slate-50 shadow-2xl sm:max-h-[88vh] sm:rounded-3xl"
      >
        <header className="flex items-start justify-between gap-4 bg-gradient-to-r from-chathams-blue to-slate-900 px-5 py-5 text-white sm:px-8 sm:py-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Données officielles · 2024</span>
            <h2 id="sector-figures-modal-title" className="mt-1 text-xl font-extrabold sm:text-2xl">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer les chiffres clés"
            className="shrink-0 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={20} />
          </button>
        </header>

        <div className="overflow-y-auto p-4 sm:p-8">
          {isElectricity ? (
            <>
              <p className="mb-5 text-sm leading-relaxed text-slate-600">Indicateurs clés du système électrique sénégalais en 2024.</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: 'Puissance installée', value: '1 903,5', unit: 'MW', accent: 'text-amber-600', icon: Zap },
                  { label: 'Part des énergies renouvelables', value: '29,32', unit: '%', accent: 'text-emerald-700', icon: Flame },
                  { label: 'Production totale', value: '7 464,88', unit: 'GWh', accent: 'text-chathams-blue', icon: BarChart3 },
                ].map((figure) => {
                  const Icon = figure.icon
                  return (
                    <article key={figure.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-chathams-blue"><Icon size={20} /></div>
                      <p className="mt-5 min-h-10 text-sm font-semibold text-slate-600">{figure.label}</p>
                      <p className={`mt-1 text-3xl font-black tracking-tight sm:text-4xl ${figure.accent}`}>
                        {figure.value}<span className="ml-2 text-base font-bold text-slate-500">{figure.unit}</span>
                      </p>
                    </article>
                  )
                })}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-slate-500">
                Source : CRSE, chiffres clés du secteur de l’électricité, année 2024.{' '}
                <a href="https://www.crse.sn/secteurs/secteur-electricite/" target="_blank" rel="noopener noreferrer" className="font-semibold text-chathams-blue underline underline-offset-2">Consulter la source officielle</a>.
              </p>
            </>
          ) : (
            <>
              <p className="mb-5 text-sm leading-relaxed text-slate-600">Indicateurs détaillés de la chaîne aval des hydrocarbures, regroupés par activité.</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hydrocarbonFigures.map((figure) => (
                  <article key={`${figure.activity}-${figure.label}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-chathams-blue">{figure.activity}</span>
                    <p className="mt-3 text-sm leading-snug text-slate-600">{figure.label}</p>
                    <p className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                      {figure.value}{figure.unit && <span className="ml-2 text-sm font-bold text-slate-500">{figure.unit}</span>}
                    </p>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-slate-500">
                Source : CRSE, chiffres clés du secteur aval des hydrocarbures, année 2024.{' '}
                <a href="https://www.crse.sn/secteurs/aval-hydrocarbures/" target="_blank" rel="noopener noreferrer" className="font-semibold text-chathams-blue underline underline-offset-2">Consulter la source officielle</a>.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export function SecteursPage({ secteur }: { secteur?: SectorTab }) {
  const [searchParams] = useSearchParams()
  const [elecTab, setElecTab] = useState<'institutionnels' | 'operationnels'>('institutionnels')
  const [hydroActorsTab, setHydroActorsTab] = useState<'institutionnels' | 'operationnels'>('institutionnels')
  const [gasActorsTab, setGasActorsTab] = useState<'institutionnels' | 'operationnels'>('institutionnels')
  const [operatorFilter, setOperatorFilter] = useState<HydrocarbonActivity | 'TOUS'>('TOUS')
  const [operatorSearch, setOperatorSearch] = useState('')
  const [figuresModal, setFiguresModal] = useState<FiguresSector | null>(null)
  const closeFiguresModal = () => setFiguresModal(null)
  const secteurParam = searchParams.get('secteur')
  const activeTab: SectorTab = secteur ?? (
    secteurParam === 'hydrocarbures' ? 'hydrocarbures' :
    secteurParam === 'gaz' ? 'gaz' :
    'electricite'
  )
  const sectorTitle = activeTab === 'electricite'
    ? "Secteur de l'Électricité"
    : activeTab === 'hydrocarbures'
      ? "Secteur Aval des Hydrocarbures"
      : "Segments Aval & Intermédiaire Gaziers"
  const sectorDescription = activeTab === 'electricite'
    ? "Cadre opératoire, cartographie des acteurs, chiffres clés et tarification des marchés de l’énergie au Sénégal."
    : activeTab === 'hydrocarbures'
      ? "Retrouvez les acteurs institutionnels et opérationnels, les statistiques 2024 et la structure des prix des produits pétroliers."
      : "Découvrez les acteurs institutionnels et opérationnels ainsi que les informations disponibles sur les segments aval et intermédiaire gaziers."
  const visibleOperators = hydrocarbonOperators.filter((operator) => {
    const matchesActivity = operatorFilter === 'TOUS' || operator.activity === operatorFilter
    const search = operatorSearch.trim().toLocaleLowerCase('fr')
    const matchesSearch = !search || `${operator.name} ${operator.address}`.toLocaleLowerCase('fr').includes(search)
    return matchesActivity && matchesSearch
  })
  const operatorFilters: Array<{ value: HydrocarbonActivity | 'TOUS'; label: string }> = [
    { value: 'TOUS', label: 'Tous' },
    { value: 'IMPORTATION', label: 'Importation' },
    { value: 'STOCKAGE', label: 'Stockage' },
    { value: 'DISTRIBUTION', label: 'Distribution' },
    { value: 'TRANSPORT', label: 'Transport' },
  ]

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* 1. HERO BANNER UNIFORME AVEC BREADCRUMB */}
      <PageBanner
        eyebrow="Régulation Sectorielle"
        title={sectorTitle}
        description={sectorDescription}
      />

      {/* 2. ONGLETS DE NAVIGATION SECTORIELLE */}
      <section className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-3">
            <Link
              to="/electricite#electricite-key-figures"
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] transition-all shrink-0 ${
                activeTab === 'electricite'
                  ? 'bg-chathams-blue text-white shadow-md shadow-chathams-blue/20'
                  : 'text-slate-600 hover:text-chathams-blue hover:bg-slate-100'
              }`}
            >
              <Zap size={18} className={activeTab === 'electricite' ? 'text-amber-300' : 'text-slate-400'} />
              <span>Secteur de l'Électricité</span>
            </Link>

            <Link
              to="/hydrocarbures#hydrocarbon-key-figures"
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] transition-all shrink-0 ${
                activeTab === 'hydrocarbures'
                  ? 'bg-chathams-blue text-white shadow-md shadow-chathams-blue/20'
                  : 'text-slate-600 hover:text-chathams-blue hover:bg-slate-100'
              }`}
            >
              <Fuel size={18} className={activeTab === 'hydrocarbures' ? 'text-shakespeare' : 'text-slate-400'} />
              <span>Aval des Hydrocarbures</span>
            </Link>

            <Link
              to="/gaz#gas-key-figures"
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] transition-all shrink-0 ${
                activeTab === 'gaz'
                  ? 'bg-chathams-blue text-white shadow-md shadow-chathams-blue/20'
                  : 'text-slate-600 hover:text-chathams-blue hover:bg-slate-100'
              }`}
            >
              <Flame size={18} className={activeTab === 'gaz' ? 'text-orange-400' : 'text-slate-400'} />
              <span>Aval & Intermédiaire Gaziers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CONTENU DÉTAILLÉ SELON L'ONGLET SÉLECTIONNÉ */}
      <main className="mx-auto w-full max-w-[1440px] px-6 py-14 lg:px-12">
        {/* ========================================================================= */}
        {/* ONGLET 1 : ÉLECTRICITÉ */}
        {/* ========================================================================= */}
        {activeTab === 'electricite' && (
          <div className="space-y-14 animate-fade-in">
            {/* Résumé & Texte d'introduction officiel */}
            <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-sm border border-slate-200">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-[12px] font-bold text-amber-800 mb-4">
                <Zap size={16} className="text-amber-600" />
                <span>Régulation de l'Énergie Électrique</span>
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-slate-900 leading-snug">
                Secteur de l’Électricité
              </h2>
              <p className="mt-4 text-[16px] sm:text-[18px] text-slate-700 leading-relaxed max-w-4xl font-normal">
                Le secteur électrique sénégalais est structuré autour de l’opérateur Senelec, de Producteurs privés Indépendants (IPP) et d'opérateurs d'électrification rurale. L'objectif national est l'accès universel à l'électricité à l'horizon 2029.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chathams-blue text-white mb-3">
                    <Building size={20} />
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-900">
                    <Link to="/electricite/acteurs" className="hover:text-shakespeare">
                      Cartographie des acteurs <ArrowRight size={14} className="ml-1 inline" />
                    </Link>
                  </h3>
                  <p className="text-[13px] text-slate-600 mt-1">
                    Répertoire officiel des acteurs et titulaires de licences du secteur électrique.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-shakespeare text-white mb-3">
                    <BarChart3 size={20} />
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-900">
                    <Link to="/electricite/chiffres-cles" className="hover:text-shakespeare">
                      Chiffres clés du secteur <ArrowRight size={14} className="ml-1 inline" />
                    </Link>
                  </h3>
                  <p className="text-[13px] text-slate-600 mt-1">
                    Données annuelles consolidées sur la puissance installée, la production et l’accès.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white mb-3">
                    <Scale size={20} />
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-900">
                    <Link to="/documents?cats=grilles&secteur=electricite" className="hover:text-shakespeare">
                      Grilles tarifaires <ArrowRight size={14} className="ml-1 inline" />
                    </Link>
                  </h3>
                  <p className="text-[13px] text-slate-600 mt-1">
                    Barèmes approuvés par la CRSE, tarifs Woyofal et tarifs d'accès aux réseaux tiers.
                  </p>
                </div>
              </div>
            </div>

            {/* DEUX RUBRIQUES / TABS DES ACTEURS */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">
                    Organisation Sectorielle
                  </span>
                  <h3 className="text-[26px] sm:text-[30px] font-bold text-slate-900">
                    Les Acteurs du Secteur Électrique
                  </h3>
                  <p className="text-[14px] text-slate-500 mt-1">
                    Sélectionnez une catégorie pour explorer les acteurs institutionnels ou les acteurs opérationnels.
                  </p>
                </div>

                <Link
                  to="/operateurs/marches"
                  className="inline-flex items-center gap-2 text-[14px] font-bold text-chathams-blue hover:text-shakespeare"
                >
                  <span>Consulter le registre des opérateurs</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Sélecteur des 2 Tabs */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => setElecTab('institutionnels')}
                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-[14px] sm:text-[15px] transition-all shadow-sm ${
                    elecTab === 'institutionnels'
                      ? 'bg-chathams-blue text-white shadow-md shadow-chathams-blue/20 ring-2 ring-chathams-blue'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Building2 size={18} className={elecTab === 'institutionnels' ? 'text-shakespeare' : 'text-slate-400'} />
                  <span>Les acteurs Institutionnels</span>
                </button>

                <button
                  type="button"
                  onClick={() => setElecTab('operationnels')}
                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-[14px] sm:text-[15px] transition-all shadow-sm ${
                    elecTab === 'operationnels'
                      ? 'bg-chathams-blue text-white shadow-md shadow-chathams-blue/20 ring-2 ring-chathams-blue'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Zap size={18} className={elecTab === 'operationnels' ? 'text-amber-300' : 'text-slate-400'} />
                  <span>Les acteurs Opérationnels</span>
                </button>
              </div>

              {/* CONTENU ONGLET 1 : ACTEURS INSTITUTIONNELS */}
              {elecTab === 'institutionnels' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch animate-fade-in">
                  {/* 1. Ministère de l'Énergie */}
                  <div className="flex flex-col justify-between rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div>
                      <div className="flex h-24 items-center justify-center rounded-2xl bg-slate-50 p-3 border border-slate-100 mb-5">
                        <img
                          src="https://www.crse.sn/wp-content/uploads/2026/03/MINISTeRE-DE-LeNERGIE-DU-PETROLE.png"
                          alt="Ministère de l'Énergie, du Pétrole et des Mines"
                          className="max-h-16 w-auto object-contain"
                        />
                      </div>
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-chathams-blue text-[11px] font-bold uppercase mb-2">
                        Tutelle Gouvernementale
                      </span>
                      <h4 className="text-[19px] font-bold text-slate-900 leading-snug">
                        Ministère de l’Énergie, du Pétrole et des Mines
                      </h4>
                      <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                        Définit la politique énergétique nationale, pilote la stratégie de souveraineté et fixe le cadre législatif applicable au secteur de l'énergie au Sénégal.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Button asChild className="w-full rounded-full bg-chathams-blue text-white hover:bg-shakespeare transition-colors gap-2">
                        <a href="https://energie-mines.gouv.sn/" target="_blank" rel="noopener noreferrer">
                          <span>Visiter le site officiel</span>
                          <ExternalLink size={15} />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* 2. CRSE */}
                  <div className="flex flex-col justify-between rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div>
                      <div className="flex h-24 items-center justify-center rounded-2xl bg-slate-50 p-3 border border-slate-100 mb-5">
                        <img
                          src="https://www.crse.sn/wp-content/uploads/2025/12/favicon_crse.jpg"
                          alt="CRSE"
                          className="max-h-16 w-auto object-contain rounded-lg"
                        />
                      </div>
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-chathams-blue text-[11px] font-bold uppercase mb-2">
                        Autorité Indépendante
                      </span>
                      <h4 className="text-[19px] font-bold text-slate-900 leading-snug">
                        Commission de Régulation du Secteur de l’Énergie (CRSE)
                      </h4>
                      <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                        Autorité administrative indépendante assurant la régulation économique, financière et technique des marchés de l'électricité, la fixation des tarifs et la protection des droits des usagers.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Button asChild className="w-full rounded-full bg-chathams-blue text-white hover:bg-shakespeare transition-colors gap-2">
                        <Link to="/presentation">
                          <span>Présentation de la CRSE</span>
                          <ArrowRight size={15} />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* 3. Les Agences (ASER, ANER, AEME) */}
                  <div className="flex flex-col justify-between rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div>
                      <div className="flex h-24 items-center justify-around gap-2 rounded-2xl bg-slate-50 p-3 border border-slate-100 mb-5">
                        <img
                          src="https://www.crse.sn/wp-content/uploads/2026/09/aserlogo.png"
                          alt="ASER"
                          className="max-h-12 w-auto object-contain"
                          title="ASER"
                        />
                        <img
                          src="https://www.crse.sn/wp-content/uploads/2026/03/aner-logo-2048x605.png"
                          alt="ANER"
                          className="max-h-9 w-auto object-contain"
                          title="ANER"
                        />
                        <img
                          src="https://www.crse.sn/wp-content/uploads/2026/03/aeme-LOGO.png"
                          alt="AEME"
                          className="max-h-10 w-auto object-contain"
                          title="AEME"
                        />
                      </div>
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-chathams-blue text-[11px] font-bold uppercase mb-2">
                        Agences Publiques (3 Agences)
                      </span>
                      <h4 className="text-[19px] font-bold text-slate-900 leading-snug">
                        Les Agences Sectorielles (ASER, ANER, AEME)
                      </h4>
                      <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                        L’ASER (électrification rurale), l’ANER (énergies renouvelables) et l’AEME (économie et maîtrise de l’énergie) exécutent les programmes opérationnels publics du secteur.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Button asChild className="w-full rounded-full bg-shakespeare text-white hover:bg-shakespeare/90 transition-colors gap-2 font-bold">
                        <Link to="/electricite/agences">
                          <span>Découvrir la page des Agences</span>
                          <ArrowRight size={15} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTENU ONGLET 2 : ACTEURS OPÉRATIONNELS */}
              {elecTab === 'operationnels' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {/* 1. Opérateur Historique (Senelec) */}
                  <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-chathams-blue text-[11px] font-bold uppercase mb-3">
                        Opérateur Intégré
                      </span>
                      <h4 className="text-[19px] font-bold text-slate-900 leading-snug">
                        Opérateur Historique (Senelec)
                      </h4>
                      <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                        Senelec (Production, Transport, Distribution, Vente).
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                      <Button asChild size="sm" className="w-full rounded-full bg-chathams-blue text-white hover:bg-chathams-blue/90 gap-1.5">
                        <Link to="/electricite/operateur-historique">
                          <span>En savoir plus sur Senelec</span>
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="w-full rounded-full border-slate-300 text-slate-700 hover:text-chathams-blue gap-1.5">
                        <a href="https://www.senelec.sn" target="_blank" rel="noopener noreferrer">
                          <span>Visiter selec.sn</span>
                          <ExternalLink size={13} />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* 2. Auto-producteurs */}
                  <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-[11px] font-bold uppercase mb-3">
                        Autoproduction & Surplus
                      </span>
                      <h4 className="text-[19px] font-bold text-slate-900 leading-snug">
                        Auto-producteurs
                      </h4>
                      <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                        Personne physique ou morale qui produit de l’énergie électrique principalement pour un usage personnel en vue de satisfaire ses besoins et qui peut vendre le surplus de production conformément à la réglementation en vigueur.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Button asChild size="sm" className="w-full rounded-full bg-chathams-blue text-white hover:bg-chathams-blue/90 gap-1.5">
                        <Link to="/electricite/auto-producteurs">
                          <span>En savoir plus</span>
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* 3. Producteurs Privés Indépendants (IPP) */}
                  <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase mb-3">
                        Production Privée
                      </span>
                      <h4 className="text-[19px] font-bold text-slate-900 leading-snug">
                        Producteurs privés indépendants (IPP)
                      </h4>
                      <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                        Titulaire d’un titre d’exercice autorisé à développer, financer, construire, exploiter et maintenir une installation de production ou de stockage et qui vend également sa production au transporteur, au gestionnaire du Réseau de Distribution, aux détaillants indépendants et aux clients éligibles.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Button asChild size="sm" className="w-full rounded-full bg-chathams-blue text-white hover:bg-chathams-blue/90 gap-1.5">
                        <Link to="/electricite/producteurs-independants">
                          <span>En savoir plus</span>
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* 4. Concessionnaires d'Électrification Rurale (CER) */}
                  <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase mb-3">
                        Électrification Rurale
                      </span>
                      <h4 className="text-[19px] font-bold text-slate-900 leading-snug">
                        Concessionnaires d'Électrification Rurale (CER)
                      </h4>
                      <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                        Opérateurs privés chargés de l’électrification des zones non interconnectées (ERA, COMASEL, etc.). (CER)
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Button asChild size="sm" className="w-full rounded-full bg-chathams-blue text-white hover:bg-chathams-blue/90 gap-1.5">
                        <Link to="/electricite/concessionnaires-ruraux">
                          <span>En savoir plus</span>
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* 5. Concessionnaires d’Electrification Rurale Décentralisée (CERD) */}
                  <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold uppercase mb-3">
                        Mini-Réseaux & Hors-Réseau
                      </span>
                      <h4 className="text-[19px] font-bold text-slate-900 leading-snug">
                        Concessionnaires d’Electrification Rurale Décentralisée (CERD)
                      </h4>
                      <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                        Opérateurs privés chargés de l’exploitation des zones rurales à partir de mini réseaux ou de systèmes électriques individuels.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Button asChild size="sm" className="w-full rounded-full bg-chathams-blue text-white hover:bg-chathams-blue/90 gap-1.5">
                        <Link to="/electricite/concessionnaires-decentralises">
                          <span>En savoir plus</span>
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CHIFFRES CLÉS DU SECTEUR ÉLECTRICITÉ */}
            <div id="electricite-key-figures" className="scroll-mt-36 rounded-3xl bg-gradient-to-br from-chathams-blue via-slate-900 to-chathams-blue p-8 sm:p-12 text-white shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Indicateurs 2024</span>
                  <h3 className="text-[26px] sm:text-[32px] font-extrabold text-white">
                    Quelques Chiffres Clés du Secteur en 2024
                  </h3>
                </div>
                <Link
                  to="/documents?cats=rapports&secteur=electricite"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[13px] font-bold backdrop-blur-sm border border-white/15 transition-all"
                >
                  <FileText size={16} />
                  <span>Consulter le rapport annuel</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[13px] text-blue-200 block">Puissance installée</span>
                  <span className="text-[34px] sm:text-[40px] font-black text-amber-300 block mt-1">1 903,5 MW</span>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[13px] text-blue-200 block">Part des énergies renouvelables</span>
                  <span className="text-[34px] sm:text-[40px] font-black text-shakespeare block mt-1">29,32 %</span>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[13px] text-blue-200 block">Production totale</span>
                  <span className="text-[34px] sm:text-[40px] font-black text-emerald-400 block mt-1">7 464,88 GWh</span>
                </div>
              </div>

              <div className="mt-7 flex justify-center">
                <Button type="button" onClick={() => setFiguresModal('electricite')} className="rounded-xl bg-white px-6 py-3 font-bold text-chathams-blue hover:bg-blue-50">
                  En savoir plus sur les chiffres clés
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            {/* TARIFICATION ET ACCÈS AUX DOCUMENTS */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-[20px] font-bold text-slate-900">Grilles Tarifaires de l'Électricité</h4>
                <p className="text-[14px] text-slate-600 mt-1 max-w-2xl">
                  Retrouvez les barèmes officiels approuvés par la CRSE pour les clients domestiques, professionnels, industriels et l'éclairage public.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/documents?cats=grilles&secteur=electricite"
                  className="px-5 py-3 rounded-xl bg-chathams-blue text-white text-[14px] font-bold hover:bg-blue-900 transition-colors shadow-sm"
                >
                  Voir les grilles tarifaires
                </Link>
                <Link
                  to="/consommateurs/guide"
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-[14px] font-bold hover:bg-slate-200 transition-colors"
                >
                  Guide du consommateur
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 2 : AVAL HYDROCARBURES */}
        {/* ========================================================================= */}
        {activeTab === 'hydrocarbures' && (
          <div className="space-y-16 animate-fade-in">
            {/* Présentation générale */}
            <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-md border border-slate-200">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[12px] font-bold text-chathams-blue mb-4">
                <Fuel size={16} />
                <span>Régulation de l'Aval Pétrolier</span>
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-slate-900 leading-snug">
                Aval des Hydrocarbures
              </h2>
              <p className="mt-4 text-[16px] sm:text-[17px] text-slate-600 leading-relaxed max-w-4xl">
                La CRSE régule les activités de l’aval hydrocarbures pour assurer un approvisionnement correct du pays en produits pétroliers. Cette rubrique détaille le cadre opératoire pour les acteurs (raffinage, stockage, distribution, importation, transport et commercialisation).
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-1"><Link to="/hydrocarbures/acteurs" className="hover:text-shakespeare">Présentation des acteurs <ArrowRight size={14} className="ml-1 inline" /></Link></h3>
                  <p className="text-[13px] text-slate-600">
                    Cartographie des acteurs (raffineur, importateurs/distributeurs, stockistes, infrastructures).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-1">Cadre réglementaire</h3>
                  <p className="text-[13px] text-slate-600">
                    Textes législatifs et obligations spécifiques au secteur aval des hydrocarbures.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-1">Données sectorielles</h3>
                  <p className="text-[13px] text-slate-600">
                    Statistiques annuelles, chiffres clés et rapports techniques de suivi des flux.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-1">Structure des prix</h3>
                  <p className="text-[13px] text-slate-600">
                    Décomposition transparente et barèmes des hydrocarbures raffinés (Super, Gasoil, Lampant, GPL).
                  </p>
                </div>
              </div>
            </div>

            {/* CARTOGRAPHIE DES ACTEURS HYDROCARBURES */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Chaîne de Valeur Pétrolière</span>
                  <h3 className="text-[26px] sm:text-[30px] font-bold text-slate-900">
                    Acteurs & Activités Régulées de l'Aval
                  </h3>
                  <p className="text-[14px] text-slate-500 mt-1">
                    Les segments industriels et logistiques surveillés par la CRSE.
                  </p>
                </div>
                <a
                  href="#hydrocarbon-price-pdf"
                  className="inline-flex items-center gap-2 text-[14px] font-bold text-chathams-blue hover:text-shakespeare"
                >
                  <span>Structures des prix mensuelles</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="mb-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setHydroActorsTab('institutionnels')}
                aria-pressed={hydroActorsTab === 'institutionnels'}
                className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-[14px] font-bold transition-all shadow-sm ${
                  hydroActorsTab === 'institutionnels'
                    ? 'bg-chathams-blue text-white shadow-md ring-2 ring-chathams-blue'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Building2 size={18} />
                Les acteurs institutionnels
              </button>
              <button
                type="button"
                onClick={() => setHydroActorsTab('operationnels')}
                aria-pressed={hydroActorsTab === 'operationnels'}
                className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-[14px] font-bold transition-all shadow-sm ${
                  hydroActorsTab === 'operationnels'
                    ? 'bg-chathams-blue text-white shadow-md ring-2 ring-chathams-blue'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Fuel size={18} />
                Les acteurs opérationnels
              </button>
              </div>

              {hydroActorsTab === 'institutionnels' ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-24 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <img
                      src="https://www.crse.sn/wp-content/uploads/2026/03/MINISTeRE-DE-LeNERGIE-DU-PETROLE.png"
                      alt="Ministère de l’Énergie, du Pétrole et des Mines"
                      className="max-h-16 w-auto object-contain"
                    />
                  </div>
                  <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase text-chathams-blue">Tutelle gouvernementale</span>
                  <h4 className="text-[19px] font-bold leading-snug text-slate-900">Ministère de l’Énergie, du Pétrole et des Mines</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">Définit la politique nationale des hydrocarbures et assure la tutelle administrative du secteur.</p>
                  <a href="https://energie-mines.gouv.sn/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-chathams-blue hover:text-shakespeare">
                    Site officiel <ExternalLink size={15} />
                  </a>
                </article>
                <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-24 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <img src="https://www.crse.sn/wp-content/uploads/2025/12/favicon_crse.jpg" alt="CRSE" className="max-h-16 w-auto rounded-lg object-contain" />
                  </div>
                  <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase text-chathams-blue">Autorité indépendante</span>
                  <h4 className="text-[19px] font-bold leading-snug text-slate-900">Commission de Régulation du Secteur de l’Énergie (CRSE)</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">Régule le secteur aval des hydrocarbures, veille à la transparence des prix et au respect des obligations applicables aux opérateurs.</p>
                  <Link to="/presentation" className="mt-5 inline-flex items-center gap-2 font-bold text-chathams-blue hover:text-shakespeare">
                    Présentation de la CRSE <ArrowRight size={15} />
                  </Link>
                </article>
              </div>
              ) : (
              <div>
                <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <label htmlFor="hydrocarbon-operator-search" className="mb-2 block text-sm font-bold text-slate-800">Rechercher un opérateur ou une adresse</label>
                  <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="hydrocarbon-operator-search"
                      value={operatorSearch}
                      onChange={(event) => setOperatorSearch(event.target.value)}
                      placeholder="Ex. TotalEnergies, Thiès, stockage…"
                      className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-chathams-blue focus:ring-2 focus:ring-chathams-blue/20"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {operatorFilters.map((filter) => {
                      const count = filter.value === 'TOUS'
                        ? hydrocarbonOperators.length
                        : hydrocarbonOperators.filter((operator) => operator.activity === filter.value).length
                      return (
                        <button
                          key={filter.value}
                          type="button"
                          onClick={() => setOperatorFilter(filter.value)}
                          aria-pressed={operatorFilter === filter.value}
                          className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                            operatorFilter === filter.value
                              ? 'bg-chathams-blue text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {filter.label} ({count})
                        </button>
                      )
                    })}
                  </div>
                  <p className="mt-4 text-sm text-slate-500">{visibleOperators.length} opérateur(s) affiché(s) sur {hydrocarbonOperators.length} fiches du répertoire fourni.</p>
                </div>
                {visibleOperators.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {visibleOperators.map((operator, index) => (
                      <article key={`${operator.activity}-${operator.name}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-chathams-blue">{operator.activity}</span>
                        <h4 className="mt-3 text-base font-bold leading-snug text-slate-900">{operator.name}</h4>
                        <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                          <MapPin size={16} className="mt-0.5 shrink-0 text-shakespeare" />
                          {operator.address}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">Aucun opérateur ne correspond à cette recherche.</p>
                )}
              </div>
              )}
            </div>

            <section aria-labelledby="hydrocarbon-key-figures" className="scroll-mt-36 rounded-3xl bg-gradient-to-br from-chathams-blue via-slate-900 to-chathams-blue p-8 text-white shadow-xl sm:p-12">
              <div className="mb-8 border-b border-white/10 pb-6">
              <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Indicateurs 2024</span>
              <h3 id="hydrocarbon-key-figures" className="mt-1 text-[26px] font-extrabold text-white sm:text-[32px]">Quelques chiffres clés du secteur en 2024</h3>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="block text-sm text-blue-200">Tonnes de produits raffinés</span>
                <strong className="mt-2 block text-3xl font-black text-amber-300 sm:text-4xl">1 257 482</strong>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="block text-sm text-blue-200">Tonnes de produits consommés sur le marché intérieur</span>
                <strong className="mt-2 block text-3xl font-black text-shakespeare sm:text-4xl">3 554 022</strong>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="block text-sm text-blue-200">m³ de capacité de stockage (produits pétroliers et gaz butane)</span>
                <strong className="mt-2 block text-3xl font-black text-white sm:text-4xl">487 227</strong>
              </div>
              </div>
              <div className="mt-7 flex justify-center">
                <Button type="button" onClick={() => setFiguresModal('hydrocarbures')} className="rounded-xl bg-white px-6 py-3 font-bold text-chathams-blue hover:bg-blue-50">
                  En savoir plus sur les chiffres clés
                  <ArrowRight size={16} />
                </Button>
              </div>
            </section>

            {/* STRUCTURE DES PRIX : PDF ORIGINAL CONSULTABLE */}
            <div id="hydrocarbon-price-pdf" className="scroll-mt-32 rounded-3xl bg-gradient-to-br from-chathams-blue to-slate-900 p-8 sm:p-12 text-white shadow-xl">
              <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-3xl">
              <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Transparence Tarifaire</span>
              <h3 className="text-[26px] sm:text-[32px] font-bold text-white mt-1">
                Structure des Prix des Hydrocarbures Raffinés
                </h3>
                <p className="text-[15px] text-blue-100 mt-3 leading-relaxed">
                  La CRSE calcule et vérifie scrupuleusement les composantes des barèmes des prix : cours international FOB, fret maritime, droits de douane, péréquation transport, marges de passage, marge de distribution et marge des gérants de station.
                </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="https://www.crse.sn/wp-content/uploads/2026/10/Structure-des-prix-des-produits-petroliers-a-compter-du-10-octobre-2026-1-1.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-shakespeare px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-shakespeare/90">
                    <ExternalLink size={16} /> Ouvrir le PDF
                  </a>
                  <a href="https://www.crse.sn/wp-content/uploads/2026/10/Structure-des-prix-des-produits-petroliers-a-compter-du-10-octobre-2026-1-1.pdf" download className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20">
                    <Download size={16} /> Télécharger
                  </a>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white">
                <iframe
                  title="PDF original de la structure des prix des produits pétroliers"
                  src="https://www.crse.sn/wp-content/uploads/2026/10/Structure-des-prix-des-produits-petroliers-a-compter-du-10-octobre-2026-1-1.pdf#toolbar=1&navpanes=0&view=FitH"
                  className="h-[620px] w-full bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 3 : AVAL & INTERMÉDIAIRE GAZIERS */}
        {/* ========================================================================= */}
        {activeTab === 'gaz' && (
          <div className="space-y-16 animate-fade-in">
            {/* Présentation générale */}
            <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-md border border-slate-200">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-[12px] font-bold text-orange-700 mb-4">
                <Flame size={16} />
                <span>Nouvelle Économie Gazière (GTA & Yakaar-Teranga)</span>
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-slate-900 leading-snug">
                Aval & Intermédiaire Gaziers
              </h2>
              <p className="mt-4 text-[16px] sm:text-[17px] text-slate-600 leading-relaxed max-w-4xl">
                Avec l’émergence de l’économie gazière et les découvertes offshore de classe mondiale, la régulation du segment intermédiaire et aval est cruciale pour alimenter les centrales « Gas-to-Power », décarboner l'industrie et valoriser la ressource locale.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white mb-3">
                    <Building size={20} />
                  </div>
                  <h3 className="text-[17px] font-bold text-slate-900"><Link to="/gaz/acteurs" className="hover:text-shakespeare">Présentation des acteurs <ArrowRight size={14} className="ml-1 inline" /></Link></h3>
                  <p className="text-[14px] text-slate-600 mt-2">
                    Vue d’ensemble des acteurs en présence : transporteurs par gazoduc, gestionnaires de réseau gazier, distributeurs et clients industriels.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chathams-blue text-white mb-3">
                    <Scale size={20} />
                  </div>
                  <h3 className="text-[17px] font-bold text-slate-900">Cadre réglementaire & Codes de Réseau</h3>
                  <p className="text-[14px] text-slate-600 mt-2">
                    Lois gazières, décrets d'application, règles d'accès des tiers non discriminatoire (ATR) et codes de réseaux applicables aux infrastructures.
                  </p>
                </div>
              </div>
            </div>

            {/* ACTEURS DU SEGMENT GAZIER */}
            <div>
              <div className="mb-8">
                <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Infrastructures Gazières</span>
                <h3 className="text-[26px] sm:text-[30px] font-bold text-slate-900">
                  Acteurs Clés du Réseau Gazier National
                </h3>
              </div>

              <div className="mb-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setGasActorsTab('institutionnels')}
                  aria-pressed={gasActorsTab === 'institutionnels'}
                  className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-[14px] font-bold transition-all shadow-sm ${
                    gasActorsTab === 'institutionnels'
                      ? 'bg-chathams-blue text-white shadow-md ring-2 ring-chathams-blue'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Building2 size={18} />
                  Les acteurs institutionnels
                </button>
                <button
                  type="button"
                  onClick={() => setGasActorsTab('operationnels')}
                  aria-pressed={gasActorsTab === 'operationnels'}
                  className={`flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-[14px] font-bold transition-all shadow-sm ${
                    gasActorsTab === 'operationnels'
                      ? 'bg-chathams-blue text-white shadow-md ring-2 ring-chathams-blue'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Flame size={18} />
                  Les acteurs opérationnels
                </button>
              </div>

              {gasActorsTab === 'institutionnels' ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="mb-5 flex h-24 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <img
                        src="https://www.crse.sn/wp-content/uploads/2026/03/MINISTeRE-DE-LeNERGIE-DU-PETROLE.png"
                        alt="Ministère de l’Énergie, du Pétrole et des Mines"
                        className="max-h-16 w-auto object-contain"
                      />
                    </div>
                    <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase text-chathams-blue">Tutelle gouvernementale</span>
                    <h4 className="text-[19px] font-bold leading-snug text-slate-900">Ministère de l’Énergie, du Pétrole et des Mines</h4>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">Définit la politique nationale du gaz et le cadre de développement des segments intermédiaire et aval.</p>
                    <a href="https://energie-mines.gouv.sn/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-chathams-blue hover:text-shakespeare">
                      Site officiel <ExternalLink size={15} />
                    </a>
                  </article>
                  <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="mb-5 flex h-24 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <img src="https://www.crse.sn/wp-content/uploads/2025/12/favicon_crse.jpg" alt="CRSE" className="max-h-16 w-auto rounded-lg object-contain" />
                    </div>
                    <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase text-chathams-blue">Autorité indépendante</span>
                    <h4 className="text-[19px] font-bold leading-snug text-slate-900">Commission de Régulation du Secteur de l’Énergie (CRSE)</h4>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">Régule les activités des segments aval et intermédiaire gaziers et veille à l’application des règles d’accès et de fonctionnement des infrastructures.</p>
                    <Link to="/presentation" className="mt-5 inline-flex items-center gap-2 font-bold text-chathams-blue hover:text-shakespeare">
                      Présentation de la CRSE <ArrowRight size={15} />
                    </Link>
                  </article>
                  {[
                    {
                      name: 'Réseau Gazier du Sénégal SA',
                      role: 'Transport gazier',
                      logo: 'https://www.crse.sn/wp-content/uploads/2026/03/logo-RGS-.png',
                      href: 'https://rgs.sn/',
                      linkLabel: 'Visiter le site officiel',
                      description: 'Société chargée du développement et de l’exploitation du réseau gazier national.',
                    },
                    {
                      name: 'ELTON LOGISTICS & SERVICES SA',
                      role: 'Logistique gazière',
                      logo: 'https://www.crse.sn/wp-content/uploads/2026/03/logo-elton-.png',
                      href: 'https://www.crse.sn/secteurs/aval-intermediaire-gazier/',
                      linkLabel: 'Voir la référence CRSE',
                      description: 'Acteur logistique intervenant dans la chaîne d’approvisionnement et de transport des ressources énergétiques.',
                    },
                    {
                      name: 'Senelec Agrégateur',
                      role: 'Agrégation et fourniture',
                      logo: 'https://www.crse.sn/wp-content/uploads/2026/03/logo-senelec.png',
                      href: 'https://www.senelec.sn/',
                      linkLabel: 'Visiter le site officiel',
                      description: 'Agrégateur du secteur gazier, en lien avec l’approvisionnement des centrales électriques.',
                    },
                  ].map((actor) => (
                    <article key={actor.name} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                      <a
                        href={actor.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${actor.linkLabel} : ${actor.name}`}
                        className="mb-5 flex h-24 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chathams-blue"
                      >
                        <img src={actor.logo} alt={`Logo ${actor.name}`} loading="lazy" className="max-h-16 w-full object-contain" />
                      </a>
                      <span className="mb-2 inline-block self-start rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase text-orange-700">{actor.role}</span>
                      <h4 className="text-[19px] font-bold leading-snug text-slate-900">{actor.name}</h4>
                      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate-600">{actor.description}</p>
                      <a href={actor.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 font-bold text-chathams-blue hover:text-shakespeare">
                        {actor.linkLabel} <ExternalLink size={15} />
                      </a>
                    </article>
                  ))}
                </div>
              ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[11px] font-bold uppercase mb-3">
                    Transporteur National
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/gaz/acteurs#rgs" className="hover:text-shakespeare">Réseau Gazier du Sénégal (RGS SA)</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Entité dédiée au développement, au financement, à la construction et à l’exploitation du réseau national de gazoducs pour transporter le gaz naturel vers les centrales électriques et les pôles industriels.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-chathams-blue text-[11px] font-bold uppercase mb-3">
                    Gas-to-Power
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/gaz/acteurs#centrales-gaz" className="hover:text-shakespeare">Centrales Électriques Utilisatrices</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Centrales de Senelec et IPP (ex. Malicounda, Cap des Biches) converties au gaz naturel pour réduire les coûts de production du kWh et diminuer l’empreinte carbone nationale.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase mb-3">
                    Utilisateurs Industriels & GNV
                  </span>
                  <h4 className="text-[18px] font-bold text-slate-900"><Link to="/gaz/acteurs#clients-industriels" className="hover:text-shakespeare">Industries & Mobilité Propre</Link></h4>
                  <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                    Cimenteries, industries chimiques, minières et développement futur du Gaz Naturel Véhicule (GNV) pour les transports lourds et urbains.
                  </p>
                </div>
              </div>
              )}
            </div>

            <section id="gas-key-figures" aria-labelledby="gas-key-figures-title" className="scroll-mt-36 rounded-3xl bg-gradient-to-br from-chathams-blue via-slate-900 to-chathams-blue p-8 text-white shadow-xl sm:p-12">
              <div className="mb-8 border-b border-white/10 pb-6">
                <span className="text-[12px] font-bold uppercase tracking-wider text-shakespeare">Données sectorielles</span>
                <h3 id="gas-key-figures-title" className="mt-1 text-[26px] font-extrabold text-white sm:text-[32px]">Quelques chiffres clés du secteur gazier</h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-base font-semibold text-white">Les chiffres clés officiels ne sont pas publiés sur la page source du secteur gazier.</p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-blue-100">
                  Pour éviter d’afficher des estimations non vérifiées, les données de production, de transport et de consommation seront ajoutées dès leur publication par la CRSE.
                </p>
                <a href="https://www.crse.sn/secteurs/aval-intermediaire-gazier/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-blue-100 underline underline-offset-2 hover:text-white">
                  Consulter la page source de la CRSE
                </a>
                <Link to="/documents?cats=rapports&secteur=gaz" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20">
                  <FileText size={16} /> Consulter les rapports du secteur
                </Link>
              </div>
            </section>

            {/* CADRE LÉGISLATIF ET DOCUMENTS */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-[20px] font-bold text-slate-900">Cadre Légal & Réglementaire du Gaz</h4>
                <p className="text-[14px] text-slate-600 mt-1 max-w-2xl">
                  Consultez la loi n° 2020-06 portant Code Gazier, les décrets d'application et les décisions relatives aux tarifs de transport gazier.
                </p>
              </div>
              <Link
                to="/documents?cats=textes&secteur=gaz"
                className="px-6 py-3 rounded-xl bg-chathams-blue text-white text-[14px] font-bold hover:bg-blue-900 transition-colors shadow-sm shrink-0"
              >
                Consulter les textes légaux
              </Link>
            </div>
          </div>
        )}
      </main>
      <DocumentsSection sector={activeTab} />
      {figuresModal && <SectorFiguresModal sector={figuresModal} onClose={closeFiguresModal} />}
    </div>
  )
}
