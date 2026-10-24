import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap,
  Fuel,
  Flame,
  Search,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  BookOpen
} from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'

interface Operator {
  id: string
  name: string
  sector: 'electricite' | 'hydrocarbures' | 'gaz'
  category: string
  description: string
  status: 'Opérationnel' | 'Licencié' | 'Concessionnaire'
  website?: string
}

const operatorsList: Operator[] = [
  // Électricité
  {
    id: 'senelec',
    name: 'Senelec',
    sector: 'electricite',
    category: 'Opérateur Historique Intégré',
    description: 'Production thermique et renouvelable, gestionnaire exclusif du réseau de transport, distribution et commercialisation de l’électricité sur le réseau interconnecté.',
    status: 'Opérationnel',
    website: 'https://www.senelec.sn'
  },
  {
    id: 'contour-global',
    name: 'ContourGlobal (Centrale du Cap des Biches)',
    sector: 'electricite',
    category: 'Producteur Privé Indépendant (IPP)',
    description: 'Exploitation d’une centrale thermique tri-fuel de 86 MW avec contrat d’achat d’énergie (PPA) à long terme.',
    status: 'Opérationnel'
  },
  {
    id: 'malicounda-power',
    name: 'Malicounda Power SAS',
    sector: 'electricite',
    category: 'Producteur Privé Indépendant (IPP)',
    description: 'Centrale thermique moderne de 120 MW convertible au gaz naturel local (« Gas-to-Power »).',
    status: 'Opérationnel'
  },
  {
    id: 'taiba-ndiaye-wind',
    name: 'Parc Éolien de Taïba N’Diaye (PETN)',
    sector: 'electricite',
    category: 'Producteur Privé Indépendant (IPP)',
    description: 'Premier grand parc éolien d’Afrique de l’Ouest avec une capacité installée de 158,7 MW injectée sur le réseau interconnecté.',
    status: 'Opérationnel'
  },
  {
    id: 'senergy-solar',
    name: 'Senergy & Senergy II (Santhiou Mékhé & Bokhol)',
    sector: 'electricite',
    category: 'Producteur Privé Indépendant (IPP)',
    description: 'Grandes centrales solaires photovoltaïques injectant de l’énergie renouvelable dans le réseau de transport national.',
    status: 'Opérationnel'
  },
  {
    id: 'comasel',
    name: 'COMASEL (Compagnie Mauritanienne-Sénégalaise d’Électricité)',
    sector: 'electricite',
    category: 'Concessionnaire d’Électrification Rurale (CER)',
    description: 'Opérateur privé titulaire de la concession d’électrification rurale de la zone de Louga-Kébémer-Linguère et Saint-Louis-Dagana-Podor.',
    status: 'Concessionnaire'
  },
  {
    id: 'era',
    name: 'ERA (Énergie Rurale Africaine)',
    sector: 'electricite',
    category: 'Concessionnaire d’Électrification Rurale (CER)',
    description: 'Concessionnaire pour les départements de Kaffrine, Tambacounda et Kédougou pour le raccordement et l’accès au réseau des localités rurales.',
    status: 'Concessionnaire'
  },
  {
    id: 'auto-producteurs',
    name: 'Auto-producteurs Industriels et Miniers',
    sector: 'electricite',
    category: 'Auto-production',
    description: 'Industries (Cimenteries SOCOCIM/Dangote, ICS, Sabodala Gold) produisant leur électricité pour leurs besoins propres et autorisées à injecter l’excédent.',
    status: 'Licencié'
  },

  // Hydrocarbures
  {
    id: 'sar',
    name: 'Société Africaine de Raffinage (SAR)',
    sector: 'hydrocarbures',
    category: 'Raffinerie Nationale',
    description: 'Traitement du pétrole brut, fabrication de produits raffinés et gestion des capacités nationales de raffinage.',
    status: 'Opérationnel',
    website: 'https://www.sar.sn'
  },
  {
    id: 'senstock',
    name: 'SENSTOCK SA',
    sector: 'hydrocarbures',
    category: 'Stockage & Logistique Pétrolière',
    description: 'Plus grand terminal de stockage pétrolier du Sénégal connecté au port de Dakar et approvisionnant le marché intérieur et le Mali.',
    status: 'Opérationnel'
  },
  {
    id: 'elton-logistics',
    name: 'ELTON LOGISTICS & SERVICES SA',
    sector: 'hydrocarbures',
    category: 'Logistique, Transport & Dépôt',
    description: 'Opérateur logistique agréé pour le transport, l’entreposage et la gestion des flux de produits pétroliers.',
    status: 'Opérationnel'
  },
  {
    id: 'totalenergies',
    name: 'TotalEnergies Marketing Sénégal',
    sector: 'hydrocarbures',
    category: 'Distribution & Réseau de Stations',
    description: 'Distribution de carburants, lubrifiants, bitumes et gaz butane à travers le réseau de stations-service national.',
    status: 'Opérationnel'
  },
  {
    id: 'vivo-energy',
    name: 'Vivo Energy Sénégal (Réseau Shell)',
    sector: 'hydrocarbures',
    category: 'Distribution & Réseau de Stations',
    description: 'Distribution de carburants et carburants d’aviation pour les compagnies aériennes et les particuliers.',
    status: 'Opérationnel'
  },
  {
    id: 'ola-energy',
    name: 'OLA Energy Sénégal',
    sector: 'hydrocarbures',
    category: 'Distribution Pétrolière',
    description: 'Commercialisation de produits pétroliers finis, approvisionnement de la marine et des industries.',
    status: 'Opérationnel'
  },
  {
    id: 'star-oil',
    name: 'Star Oil Sénégal',
    sector: 'hydrocarbures',
    category: 'Distribution Pétrolière',
    description: 'Réseau de distribution de carburants et services de proximité aux usagers de la route.',
    status: 'Opérationnel'
  },
  {
    id: 'touba-oil',
    name: 'Touba Oil',
    sector: 'hydrocarbures',
    category: 'Distribution Nationale',
    description: 'Acteur national indépendant de distribution de carburants et de gaz domestique.',
    status: 'Opérationnel'
  },

  // Gazier
  {
    id: 'rgs',
    name: 'Réseau Gazier du Sénégal (RGS SA)',
    sector: 'gaz',
    category: 'Gestionnaire du Réseau de Transport Gazier',
    description: 'Société chargée de la conception, de la construction, du financement et de l’exploitation des gazoducs pour acheminer le gaz naturel vers les centrales électriques et les industries.',
    status: 'Opérationnel'
  },
  {
    id: 'petrosen-aval',
    name: 'PETROSEN Aval',
    sector: 'gaz',
    category: 'Opérateur Public Aval & Gazier',
    description: 'Filiale du groupe national PETROSEN chargée de la valorisation du gaz naturel sur le marché domestique et de la pétrochimie.',
    status: 'Opérationnel'
  }
]

export function OperateursMarchePage() {
  const [selectedSector, setSelectedSector] = useState<'all' | 'electricite' | 'hydrocarbures' | 'gaz'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOperators = operatorsList.filter((op) => {
    const matchSector = selectedSector === 'all' || op.sector === selectedSector
    const term = searchTerm.toLowerCase()
    const matchSearch =
      op.name.toLowerCase().includes(term) ||
      op.category.toLowerCase().includes(term) ||
      op.description.toLowerCase().includes(term)
    return matchSector && matchSearch
  })

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* 1. HERO BANNER UNIFORME AVEC BREADCRUMB */}
      <PageBanner
        eyebrow="Opérateurs"
        title="Opérateurs sur les Marchés"
        description="Registre officiel des acteurs et opérateurs économiques régulés par la CRSE intervenant sur les segments de l’électricité, des hydrocarbures et du gaz."
      />

      {/* 2. CADRE DE RÉGULATION & LIVRET DE L'INVESTISSEUR */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[12px] font-bold text-chathams-blue mb-3">
                <ShieldCheck size={16} />
                <span>Accréditation & Conformité</span>
              </div>
              <h2 className="text-[26px] sm:text-[32px] font-extrabold text-slate-900 leading-snug">
                Cadre Opératoire & Obligations des Opérateurs
              </h2>
              <p className="mt-3 text-[16px] text-slate-600 leading-relaxed">
                Toute activité de production, transport, stockage, distribution ou commercialisation dans le secteur de l’énergie est soumise à l’obtention d’un titre d’exercice (licence, concession ou autorisation). La CRSE contrôle la conformité des installations, l'exécution des contrats de performance et la stricte application des barèmes approuvés.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                to="/livret-de-linvestisseur"
                className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 hover:bg-amber-100 transition-colors shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold">Livret de l'Investisseur</h4>
                  <p className="text-[12px] text-amber-800">Feuilleter le guide d'investissement 3D</p>
                </div>
              </Link>

              <Link
                to="/documents?cats=lois%2Cdecrets%2Carretes"
                className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-chathams-blue hover:bg-blue-100 transition-colors shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chathams-blue text-white">
                  <FileCheck size={20} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold">Textes & Réglementation</h4>
                  <p className="text-[12px] text-blue-700">Consulter les décrets et arrêtés applicables</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LISTE ET FILTRES DES OPÉRATEURS */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          {/* Barre de commande et filtres */}
          <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            {/* Filtres par secteur */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedSector('all')}
                className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${
                  selectedSector === 'all'
                    ? 'bg-chathams-blue text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Tous les secteurs ({operatorsList.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedSector('electricite')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${
                  selectedSector === 'electricite'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Zap size={14} />
                <span>Électricité</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedSector('hydrocarbures')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${
                  selectedSector === 'hydrocarbures'
                    ? 'bg-shakespeare text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Fuel size={14} />
                <span>Aval Hydrocarbures</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedSector('gaz')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${
                  selectedSector === 'gaz'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Flame size={14} />
                <span>Gazier</span>
              </button>
            </div>

            {/* Champ de recherche */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un opérateur..."
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-[13px] text-slate-900 shadow-sm focus:border-chathams-blue focus:outline-none focus:ring-2 focus:ring-chathams-blue/20"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[12px] font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Grille des opérateurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOperators.map((op) => (
              <div
                key={op.id}
                className="group flex flex-col justify-between rounded-3xl bg-white p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-200/80 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
                        op.sector === 'electricite'
                          ? 'bg-amber-50 text-amber-800'
                          : op.sector === 'hydrocarbures'
                          ? 'bg-blue-50 text-chathams-blue'
                          : 'bg-orange-50 text-orange-800'
                      }`}
                    >
                      {op.category}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {op.status}
                    </span>
                  </div>

                  <h3 className="text-[18px] font-bold text-slate-900 group-hover:text-chathams-blue transition-colors">
                    {op.name}
                  </h3>

                  <p className="mt-3 text-[14px] text-slate-600 leading-relaxed">
                    {op.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px]">
                  <span className="text-slate-400">Régulé par la CRSE</span>
                  {op.website ? (
                    <a
                      href={op.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-shakespeare hover:underline"
                    >
                      <span>Site officiel</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-slate-400">Titre en vigueur</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
