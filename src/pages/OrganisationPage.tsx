import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Shield,
  Award,
  Building,
  Briefcase,
  FileText,
  ExternalLink,
  BookOpen,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react'
import { PurePdfFlipViewer } from '../components/shared/PurePdfFlipViewer'

interface OrgNodeData {
  id: string
  title: string
  subtitle?: string
  code?: string
  category: 'governance' | 'consultative' | 'direction' | 'support' | 'cellule'
  link?: string
  description?: string
  missions?: string[]
}

const orgNodes: OrgNodeData[] = [
  // Organes Décisionnaires & Gouvernance
  {
    id: 'conseil-regulation',
    title: 'Conseil de Régulation',
    subtitle: 'Organe délibérant et décisionnel',
    category: 'governance',
    description: 'Composé de membres nommés par décret présidentiel pour leur haute expertise juridique, économique et technique, le Conseil de Régulation prend les décisions réglementaires, tarifaires et stratégiques.',
    missions: [
      'Fixation et approbation des grilles tarifaires et méthodologies',
      'Attribution des licences, concessions et autorisations',
      'Veille au respect des obligations de service public',
      'Protection des droits des usagers et équilibre économique'
    ]
  },
  {
    id: 'crd',
    title: 'Comité de Règlement des Différends (CRD)',
    subtitle: 'Instance juridictionnelle administrative',
    category: 'governance',
    description: 'Instance indépendante chargée de trancher les litiges et différends nés entre opérateurs ou entre opérateurs et clients éligibles.',
    missions: [
      'Instruction des requêtes contentieuses entre acteurs',
      'Conciliation et médiation sectorielle',
      'Rend des décisions exécutoires et motivées'
    ]
  },
  {
    id: 'president',
    title: 'Président de la CRSE',
    subtitle: 'Représentation légale & Haute Direction',
    category: 'governance',
    link: '/mot-du-president',
    description: 'Le Président préside le Conseil de Régulation, ordonnance les dépenses et représente la CRSE dans tous les actes de la vie civile et auprès des autorités nationales et internationales.',
    missions: [
      'Représentation officielle et politique institutionnelle',
      'Impulsion des orientations stratégiques',
      'Relations institutionnelles et gouvernementales'
    ]
  },
  {
    id: 'secretaire-executif',
    title: 'Secrétariat Exécutif',
    subtitle: 'Coordination opérationnelle et administrative',
    category: 'governance',
    description: 'Assure la coordination des directions opérationnelles et d’appui, prépare les dossiers soumis au Conseil et assure l’exécution des décisions prises.',
    missions: [
      'Coordination globale des activités des directions',
      'Suivi de la mise en œuvre des délibérations du Conseil',
      'Gestion administrative et prospective'
    ]
  },

  // Comités Consultatifs
  {
    id: 'comite-admin',
    title: 'Comité Consultatif des Administrations',
    subtitle: 'Représentation des ministères & entités publiques',
    category: 'consultative',
    description: 'Permet une concertation permanente avec les ministères techniques (Énergie, Économie, Finances, Environnement) et les structures publiques associées.'
  },
  {
    id: 'comite-conso',
    title: 'Comité Consultatif des Consommateurs',
    subtitle: 'Défense des usagers & dialogue citoyen',
    category: 'consultative',
    link: '/consommateurs/associations',
    description: 'Regroupe les associations de consommateurs reconnues pour émettre des avis sur les tarifs, la qualité du service et la protection des droits des usagers.'
  },
  {
    id: 'comite-operateurs',
    title: 'Comité Consultatif des Opérateurs',
    subtitle: 'Concertation avec les acteurs industriels',
    category: 'consultative',
    description: 'Espace de dialogue réunissant les opérateurs agréés de l’électricité, des hydrocarbures et du gaz pour discuter des évolutions réglementaires et du cadre d’investissement.'
  },

  // Départements et Cellules d'Appui rattachés
  {
    id: 'dept-com',
    title: 'Département Communication, Relations Publiques & Coopération Int.',
    category: 'support',
    description: 'Pilote la communication institutionnelle, la transparence médiatique, les relations presse et la coopération avec les régulateurs régionaux et internationaux (AER, ERERA, MEDREG).'
  },
  {
    id: 'dept-audit',
    title: 'Département Audit Interne',
    category: 'support',
    description: 'Veille à la conformité des procédures, à l’efficacité du contrôle interne, à l’éthique et au management des risques opérationnels.'
  },
  {
    id: 'dept-si',
    title: 'Département Système d’Information',
    category: 'support',
    description: 'Assure la transformation numérique, la sécurité informatique, la gestion des bases de données de régulation et les portails d’accès en ligne.'
  },
  {
    id: 'dept-etudes',
    title: 'Département Études Générales et Suivi',
    category: 'support',
    description: 'Réalise les études prospectives, les modèles d’analyse de la demande et le suivi des indicateurs macroéconomiques du secteur énergétique.'
  },
  {
    id: 'cellule-marches',
    title: 'Cellule Passation de Marchés',
    category: 'cellule',
    description: 'Garantit la stricte application du code des marchés publics sénégalais pour l’ensemble des acquisitions de biens et services de la Commission.'
  },
  {
    id: 'controle-gestion',
    title: 'Contrôleur de Gestion',
    category: 'cellule',
    description: 'Élabore les tableaux de bord stratégiques, mesure la performance des processus internes et optimise l’allocation des ressources budgétaires.'
  },

  // Les 6 Directions Opérationnelles
  {
    id: 'dcons',
    title: 'Direction Consommateurs',
    code: 'DCONS',
    category: 'direction',
    link: '/reclamations',
    description: 'En première ligne pour le traitement des réclamations des usagers, la surveillance de la qualité de service fournie par les opérateurs et l’éducation des consommateurs.',
    missions: ['Instruction des réclamations', 'Contrôle des normes de service', 'Information et sensibilisation des usagers']
  },
  {
    id: 'del',
    title: 'Direction Électricité',
    code: 'DEL',
    category: 'direction',
    link: '/secteurs',
    description: 'Supervise la production, le transport, la distribution et l’électrification rurale, ainsi que l’intégration progressive des énergies renouvelables.',
    missions: ['Suivi technique des concessionnaires', 'Accès aux réseaux tiers', 'Sécurité d’approvisionnement électrique']
  },
  {
    id: 'dhcg',
    title: 'Direction Hydrocarbures et Gaz',
    code: 'DHCG',
    category: 'direction',
    link: '/secteurs',
    description: 'Régule l’aval pétrolier et gazier : importation, raffinage, stockage, distribution des carburants, GPL et réseau gazier national.',
    missions: ['Suivi des quotas et approvisionnements', 'Contrôle des infrastructures de stockage', 'Encadrement du secteur gazier intermédiaire']
  },
  {
    id: 'daj',
    title: 'Direction Affaires Juridiques',
    code: 'DAJ',
    category: 'direction',
    link: '/documents?cats=textes',
    description: 'Sécurise juridiquement l’ensemble des actes de la CRSE, instruit les demandes de licence et de concession, et assure la veille réglementaire.',
    missions: ['Rédaction des décisions et règlements', 'Instruction juridique des licences', 'Appui contentieux et conseil institutionnel']
  },
  {
    id: 'dre',
    title: 'Direction de la Régulation Économique',
    code: 'DRE',
    category: 'direction',
    link: '/electricite/grilles-tarifaires',
    description: 'Développe les modèles économiques et financiers, calcule et révise les formules tarifaires et assure le contrôle financier des opérateurs.',
    missions: ['Calcul des revenus autorisés et des tarifs', 'Modélisation des structures de prix', 'Surveillance de la concurrence loyale']
  },
  {
    id: 'daf',
    title: 'Direction Administrative et Financière',
    code: 'DAF',
    category: 'direction',
    description: 'Gère le capital humain, l’élaboration et l’exécution du budget de la Commission, la logistique et le patrimoine de l’institution.',
    missions: ['Gestion des ressources humaines', 'Comptabilité et exécution budgétaire', 'Logistique et moyens généraux']
  }
]

export function OrganisationPage() {
  const [selectedNode, setSelectedNode] = useState<OrgNodeData | null>(null)
  const [activeTab, setActiveTab] = useState<'chart' | 'brochure'>('chart')

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* 1. HERO BANNER INSTITUTIONNELLE */}
      <section className="relative flex min-h-[220px] sm:min-h-[280px] w-full items-center bg-chathams-blue">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80")`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-chathams-blue via-chathams-blue/90 to-chathams-blue/70" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <div className="inline-block rounded-xl bg-white/10 px-8 py-3.5 shadow-xl backdrop-blur-md border border-white/20">
            <h1 className="text-[26px] sm:text-[34px] font-extrabold tracking-wider text-white uppercase">
              ORGANISATION & GOUVERNANCE
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-[15px] sm:text-[16px] text-blue-100 font-medium">
            Découvrez la structure institutionnelle, les instances décisionnelles et les directions spécialisées de la Commission.
          </p>
        </div>
      </section>

      {/* 2. TEXTE OFFICIEL D'INTRODUCTION */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[13px] font-bold text-chathams-blue mb-4">
              <Building size={16} />
              <span>Cadre Institutionnel</span>
            </div>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-slate-900 leading-snug">
              Composition de la Commission de Régulation
            </h2>
            <div className="mt-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-100 shadow-sm relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-shakespeare/10 pointer-events-none" />
              <p className="text-[17px] sm:text-[18px] text-slate-700 leading-relaxed font-normal">
                « La Commission de Régulation du Secteur de l’Energie est composée d’un <strong className="font-bold text-chathams-blue">Conseil de Régulation</strong>, d’un <strong className="font-bold text-chathams-blue">Secrétaire Exécutif</strong> et d’un <strong className="font-bold text-chathams-blue">Comité de Règlement des Différends</strong>, dont les membres sont nommés par décret pour leur expertise juridique, technique et économique. Elle est accompagnée par <strong className="font-bold text-shakespeare">3 comités consultatifs</strong>. »
              </p>
            </div>

            {/* Sélecteur de vue : Organigramme interactif ou Brochure Flipbook */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('chart')}
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-[14px] transition-all shadow-sm ${
                  activeTab === 'chart'
                    ? 'bg-chathams-blue text-white shadow-md shadow-chathams-blue/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Layers size={18} />
                <span>Organigramme Interactif</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('brochure')}
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-[14px] transition-all shadow-sm ${
                  activeTab === 'brochure'
                    ? 'bg-shakespeare text-white shadow-md shadow-shakespeare/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BookOpen size={18} />
                <span>Brochure Institutionnelle (Flipbook)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION PRINCIPALE : ORGANIGRAMME INTERACTIF SOUPLE ET MODERNE */}
      {activeTab === 'chart' && (
        <section className="py-16">
          <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
            {/* Header de section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
              <div>
                <span className="text-[12px] font-bold text-shakespeare tracking-wider uppercase">Architecture Fonctionnelle</span>
                <h3 className="text-[28px] sm:text-[34px] font-bold text-slate-900">
                  Organigramme Institutionnel de la CRSE
                </h3>
                <p className="text-[14px] sm:text-[15px] text-slate-500 mt-1">
                  Survolez ou cliquez sur les entités pour afficher les attributions et détails de gouvernance.
                </p>
              </div>

              {/* Légende interactive */}
              <div className="flex flex-wrap items-center gap-3 text-[12px] font-semibold text-slate-600">
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-chathams-blue" /> Organes de Décision</span>
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-amber-500" /> Comités Consultatifs</span>
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-teal-600" /> Départements d’Appui</span>
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-emerald-600" /> Cellules Spécialisées</span>
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-cyan-700" /> Directions Métiers</span>
              </div>
            </div>

            {/* GRAPHE ORGANIGRAMME MODERNISÉ */}
            <div className="relative rounded-3xl bg-white p-6 sm:p-12 shadow-xl border border-slate-200 overflow-hidden">
              {/* LIGNE 1 : HAUT NIVEAU - CONSEIL, CRD & LES 3 COMITÉS CONSULTATIFS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Gauche : Comité de Règlement des Différends (CRD) */}
                <div className="lg:col-span-3 flex flex-col justify-center">
                  <div
                    onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'crd') || null)}
                    className="cursor-pointer group relative p-5 rounded-2xl bg-gradient-to-br from-chathams-blue to-slate-900 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-400/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-blue-200">Contentieux</span>
                      <Shield size={16} className="text-shakespeare" />
                    </div>
                    <h4 className="text-[15px] font-bold leading-tight group-hover:text-shakespeare transition-colors">
                      Comité de Règlement des Différends (CRD)
                    </h4>
                    <p className="text-[12px] text-blue-100 mt-2">Instance indépendante de conciliation et arbitrage</p>
                  </div>
                </div>

                {/* Centre : Conseil de Régulation */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div
                    onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'conseil-regulation') || null)}
                    className="cursor-pointer group relative p-6 rounded-2xl bg-gradient-to-br from-chathams-blue via-blue-900 to-chathams-blue text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-shakespeare/40 text-center"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-shakespeare mb-2">
                      <Award size={14} />
                      <span>Organe Délibérant</span>
                    </div>
                    <h4 className="text-[18px] sm:text-[20px] font-extrabold tracking-wide group-hover:text-shakespeare transition-colors">
                      Conseil de Régulation
                    </h4>
                    <p className="text-[13px] text-blue-100 mt-1 max-w-sm mx-auto">
                      Membres nommés par décret • Pouvoir normatif et décisionnaire
                    </p>
                  </div>
                </div>

                {/* Droite : 3 Comités Consultatifs */}
                <div className="lg:col-span-4 flex flex-col justify-center gap-3">
                  <div className="text-[12px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5 px-1">
                    <Users size={14} />
                    <span>3 Comités Consultatifs Partenaires</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    <div
                      onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'comite-admin') || null)}
                      className="cursor-pointer p-3.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 text-slate-800 text-[13px] font-semibold transition-all hover:-translate-x-1 shadow-sm flex items-center justify-between"
                    >
                      <span>Comité consultatif des administrations</span>
                      <Info size={14} className="text-amber-600 opacity-60" />
                    </div>
                    <div
                      onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'comite-conso') || null)}
                      className="cursor-pointer p-3.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 text-slate-800 text-[13px] font-semibold transition-all hover:-translate-x-1 shadow-sm flex items-center justify-between"
                    >
                      <span>Comité consultatif des consommateurs</span>
                      <Info size={14} className="text-amber-600 opacity-60" />
                    </div>
                    <div
                      onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'comite-operateurs') || null)}
                      className="cursor-pointer p-3.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 text-slate-800 text-[13px] font-semibold transition-all hover:-translate-x-1 shadow-sm flex items-center justify-between"
                    >
                      <span>Comité consultatif des opérateurs</span>
                      <Info size={14} className="text-amber-600 opacity-60" />
                    </div>
                  </div>
                </div>
              </div>

              {/* CONNECTEUR CENTRAL VERTICAL */}
              <div className="relative my-6 flex justify-center items-center">
                <div className="h-10 w-0.5 bg-gradient-to-b from-chathams-blue to-shakespeare" />
              </div>

              {/* LIGNE 2 : PRÉSIDENT DE LA CRSE & ASSISTANT */}
              <div className="relative mx-auto max-w-2xl text-center">
                <div
                  onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'president') || null)}
                  className="cursor-pointer group relative p-6 rounded-2xl bg-gradient-to-r from-chathams-blue via-slate-900 to-chathams-blue text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-shakespeare/30"
                >
                  <div className="inline-block px-3 py-0.5 rounded-full bg-shakespeare/20 text-shakespeare text-[11px] font-bold uppercase mb-2">
                    Haute Autorité
                  </div>
                  <h4 className="text-[20px] sm:text-[22px] font-extrabold group-hover:text-shakespeare transition-colors">
                    Président de la CRSE
                  </h4>
                  <p className="text-[13px] text-blue-200 mt-1">M. Ibrahima NIANE</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-shakespeare">
                    <span>Voir le mot du Président</span>
                    <ArrowRight size={13} />
                  </div>
                </div>

                {/* Relais vers Assistant et Cellules rattachées */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[12px]">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                    Assistant(e) du Président
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                    Conseillers du Président
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                    Pool d'assistant(e)s
                  </span>
                </div>
              </div>

              {/* CONNECTEUR CENTRAL VERTICAL */}
              <div className="relative my-6 flex justify-center items-center">
                <div className="h-10 w-0.5 bg-gradient-to-b from-shakespeare to-chathams-blue" />
              </div>

              {/* LIGNE 3 : SECRÉTARIAT EXÉCUTIF ET ORGANES D'APPUI & CONTRÔLE */}
              <div className="mb-10">
                <div className="text-center mb-6">
                  <div
                    onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'secretaire-executif') || null)}
                    className="inline-block cursor-pointer group p-5 px-10 rounded-2xl bg-chathams-blue text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    <span className="text-[11px] uppercase tracking-wider text-shakespeare font-bold block mb-1">
                      Coordination Générale
                    </span>
                    <h4 className="text-[18px] sm:text-[20px] font-bold">
                      Secrétariat Exécutif
                    </h4>
                  </div>
                </div>

                {/* Branches d'appui et contrôle rattachées */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div
                    onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'dept-com') || null)}
                    className="cursor-pointer p-4 rounded-xl bg-teal-50/70 hover:bg-teal-100/70 border border-teal-200 text-teal-950 transition-all hover:-translate-y-0.5 shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">Département</span>
                    <h5 className="text-[13px] font-bold leading-snug">Communication, RP & Coopération</h5>
                  </div>

                  <div
                    onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'dept-audit') || null)}
                    className="cursor-pointer p-4 rounded-xl bg-teal-50/70 hover:bg-teal-100/70 border border-teal-200 text-teal-950 transition-all hover:-translate-y-0.5 shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">Département</span>
                    <h5 className="text-[13px] font-bold leading-snug">Audit Interne & Conformité</h5>
                  </div>

                  <div
                    onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'cellule-marches') || null)}
                    className="cursor-pointer p-4 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 text-emerald-950 transition-all hover:-translate-y-0.5 shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">Cellule Spéciale</span>
                    <h5 className="text-[13px] font-bold leading-snug">Passation de Marchés</h5>
                  </div>

                  <div
                    onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'controle-gestion') || null)}
                    className="cursor-pointer p-4 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 text-emerald-950 transition-all hover:-translate-y-0.5 shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">Cellule Spéciale</span>
                    <h5 className="text-[13px] font-bold leading-snug">Contrôle de Gestion</h5>
                  </div>

                  <div
                    onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'dept-etudes') || null)}
                    className="cursor-pointer p-4 rounded-xl bg-teal-50/70 hover:bg-teal-100/70 border border-teal-200 text-teal-950 transition-all hover:-translate-y-0.5 shadow-sm sm:col-span-2 lg:col-span-2"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">Département</span>
                    <h5 className="text-[13px] font-bold leading-snug">Études Générales et Suivi</h5>
                  </div>

                  <div
                    onClick={() => setSelectedNode(orgNodes.find((n) => n.id === 'dept-si') || null)}
                    className="cursor-pointer p-4 rounded-xl bg-teal-50/70 hover:bg-teal-100/70 border border-teal-200 text-teal-950 transition-all hover:-translate-y-0.5 shadow-sm sm:col-span-2 lg:col-span-2"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">Département</span>
                    <h5 className="text-[13px] font-bold leading-snug">Système d'Information (DSI)</h5>
                  </div>
                </div>
              </div>

              {/* LIGNE 4 : LES 6 DIRECTIONS MÉTIERS (BASE DE L'ORGANISATION) */}
              <div className="pt-8 border-t-2 border-slate-200">
                <div className="text-center mb-6">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-cyan-100 text-cyan-900 text-[12px] font-bold uppercase tracking-wider">
                    <Briefcase size={14} />
                    <span>Les 6 Directions Opérationnelles et Métiers</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
                  {orgNodes.filter((n) => n.category === 'direction').map((dir) => (
                    <div
                      key={dir.id}
                      onClick={() => setSelectedNode(dir)}
                      className="cursor-pointer group flex flex-col justify-between p-4 rounded-2xl bg-gradient-to-b from-slate-900 via-cyan-950 to-slate-900 text-white shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-cyan-700/30 text-center min-h-[140px]"
                    >
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[11px] font-extrabold mb-2 tracking-wider">
                          {dir.code}
                        </span>
                        <h5 className="text-[13px] font-bold leading-tight group-hover:text-shakespeare transition-colors">
                          {dir.title}
                        </h5>
                      </div>
                      <span className="text-[11px] text-cyan-200/80 group-hover:text-white mt-3 font-medium flex items-center justify-center gap-1">
                        <span>Explorer</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MODALE / FICHE DE DÉTAIL D'UN NŒUD SÉLECTIONNÉ */}
            {selectedNode && (
              <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border-2 border-shakespeare/30 shadow-2xl animate-fade-in relative">
                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
                >
                  ✕
                </button>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-chathams-blue text-[11px] font-bold uppercase tracking-wider">
                    {selectedNode.category}
                  </span>
                  {selectedNode.code && (
                    <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-bold">
                      {selectedNode.code}
                    </span>
                  )}
                </div>
                <h4 className="text-[22px] sm:text-[26px] font-bold text-slate-900">{selectedNode.title}</h4>
                {selectedNode.subtitle && (
                  <p className="text-[14px] text-shakespeare font-semibold mt-0.5">{selectedNode.subtitle}</p>
                )}
                {selectedNode.description && (
                  <p className="text-[15px] text-slate-600 mt-4 leading-relaxed max-w-3xl">
                    {selectedNode.description}
                  </p>
                )}
                {selectedNode.missions && selectedNode.missions.length > 0 && (
                  <div className="mt-5">
                    <h5 className="text-[13px] font-bold uppercase tracking-wider text-slate-900 mb-2">
                      Principales attributions :
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14px] text-slate-700">
                      {selectedNode.missions.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-shakespeare font-bold">✓</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedNode.link && (
                  <div className="mt-6">
                    <Link
                      to={selectedNode.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-chathams-blue text-white text-[13px] font-bold hover:bg-blue-900 transition-colors"
                    >
                      <span>Accéder à la rubrique dédiée</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. SECTION BROCHURE INSTITUTIONNELLE EN FLIPBOOK (PUBHTML STYLE) */}
      <section className="py-16 bg-slate-950 text-white border-t border-slate-800">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-shakespeare/20 px-3.5 py-1 text-[12px] font-bold text-shakespeare mb-3">
                <BookOpen size={15} />
                <span>Publication Officielle</span>
              </div>
              <h3 className="text-[28px] sm:text-[36px] font-bold text-white">
                Brochure Institutionnelle de la CRSE
              </h3>
              <p className="text-[15px] text-slate-400 mt-2 max-w-2xl">
                Consultez la brochure de présentation officielle en mode feuilletage 3D interactif comme dans un livre physique, avec navigation fluide et zoom haute précision.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.crse.sn/wp-content/uploads/2026/03/BrochureInstitutionnelleCRSE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[14px] font-bold backdrop-blur-sm border border-white/15 transition-all"
              >
                <FileText size={16} />
                <span>Télécharger le PDF</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Liseuse Flipbook Haute Définition */}
          <PurePdfFlipViewer
            title="Brochure Institutionnelle CRSE"
            pdfUrl="https://www.crse.sn/wp-content/uploads/2026/03/BrochureInstitutionnelleCRSE.pdf"
            totalEstimatePages={20}
          />
        </div>
      </section>
    </div>
  )
}
